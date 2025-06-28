import { db } from "@/drizzle/client";
import { blogs } from "@/drizzle/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { title, description, userId, content, image  } = await request.json();

        if (!title || !description || !content || !userId) {
            return NextResponse.json(
                { message: 'Missing required fields: title, body, or userId' },
                { status: 400 }
            );
        }

        const [blog] = await db.insert(blogs).values({
            title: title,
            userId: userId,
            description: description,
            content: content,
            image: image
        }).returning(); 

        if (!blog) {
            return NextResponse.json(
                { message: 'Failed to create blog' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: 'Blog created successfully!',
            data: blog, 
        });
        

    } catch (error: any) {
        return NextResponse.json(
            { message: 'An error occurred', error: error.message },
            { status: 500 }
        );
    }
}