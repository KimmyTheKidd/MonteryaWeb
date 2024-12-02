'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
  Input,
} from '@nextui-org/react';
import { EyeFilledIcon, EyeSlashFilledIcon } from '../icons';
import OAuthForm from './OAuthForm';
import { motion } from 'framer-motion'; // Import Framer Motion
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UserAuth } from '@/config/AuthContext';
import { useRouter } from 'next/navigation';
import { showFailedToast, showSuccessToast } from '../toast/CustomToast';
import { signInWithEmail } from './auth-server-action/signup';
import Link from 'next/link';

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

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password is too short' }),
});

export default function LoginCard() {
  const { user } = UserAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });


  async function handleLogin(data: any) {
    setIsSubmitting(true);
    try {
      const result = await signInWithEmail(data);
      const { status, error } = JSON.parse(result);
      if (status !== 200) {
        showFailedToast(error);
      } else {
        showSuccessToast('Login Successfully');
        router.push('/');
      }
    } catch (error) {
      showFailedToast('An error occurred');
    } finally {
      setIsSubmitting(false);
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
          <div className="ml-4">
            <p className="text-3xl font-semibold text-zinc-900">Login</p>
            <p className="text-sm text-zinc-900">Access your account</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col px-10 py-8">
          <form onSubmit={handleSubmit(handleLogin)}>
            <motion.div variants={itemVariants} className="mb-4">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                fullWidth
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </motion.div>
            <motion.div variants={itemVariants} className="mt-2 mb-4">
              <Input
                label="Password"
                placeholder="Enter your password"
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
                type={isVisible ? 'text' : 'password'}
                fullWidth
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </motion.div>
            <motion.div variants={itemVariants} className="flex justify-end ">
              <p className="text-sm text-zinc-900 cursor-pointer hover:underline">
                Forgot Password?
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex justify-end mt-2" // Adjusted margin to ensure proper spacing
            >
              <p className="text-sm text-zinc-900 cursor-pointer hover:underline">
  <Link href="/signup">
    Don&apos;t have an account? Sign up
  </Link>
</p>
            </motion.div>
          </form>
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-col items-center py-4">
          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center mb-4"
          >
            {/* Styled login button */}
            <Button
              type="submit"
              style={{ width: '80%' }}
              className="bg-black hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl"
              onClick={handleSubmit(handleLogin)}
              disabled={isSubmitting}
            >
              Login
            </Button>
          </motion.div>
          {/* OAuth form component */}
          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center"
          >
            <OAuthForm isFormDisable={false} />
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
