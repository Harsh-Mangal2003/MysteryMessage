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
const page = () => {
  const [username,setUsername]= useState('')
  const [usernameMessage,setUsernameMessage]=useState('')
  const [isCheckingUsername,setIsCheckingUsername]=useState(false)
  const [isSubmitting , setIsSubmitting]=useState(false)
  //usehook.ts
  const debouncedUsername = useDebounceValue(username,300)

  const router = useRouter()

  //zodd implementation

  const form =useForm<z.infer<typeof signUpSchema>>({
    resolver:zodResolver(signUpSchema),
    defaultValues: {
      username:'',
      email:'',
      password:''
    }
  })

  useEffect(()=>{

    const checkUsernameUnique=async()=>{
      if(debouncedUsername){
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try{
          const response = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`)
          setUsernameMessage(response.data.message)
        }
        catch(error){
          const axiosError= error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          )


        }
        finally {
          setIsCheckingUsername(false)
        }
      }
    }
checkUsernameUnique()
  },[debouncedUsername])



const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
  setIsSubmitting(true)
  try{
    const response = await axios.post<ApiResponse>('/api/sign-up',data)
   toast('Success', {
  description: 'Your account has been created',
})
    router.replace(`/verify/${username}`)
    setIsSubmitting(false)
  }
  catch(error)
  {
    console.log("Error in sign up of user", error);
    const axiosError= error as AxiosError<ApiResponse>;
     let errorMessage=axiosError.response?.data.message
    toast("Signup Failed", {
  description: errorMessage,
})
     setIsSubmitting(false)

  }
  
}

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message

          </h1>
          <p className="mb-4">Sign up to start your adventure</p>
          </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
  control={form.control}
  name="username"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input placeholder="username" {...field}
        onChange={(e)=>{
          field.onChange(e)
          setUsername(e.target.value)
        }}
        
        />
      </FormControl>
      
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
name="email"
  control={form.control}
  
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input placeholder="email" {...field}
        
        
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
  {
    isSubmitting?(
      <>
      <Loader2  className=" mr-2 h-4 w-4 animate-spin"/> Please wait
      </>
    ) : ('Signup')
  }
  Sign Up
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
