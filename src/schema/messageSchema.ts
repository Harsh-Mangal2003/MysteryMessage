import {z} from "zod"
export const messageSchema=z.object({
    content:z
    .string()
    .min(10,'Content must be atleast 10 letters')
    .max(300,'Length should not exceed 300')

})