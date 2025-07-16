'use-client'


import React, { useCallback } from 'react';
import { Message } from '@/app/model/User';
import { useState } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { acceptMessageSchema } from '@/schema/acceptMessageSchema';

import axios from 'axios';
const page = () => {
    const [messages,setMessages]=useState<Message[]>([])
    const [isLoading,setIsLoading]=useState(false)
    const [isSwitchLoading,setIsSwitchLoading]=useState(false)

    const handleDeleteMessage=(messageId:string)=>{
        setMessages(messages.filter((message)=>message._id!==messageId))
    }
    const {data: session} = useSession();

    const form=useForm({
        resolver: zodResolver(acceptMessageSchema)

    })
    const {register, watch,setValue} = form;

    const acceptMessages= watch('acceptMessage');

    const fetchAcceptMessage=useCallback(async ()=>{
        setIsSwitchLoading(true)

        try{
           const response= await axios.get('/api/accept-messages')
           
        }
        catch(error)
        {

        }
    },[setValue])
   
    
  return (
    <div>
      Dashboard   </div>
  );
}

export default page;
