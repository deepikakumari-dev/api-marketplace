import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: "Password", type: 'password' }
            },
            async authorize(credentials) {
                if (credentials) {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    })
                    if (!user) return null;
                    const isMatch = await bcrypt.compare(credentials.password, user.password)
                    if (!isMatch) return null;
                    return user
                }
                return null
            }
        })
    ],
    pages: {
        signIn: "/auth/signin"
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                const org = await prisma.userOrganization.findFirst({
                    where: { userId: user.id }
                })
                token.activeOrgId = org?.organizationId
            }

            if (trigger === "update" && session?.user?.activeOrgId) {
                token.activeOrgId = session.user.activeOrgId
            }

            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id
                session.user.activeOrgId = token.activeOrgId
            }
            return session
        }
    }
}