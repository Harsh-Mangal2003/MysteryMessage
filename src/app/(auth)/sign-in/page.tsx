'use client'
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import {useEffect, useState} from 'react';
import { useDebounceValue } from "usehooks-ts"
import { toast } from "sonner"
import { useRouter } from "next/router"
import { signUpSchema } from "@/schema/signUpSchema"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "../../../../types/ApiResponse"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schema/signInSchema"
import { signIn } from "next-auth/react"
const page = () => {
 
  const [isSubmitting , setIsSubmitting]=useState(false)
  //usehook.ts
  

  const router = useRouter()

  //zodd implementation

  const form =useForm<z.infer<typeof signInSchema>>({
    resolver:zodResolver(signInSchema),
    defaultValues: {
      
      identifier:'',
      password:''
    }
  })

 


const onSubmit = async (data: z.infer<typeof signInSchema>) => {
 const result= await signIn('credentials',{
  redirect:false,
    email:data.identifier,
    password:data.password
  })
  if(result?.error)
  {
    toast("Login Failed", {
      description: "Incorrect username or password",
    })
  }

  if(result?.url)
  {
    router.replace('/dashboard');
  }
  
}
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message

          </h1>
          <p className="mb-4">Sign in to start your adventure</p>
          </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
<FormField
name="identifier"
  control={form.control}
  
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email/Username</FormLabel>
      <FormControl>
        <Input placeholder="email/username" {...field}
        
        
        />
      </FormControl>
      
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
name="password"
  control={form.control}
  
  render={({ field }) => (
    <FormItem>
      <FormLabel>Password</FormLabel>
      <FormControl>
        <Input type="password" placeholder="password" {...field}
        
        
        />
      </FormControl>
      
      <FormMessage />
    </FormItem>
  )}
/>
<Button type="submit" disabled={isSubmitting}>
 
  Sign In
</Button>
        </form>
      </Form>
      <div className="text-center mt-4">
        <p>
          Alredy a member?{''}
          <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
          Sign Input</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default page;
