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
import Link from "next/link";
import PasswordInput from "../Input";
import { FieldValues, useForm } from "react-hook-form";
import Loader from "./Loader";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/app/actions/loginUser";
import { socialSignIn } from "@/app/actions/socialLogin";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const onLoginFormSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      await loginUser(data);
      toast({
        title: "Success: User Logged In Successfully",
        description: "You can now access your tools and start writing blogs.",
      });
      resetField("email");
      resetField("password");
      router.refresh();
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Error: User Login Failed",
        description:
          "Something Went Wrong, It seems that user doesnot exists or Invalid credentials!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
        <form onSubmit={handleSubmit(onLoginFormSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl font-medium">
              Login Your Account
            </CardTitle>
            <CardDescription>
              Enter your credentials to access a dashboard and add events.
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="johndoe@gmail.com"
                  type="text"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  register={register("password") as any}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="w-full p-0 text-sm -mt-2 flex items-center gap-2 hover:underline cursor-pointer">
                Forgot Password?
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-2">
            <Button content="Login" type="submit" />
            <Link href={"/register"} className="text-sm hover:underline">
              Don't have an account?
              <span className="font-semibold text-deeppurple cursor-pointer">
                Register
              </span>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
