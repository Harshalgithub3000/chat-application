import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

    // Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET           // Click 'View API Keys' above to copy your API secret
    });
    
const uploadOnCloudinary = async (localFilepath)=> {
    try {
        
        if(!localFilepath){
            return null
        }

        //uplode the file on cloudinary
       const response = await cloudinary.uploader.upload(localFilepath,{
            resource_type:"auto",
            folder:"chit-chat"
        })
        // console.log("Cloudinary Upload Response:", response);
        // //file has been uploaded successfully
        // console.log("file has been uploaded successfully on cloudinary",response.url);

        fs.unlinkSync(localFilepath)
        return response

    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        fs.unlinkSync(localFilepath) 
        return null
    }
     
}

export {uploadOnCloudinary}