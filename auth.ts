import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/drizzle/client"
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  ...authConfig,
  session: {
    strategy: "jwt"
  },
  debug: process.env.NODE_ENV == "development",
  secret: process.env.AUTH_SECRET
});