import { FieldValues } from "react-hook-form";

export const updateBlog = async (data: FieldValues) => {
    const res = await fetch('/api/update', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create user.');
    }

    return await res.json();
}