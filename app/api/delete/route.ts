import { db } from "@/drizzle/client";
import { blogs } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: "Missing blog ID in the request body" },
                { status: 400 } 
            );
        }

        const deletedBlog = await db.delete(blogs).where(eq(blogs.id, id)).returning();
        
        return NextResponse.json({
            message: "Blog deleted successfully",
            data: deletedBlog,
        });
    } catch (error: any) {
        console.error("Error in delete API:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred", details: error.message },
            { status: 500 } 
        );
    }
}