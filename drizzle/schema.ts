import { relations } from "drizzle-orm";
import {
    timestamp,
    pgTable,
    text,
    integer,
    boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    password: text("password"),
    image: text("image"),
    bio: text("bio"),
    createdAt: timestamp('created_at').defaultNow(),
});

export const blogs = pgTable("blogs", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title"),
    description: text("description"),
    content: text("content"),
    userId: text("userId")
        .notNull()
        .references(() => users.id),
    image: text("image"),
    createdAt: timestamp('created_at').defaultNow(),
});

const userRelations = relations(users, ({ many }) => ({
    blogs: many(blogs)
}));

const blogsRelations = relations(blogs, ({ one }) => ({
    users: one(users, {
        fields: [blogs.userId],
        references: [users.id]
    })
}));

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
)

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
)

export const authenticators = pgTable(
    "authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: text("transports"),
    },
)
