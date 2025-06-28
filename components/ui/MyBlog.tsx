"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Button from "../Button";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BlogTypes } from "@/types/blog";
import Image from "next/image";
import { UserTypes } from "@/types/user";
import { findUser } from "@/app/actions/findUser";
import Details from "./Details";
import useTabStore from "../store/tabs";

interface MyBlogProps extends BlogTypes {
  onDelete: (id: string) => void;
}

export default function MyBlog({
  title,
  description,
  id,
  image,
  userId,
  content,
  createdAt,
  onDelete,
}: MyBlogProps) {
  const [user, setUser] = useState<UserTypes | undefined>();
  const { setTab } = useTabStore();

  useEffect(() => {
    const fetchUser = async () => {
      const userResult = await findUser(userId);
      setUser(userResult?.data[0]);
    };
    fetchUser();
  }, [userId]);

  if (!id) {
    return <p className="text-center text-gray-500">Blog not found.</p>;
  }

  const handleDelete = async () => {
    onDelete(id);
  };

  return (
    <Card className="hover:scale-105 transition-transform cursor-pointer flex flex-col justify-between relative md:p-4 p-1 md:min-w-[37vw] w-full">
      <div className="w-full flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded-full hover:bg-muted focus:outline-none">
              <MoreHorizontal />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setTab("edit", id)}
            >
              <Edit className="h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="flex items-center gap-2 text-red-600 cursor-pointer"
            >
              <Trash className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full flex justify-center">
        <Image
          alt="Blog Image"
          src={image || "/placeholder.png"} 
          width={400}
          height={400}
          className="rounded-xl min-w-full md:p-4 p-1"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        Posted by <span className="font-semibold">{user?.name || "Unknown"}</span>
      </CardContent>
      <CardFooter>
        <Details
          trigger={
            <Button
              content="View Details"
              asDiv={true}
              className="w-full"
            />
          }
          content={content}
          createdAt={createdAt}
          description={description}
          id={id}
          image={image}
          title={title}
          userId={userId}
          key={id}
        />
      </CardFooter>
    </Card>
  );
}
