import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: 'Email', type: 'email'},
                password: {label: "Password", type: 'password'}
            },
            async authorize(credentials){
                return null
            }
        })
    ],
    pages: {
        signIn: "/auth/signin"
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({session, token}){
            if (token && session.user) {
                session.user.id = token.id
            }
            return session
        }
    }
}