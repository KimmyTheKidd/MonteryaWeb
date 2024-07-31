"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";
import OAuthForm from "./OAuthForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { UserAuth } from "@/config/AuthContext";
import { useRouter } from "next/navigation";
import { signUpWithEmail } from "./auth-server-action/signup";
import { showFailedToast, showSuccessToast } from "../toast/CustomToast";

const FormSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password is too short" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const containerVariants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function SignUpCard() {
  const { user } = UserAuth();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormDisable, setIsFormDisable] = useState(true);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  async function onSubmit(data: any) {
    setIsSubmitting(true);
    try {
      const result = await signUpWithEmail(data);
      const { status, error } = JSON.parse(result);
      if (status !== 200) {
        showFailedToast(error);
        return;
      } else {
        showSuccessToast("Sign Up Successfully");
        router.push("/");
      }
    } catch (error) {
      showFailedToast("An error occurred");
      setIsSubmitting(false);
      return;
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-center items-center min-h-screen"
    >
      <Card className="bg-opacity-90 w-96">
        <CardHeader className="flex items-center p-4 bg-gradient-to-r text-white">
          <Image
            alt="game logo"
            height={50}
            width={50}
            src="/MT_icon.png"
            className="rounded-sm"
          />
          <div className="ml-4 flex-1">
            <p className="text-3xl font-semibold">SignUp</p>
            <p className="text-sm text-gray-200">Create your account</p>
          </div>

          <Tooltip
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Internal Testing</div>
                <div className="text-sm">
                  The SignUp feature is currently undergoing internal testing
                  and is not accessible to the public.
                </div>
              </div>
            }
          >
            <Button color="danger">Alert!</Button>
          </Tooltip>
        </CardHeader>

        <Divider />
        <CardBody className="flex flex-col px-10 py-8">
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit(onSubmit)}
            className={isFormDisable ? "pointer-events-none opacity-50" : ""}
          >
            <motion.div variants={itemVariants} className="mb-4">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your Email"
                fullWidth
                {...register("email")}
                disabled={isFormDisable}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-2 mb-4">
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                fullWidth
                {...register("password")}
                disabled={isFormDisable}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-2 mb-4">
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-gray-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-gray-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                fullWidth
                {...register("confirmPassword")}
                disabled={isFormDisable}
              />
              {errors.confirmPassword && (
                <p className="text-red-600">{errors.confirmPassword.message}</p>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex justify-end mt-2"
            >
              <p className="text-sm text-gray-200 cursor-pointer hover:underline">
                Already Have an Account? Login
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-4">
              <Button
                type="submit"
                style={{ width: "100%" }}
                className={`bg-black hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl ${
                  isFormDisable ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                disabled={isSubmitting || isFormDisable}
                isDisabled={isFormDisable}
              >
                Sign Up
              </Button>
            </motion.div>
          </motion.form>
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-col items-center py-4">
          <OAuthForm isFormDisable={isFormDisable}/>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
