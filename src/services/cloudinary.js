import "dotenv/config"
import cloudinary from 'cloudinary';
          
cloudinary.config({ 
  cloud_name:process.env.cloud_name ,
  api_key: process.env.APT_KEY ,
  api_secret:process.env.api_secret 
});

export default cloudinary.v2