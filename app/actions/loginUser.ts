import { signIn } from "next-auth/react";
import { FieldValues } from "react-hook-form";

export const loginUser = async (data: FieldValues) => {
    try {
        // Attempt to sign in with credentials
        const response = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (response?.error) {
            // If there's an error, throw it
            throw new Error(response.error);
        }

        if (response?.status !== 200) {
            // If the status is not OK, throw an error
            throw new Error("An unexpected error occurred during login.");
        }

        // Return the response if login was successful
        return response;
    } catch (error: any) {
        // Catch any error that happens during sign-in and throw it
        console.error("Login error:", error);
        throw new Error(error.message || "An error occurred while logging in.");
    }
};