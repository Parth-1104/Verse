'use server'

import { signOut } from "@/auth"

export const logOutuser = async () => {
    await signOut({
        redirectTo: '/login'
    });
}