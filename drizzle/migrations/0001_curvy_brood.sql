ALTER TABLE "blogs" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "emailVerified" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blogs" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "phone_number";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "user_role";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "address";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");--> statement-breakpoint
DROP TYPE "public"."user_role";