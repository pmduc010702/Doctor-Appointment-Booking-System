import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"


// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        // 1. Lấy các trường dữ liệu từ body và file từ Multer
        const {
            name, email, password, speciality,
            degree, experience, about, fees, address
        } = req.body;
        const imageFile = req.file; // Ảnh từ form gửi lên

        // 2. Kiểm tra nếu thiếu bất kỳ trường nào
        if (
            !name || !email || !password || !speciality ||
            !degree || !experience || !about || !fees || !address
        ) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // 3. Kiểm tra định dạng email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid Email" });
        }

        // 4. Kiểm tra độ dài mật khẩu
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong Password" });
        }

        // 5. Mã hóa mật khẩu bằng bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 6. Upload ảnh lên Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image"
        });
        const imageUrl = imageUpload.secure_url; // Lấy đường dẫn ảnh

        // 7. Tạo dữ liệu mới cho bác sĩ
        const doctorData = {
            name,
            email,
            image: imageUrl, // ảnh vừa upload
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address), // parse từ chuỗi JSON
            date: Date.now()
        };

        // 8. Lưu vào MongoDB
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        // 9. Trả kết quả thành công
        res.json({ success: true, message: "Doctor Added" });

    } catch (error) {
        // 10. Bắt và in lỗi ra console, trả lỗi về client
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API for Admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(
                { email }, // payload là object
                process.env.JWT_SECRET
            )
            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {
        // Tìm tất cả các bác sĩ trong collection 'doctor'
        // .select('-password') có nghĩa là loại bỏ field 'password' khỏi kết quả trả về
        const doctors = await doctorModel.find({}).select('-password')

        // Trả về kết quả thành công dưới dạng JSON
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to get all appointments list
const appointmentsAdmin = async (req, res) => {

    try {

        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//API for appointment cancellation
const appointmentCancel = async (req, res) => {

    try {

        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)



        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        //releasing doctor slot

        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })

    }


}

//API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }
        res.json({ success: true, dashData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}
  

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard }