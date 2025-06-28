import { db } from "@/drizzle/client";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { userId } = await request.json();

        const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);

        return NextResponse.json({
            data: user
        })
    } catch (error: any) {
        throw new Error(error);
    }
}