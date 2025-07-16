import {resend} from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse} from "../../types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse>{
        try{
            return {success:true,message:'verification email sent'}
            await resend.emails.send({
                from:'onboarding@resend.dev',
                to:email,
                subject:'Mystry message verification code',
                react:VerificationEmail({username,otp:verifyCode}),
            });
        }
        catch(emailError){
            console.log("Error sending verification email",emailError)
            return {success:false,message:'Failed to sned verification email'}
        }
    }
