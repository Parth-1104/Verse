"use client";

import * as React from "react";
import Button from "@/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Google from "@/public/images/icons8-google-100.png";
import { FieldValues, useForm } from "react-hook-form";
import Link from "next/link";
import PasswordInput from "../Input";
import Loader from "./Loader";
import { createUser } from "@/app/actions/createUser";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"
import { registerSchema } from "@/schema/register";
import { zodResolver } from '@hookform/resolvers/zod';
import { socialSignIn } from "@/app/actions/socialLogin";



export default function Register() {
  const { register, handleSubmit, resetField, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const onRegisterFormSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    await createUser(data)
      .then(() => {
        toast({
          title: "Success: User Created Successfully",
          description: "You can now login your account, and start writing blogs.",
        });
        resetField("name");
        resetField("email");
        resetField("password");
        router.push('/login');
      })
      .catch((err) => {
        toast({
          title: "Error: User Creation Failed",
          description: JSON.stringify(err),
          variant: 'destructive'
        });
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleSignIn = async (event: React.MouseEvent) => {
    event.preventDefault();
    await socialSignIn("google");
  };

  return (
    <div className="relative flex justify-center items-center w-full h-screen">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Loader />
        </div>
      )}
      <Card className="md:w-[30vw] w-full z-0">
        <form onSubmit={handleSubmit(onRegisterFormSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl font-medium">
              Register Your Account
            </CardTitle>
            <CardDescription>
              Enter your credentials and create your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Button
                  content={
                    <div className="flex justify-center items-center gap-2">
                      <div>
                        <Image alt="" src={Google} width={24} height={24} />
                      </div>
                      <div>Sign with Google</div>
                    </div>
                  }
                  secondary
                  onClick={handleGoogleSignIn as any}
                />
              </div>
              <div className="w-full flex justify-center font-semibold">OR</div>
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register('name')}
                  required
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  {...register('email')}
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  register={register("password") as any}
                  required
                />
                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password.message}</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-2">
            <Button content="Register" type="submit" />
            <Link href={"/login"} className="text-sm hover:underline">
              Already have an account?
              <span className="font-semibold text-deeppurple cursor-pointer">
                Login
              </span>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
