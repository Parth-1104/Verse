export const getEditBlog = async (id: string) => {
    const res = fetch(`/api/blogs/${id}`);

    const result = (await res).json();

    return result;
}