import jwt from 'jsonwebtoken' 

// Middleware xác thực admin
const authAdmin = async (req, res, next) => {
    try {
        // Lấy token từ headers. Tên key ở đây là 'atoken'
        const { atoken } = req.headers

        // Nếu không có token thì trả về lỗi không được phép truy cập
        if (!atoken) {
            return res.json({ success: false, message: 'Not Authorized. Login Again' })
        }

        // Giải mã token để lấy thông tin payload (ở đây chứa email)
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

        // Kiểm tra xem email trong token có khớp với email admin không
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: 'Not Authorized. Login Again' })
        }

        // Nếu tất cả đúng thì cho phép request đi tiếp
        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authAdmin 