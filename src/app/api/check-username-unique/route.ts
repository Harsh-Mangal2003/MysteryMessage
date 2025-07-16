import dbConnect from "@/lib/dbConnect";
import UserModel
 from "@/app/model/User";
 import { z } from "zod";
 import { userNamevalidation } from "@/schema/signUpSchema";

 const usernamequeryschema = z.object({
    username:userNamevalidation
 })

 //email dalte hi likhna ki email not found uske liye

 export async function GET(request:Request){

    

    //todo: use this  in all other routes
    await dbConnect()

    try{
        const {searchParams}=new URL(request.url)
        const queryParams={
            username: searchParams.get('username')
        }
        //validate with zod

        const result= usernamequeryschema.safeParse(queryParams) //safeparse se agr value shi rahegi to value mil jayegi

console.log(result)
if(!result.success)
{
    const usernameErrors=result.error.format().username?._errors   || [] // result.errors wale me sare errors hote hain hmlogo ko sirf username wala error chahiye tha isliye wahi liye hai
    return Response.json({
        success:false,
        message:usernameErrors?.length>0 ? usernameErrors.join(','):'Invalid query parameters',

    },{status:400})
}

const username=result.data

const existingVerifiedUser= await UserModel.findOne({username,isVerified:true})
if(existingVerifiedUser){
return Response.json({
    success:false,
    message:'Username is alredy taken',
},{status:400})
}
return Response.json({
    success:true,
    message:'Username is Unique'
},{status:400})

    }
    catch(error){

        console.error("Error checking username",error)
        return Response.json(
            {
                success:false,
                message:"Error checking username"
            },
            {
                status:500
            }
        )

    }
 }