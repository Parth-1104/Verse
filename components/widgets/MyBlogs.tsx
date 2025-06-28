"use client";

import React, { useEffect, useState, useTransition } from "react";
import MyBlog from "../ui/MyBlog";
import { UserTypes } from "@/types/user";
import { findUser } from "@/app/actions/findUser";
import { currentUser } from "@/app/actions/currentUser";
import { BlogTypes } from "@/types/blog";
import { getMyblogs } from "@/app/actions/getMyBlogs";
import { deleteBlog } from "@/app/actions/deleteBlog";
import Loader from "../ui/Loader";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState<BlogTypes[]>([]);
  const [user, setUser] = useState<UserTypes | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchUser = async () => {
      const currentLoggedUser = await currentUser();
      if (currentLoggedUser) {
        const userResult = await findUser(currentLoggedUser.id);
        setUser(userResult.data[0]);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        const res = await getMyblogs(user.id);
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const result = await res.json();
        setBlogs(result.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, [user]);

  const handleDelete = async (id: string) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));

    startTransition(async () => {
      try {
        await deleteBlog(id);
      } catch (error) {
        console.error("Failed to delete blog:", error);
      }
    });
  };

  if (isLoading || !user?.id) {
    return <Loader />;
  }

  return (
    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3">
      {
        blogs.length > 0 ? (blogs.map((item) => (
          <MyBlog
            key={item.id}
            {...item}
            onDelete={handleDelete}
          />
        ))) : <div className="w-full flex justify-center items-center">You dont have any blog yet</div>
      }
    </div>
  );
};

export default MyBlogs;
