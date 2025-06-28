"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import Button from "../Button";
import Loader from "./Loader";
import { FieldValues, useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { updateBlog } from "@/app/actions/updateBlog";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { FilePlus2 } from "lucide-react";
import { getEditBlog } from "@/app/actions/getEditBlog";
import useTabStore from "../store/tabs";
import Image from "next/image";

interface EditProps {
    id: string;
}

const EditBlog = ({ id }: EditProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue, watch, resetField } = useForm({
        defaultValues: {
            title: "",
            description: "",
            content: "",
            id: id,
            image: "", 
        },
    });
    const { toast } = useToast();
    const router = useRouter();
    const imageUrl = watch("image");
    const { setTab } = useTabStore();

    const submitForm = async (data: FieldValues) => {
        setIsLoading(true);
        await updateBlog(data)
            .then(() => {
                toast({
                    title: "Success: Blog Updated Successfully",
                    description: "You can now view your updated blog.",
                });
                resetField("title");
                resetField("description");
                resetField("content");
                resetField("image"); 
                router.refresh();
                setTab("blogs");
            })
            .catch((err) => {
                toast({
                    title: "Error: Blog Update Failed",
                    description: JSON.stringify(err),
                    variant: "destructive",
                });
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        const fetchEditBlog = async () => {
            const foundBlog = await getEditBlog(id);

            if (foundBlog?.data[0]) {
                const blog = foundBlog.data[0];

                setValue("title", blog.title || "");
                setValue("description", blog.description || "");
                setValue("content", blog.content || "");
                setValue("image", blog.image || ""); 
            }
        };

        fetchEditBlog();
    }, [id, setValue]);

    const handleImageUpload = (result: any) => {
        if (result?.info?.secure_url) {
            setValue("image", result.info.secure_url);
        }
    };

    return (
        <>
            {isLoading && <Loader />}
            <Card>
                <div className="p-4">
                    <h2 className="text-3xl font-bold mb-4">Edit Your Blog</h2>
                    <p className="mb-6 text-gray-600">
                        Update the blog details like title, description, content, and image.
                    </p>
                    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Title</Label>
                            <Input
                                placeholder="The Rise of Cloud Computing"
                                {...register("title")}
                                defaultValue={watch("title")}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Description</Label>
                            <Textarea
                                placeholder="How Cloud Computing overcame security and ease of access."
                                className="h-24"
                                {...register("description")}
                                defaultValue={watch("description")}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Content</Label>
                            <Textarea
                                className="w-full min-h-[30vw]"
                                placeholder="Write your content here..."
                                {...register("content")}
                                defaultValue={watch("content")}
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
                                                className="flex items-center"
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
                        <Button content="Update Blog" type="submit" />
                    </form>
                </div>
            </Card>
        </>
    );
};

export default EditBlog;
