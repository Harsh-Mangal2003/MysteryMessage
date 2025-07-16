import dbConnect from "@/lib/dbConnect";
import UserModel from "@/app/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
export async function POST(request: Request){
    await dbConnect()
    try{
       
        const {username,email,password}= await request.json()
        const existingUserVerifiedByUsername= await UserModel.findOne({
            username,
            isVerified:true
        })
        if(existingUserVerifiedByUsername){
            return Response.json({
                success:false,
                message:"Username is alredy taken"
            },{status:400}
            )
        }
        const existingUserByEmail= await 
        UserModel.findOne({email})
        const verifyCode=Math.floor(100000+Math.random()* 9000000).toString()
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success:false,
                    message:"User alredy exists with this email . try another email",
                },{status:400})
            }
            else{
                const hashedPassword=await bcrypt.hash(password,10)
                existingUserByEmail.password=hashedPassword
                existingUserByEmail.verifyCode=verifyCode
                existingUserByEmail.verifyCodeexpiry=new Date(Date.now()+3600000)
                await existingUserByEmail.save()
            }


            }
            else{
                const hashedPassword= await bcrypt.hash(password,10)
                const expiryDate=new Date() // yahan const likhne ke bad bhi hmlog edit kr rhe expiry code in the next line because new kwyword ek object bna rha aur object memory me reference point hai
                expiryDate.setHours(expiryDate.getHours()+1)
                const newUser=new UserModel({
                     username,
                        email,
                        password:hashedPassword,
                        verifyCode,
                        verifyCodeexpiry:expiryDate,
                        isVerified:false,
                        isAcceptingMessage:true,
                        message:[]

                })
                await newUser.save()
            }
            //send verification email
            const emailResponse=await sendVerificationEmail(
                email,username,verifyCode)
            if(!emailResponse.success){
                return Response.json({
                    success:false,
                    message:emailResponse.message,
                },{status:500})
                
            }
            return Response.json({
                success:true,
                message:"User Registerd successfully . Please verify your email now",
            },{status:201})
            
        }


    
    catch(error){
        console.log("Error ")
        return Response.json({
            success:false,
            message:"Error registering user"
        },
    {
        status:500
    })
    }

}