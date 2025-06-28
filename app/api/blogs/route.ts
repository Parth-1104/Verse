import { db } from "@/drizzle/client";
import { blogs } from "@/drizzle/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET(request: Request) {
    try {
        const allBlogs = await db
        .select()
        .from(blogs)
        .orderBy(desc(blogs.createdAt));

        return NextResponse.json({
            data: allBlogs
        });
    } catch (error: any) {
        throw new Error(error);
    }
}