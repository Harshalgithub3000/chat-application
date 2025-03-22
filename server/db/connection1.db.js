import mongoose from "mongoose";

export const connectDb = async()=>{
    try {
        const MONGODB_URL = process.env.MONGODB_URL
        const instance = await mongoose.connect(`${MONGODB_URL}/${process.env.DB_NAME}`)
         console.log(`Mongodb is connected ${instance.connection.host}`);
       
    } catch (error) {
        console.log("MONGODB connection error:",error);   
        process.exit(1)
    }
}