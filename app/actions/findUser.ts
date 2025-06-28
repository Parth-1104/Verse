export const findUser = async (userId: string | undefined) => {
    const res = await fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId
        })
    });

    const result = await res.json();
    
    return result;
}