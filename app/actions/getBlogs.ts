export const getBlogs = async () => {
    const res = await fetch('/api/blogs', {
        method: 'GET',
    });

    const response = await res.json();

    return response
}