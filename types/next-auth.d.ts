import NextAuth, {DefaultSession, DefaultUser} from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            activeOrgId: string | undefined
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        activeOrgId: string | undefined
    }
}