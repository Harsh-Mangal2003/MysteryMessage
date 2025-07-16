import mongoose  from "mongoose";

type ConnectionObject={
    isConnected?:number
}

const connection : ConnectionObject={}


async function dbConnect(): Promise<void>//andar kya h usse mtlb ny h isliye void 
{
    if(connection.isConnected){
        console.log("Database is connected");
        return
    }
    try{
        const db =await mongoose.connect(process.env.MONGODB_URI || '',{})
        connection.isConnected=db.connections[0].readyState//database fully ready h ya nhi

        console.log("DB Connected successfully");

    }
    
    catch(error){
        console.log("Database connection failed");
        process.exit(1)


    }


}
export default dbConnect;
