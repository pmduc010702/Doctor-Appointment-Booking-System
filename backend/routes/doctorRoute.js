import express from 'express'
import { doctorList, loginDoctor } from '../controllers/doctorControllers.js'



const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)



export default doctorRouter