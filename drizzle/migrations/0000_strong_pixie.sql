CREATE TYPE "public"."user_role" AS ENUM('ORGANIZER', 'VISITOR', 'ADMIN');--> statement-breakpoint
CREATE TABLE "blogs" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"content" text,
	"userId" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"phone_number" text,
	"user_role" "user_role",
	"address" text,
	"created_at" timestamp DEFAULT now()
);
