'use server'
import { auth } from "@/auth";
import { db } from "@/drizzle/client";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const currentUser = async () => {
    const session = await auth();

    if (!session?.user) {
        return null;
    }

    const userArray = await db
        .select()
        .from(users)
        .where(eq(users.email, session?.user?.email as string));

    const user = userArray[0] || null;
    
    return user; 
};