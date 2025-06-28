import { FieldValues } from "react-hook-form";

export const createBlog = async (data: FieldValues) => {
    const res = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to create blog.');
    }

    const responseData = await res.json();
    return responseData.data;
};