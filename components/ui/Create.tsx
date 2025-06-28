"use client";

import React, { useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Button from "../Button";
import { FieldValues, useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import { FilePlus2 } from "lucide-react";
import { currentUser } from "@/app/actions/currentUser";
import { useToast } from "@/hooks/use-toast";
import { createBlog } from "@/app/actions/createBlog";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import useTabStore from "../store/tabs";
import Image from "next/image";

const Create = () => {
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setTab } = useTabStore();
  const { handleSubmit, register, setValue, resetField } = useForm({
    defaultValues: {
      title: "",
      description: "",
      content: "",
      image: "",
    },
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const submitForm = async (data: FieldValues) => {
    const user = await currentUser();

    if (!user || !user.id) {
      toast({
        title: "Error: User not found",
        description: "Unable to retrieve user information.",
        variant: "destructive",
      });
      return;
    }

    const dataWithUserId = {
      ...data,
      userId: user.id,
    };

    setIsLoading(true);

    await createBlog(dataWithUserId)
      .then((blog) => {
        if (!blog.id) {
          throw new Error("Blog ID is missing");
        }

        toast({
          title: "Success: Blog Created Successfully",
          description: "You can now view your blog.",
        });
        resetField("title");
        resetField("description");
        resetField("content");
        setTab("blogs");
      })
      .catch((err) => {
        toast({
          title: "Error: Blog Creation Failed",
          description: err.message,
          variant: "destructive",
        });
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleImageUpload = (result: any) => {
    if (result?.info?.secure_url) {
      setImageUrl(result.info.secure_url);
      setValue("image", result.info.secure_url);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-full p-2">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <Loader />
        </div>
      )}
      <div className="max-w-3xl mx-auto rounded ">
        <h2 className="text-3xl font-bold mb-4">Create Blog</h2>
        <p className="mb-6 text-gray-600">
          Enter blog details like title, description, content, and image, and share to collaborate with people.
        </p>
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Title</Label>
            <Input
              placeholder="The Rise of Cloud Computing"
              {...register("title")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea
              placeholder="How Cloud Computing overcame security and ease of access."
              className="h-24"
              {...register("description")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Content</Label>
            <Textarea
              className="w-full h-[10vw]"
              placeholder="Write your content here...."
              {...register("content")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Image</Label>
            <Card className="w-full h-32">
              <CardContent className="w-full h-full flex justify-center items-center">
                <CldUploadWidget
                  uploadPreset="verse-blogs-website"
                  onSuccess={handleImageUpload}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className=""
                    >
                      <FilePlus2 size={45} />
                    </button>
                  )}
                </CldUploadWidget>
              </CardContent>
            </Card>
            {imageUrl && (
              <div className="mt-2">
                <Image
                  src={imageUrl}
                  alt="Uploaded"
                  width={400}
                  height={350}
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
          <Button content="Create" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Create;
