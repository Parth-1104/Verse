export const deleteBlog = async (id: string) => {
    try {
        const res = await fetch('/api/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
            body: JSON.stringify({ id }),
        });

        if (!res.ok) {
            // Parse error response
            const error = await res.json();
            console.error("Error response:", error);
            throw new Error(error.error || "Failed to delete the blog.");
        }
        return await res.json();
    } catch (error) {
        console.error("Error in deleteBlog function:", error);
        throw error;
    }
};