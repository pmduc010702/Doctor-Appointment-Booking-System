import multer from "multer";

// Cấu hình nơi lưu trữ và đặt tên file khi upload
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
})

// Tạo middleware upload bằng multer với cấu hình storage bên trên
const upload = multer({ storage })

export default upload