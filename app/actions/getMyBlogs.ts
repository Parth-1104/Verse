export const getMyblogs = async (userId: string) => {
    const res = await fetch('/api/my-blogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId }),
    });

    return res;
};