import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/app/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";
export async function GET(request:Request){
    await dbConnect()
    const session=await getServerSession(authOptions)
    const user=session?.user
    if(!session || !session.user){
return Response.json({
    success:false,
    message:"Not Authenticated"
},
{status:401})
    }
    const userId=new mongoose.Types.ObjectId(user._id);//yaha par agr direct likhenge to fir problem karega because hmlog type ko string me change kr diye the
    try{
//aggregation pipeline likhne ka method
const user = await UserModel.aggregate([
    {$match:{id:userId}},
{$unwind:'$messages'}, //for unwinding messages
{$sort:{'messages.createdAt':-1}},//-1 for ascending or descending
{$group:{_id:'$_id',messages:{$push:'$messages'}}}
    
])

if(!user || user.length===0){
    return Response.json({
        success:false,
        message:'User not found'
    },
{status:401})

return Response.json({
    success:true,
    messages:user[0].messages
},
{status:200})
}
    }
    catch(error){
        console.log("Error adding messages")
        return Response.json({
            success:false,
            message:'Internal Server Error'
        },
        {status:500}

        )

    }
}
