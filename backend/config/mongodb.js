import mongoose from "mongoose" 


const connectDB = async () => {

    // Gắn sự kiện 'connected' để in log khi kết nối thành công
    mongoose.connection.on('connected', () => console.log("Database Connected"))

    // Thực hiện kết nối tới MongoDB bằng URL trong biến môi trường .env
    // '/healthhub' là tên database sẽ sử dụng (nếu chưa tồn tại thì MongoDB sẽ tự tạo)
    await mongoose.connect(`${process.env.MONGODB_URI}/healthhub`)
}

export default connectDB
