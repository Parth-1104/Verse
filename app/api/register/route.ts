import { db } from "@/drizzle/client"; 
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm"; 
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1); 

        if (existingUser.length > 0) {
            return NextResponse.json({ error: "User already exists!" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await db.insert(users).values({
            name,
            email,
            password: hashedPassword
        }).returning(); 

        return NextResponse.json({
            success: "User created successfully!",
            data: newUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Something went wrong!" }, { status: 500 });
    }
}