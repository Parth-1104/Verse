'use client'

import React, { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import Button from "../Button"
import Image from "next/image"
import Details from "./Details"
import { BlogTypes } from "@/types/blog"
import { findUser } from "@/app/actions/findUser"
import { UserTypes } from "@/types/user"



export default function Blog({ title, description, image, id, userId, content, createdAt }: BlogTypes) {
  const [user, setUser] = useState<UserTypes | undefined>();

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const userResult = await findUser(userId);
        setUser(userResult.data[0]);
      }
    };
    fetchUser();
  }, [userId]);

  if (!id) {
    return null;
  }
  return (
    <Card className="hover:scale-105 transition-transform cursor-pointer flex flex-col justify-between md:p-4 p-1 md:min-w-[37vw] w-full">
      <div className="w-full flex justify-center">
        <Image
          alt=""
          src={image}
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
        Posted by <span className="font-semibold">{user?.name}</span>
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
  )
}
