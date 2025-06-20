import { v2 as cloudinary } from 'cloudinary'

// cấu hình Cloudinary
const connectCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY, // API key dùng để xác thực với Cloudinary
        api_secret: process.env.CLOUDINARY_SECRET_KEY // API secret để bảo mật
    })
}
  

export default connectCloudinary