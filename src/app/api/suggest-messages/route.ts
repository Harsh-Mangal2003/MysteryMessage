import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try{
  const prompt="Create a list of three open-ended and engaging formatted as a single string. Each questions should be separated by '||' . these questions are for an anonymous social messaging platform like Qooh.me,and should be suitable for diverse audience . Avoid personal and sesnsitive topics and consider for some social and friendly matters"

  const result = streamText({
    model: openai('gpt-4o'),
    maxTokens:400,
    prompt,
  });

  return result.toDataStreamResponse();
}
catch(error){
    if(error instanceof OpenAI.APIError)
    {
const {name,status,headers,message}=error;
return NextResponse.json({
    name,status,headers,message},{status})
}
    
else{
    console.error("An unexpected error occured",error);
    throw error
}
}
}