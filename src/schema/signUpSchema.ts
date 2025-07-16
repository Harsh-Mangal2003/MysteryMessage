import {z} from 'zod'

export const userNamevalidation=z
.string()
.min(2,"Usrname must be atleast 2 characters")
.max(20,"Username not longer than 20 characters")
.regex(/^[a-zA-Z0-9_]+$/,"Username must not contain speacial charaters")


export const signUpSchema=z.object({
    username:userNamevalidation,
    email:z.string().email({message:'Invalide email address'}),
    password:z.string().min(6,{message:"password must be atleast 6 characters"})

})

