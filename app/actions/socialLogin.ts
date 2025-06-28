'use server'
import { signIn } from "@/auth"

export const socialSignIn = async (provider: "google" | "github") => {
    await signIn(provider);
}