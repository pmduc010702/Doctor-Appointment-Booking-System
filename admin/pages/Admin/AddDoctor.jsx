import React from 'react'
import { assets } from '../../assets/assets'

const AddDoctor = () => {
  return (
    <form  className='m-5 w-full'>

      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor='doc-img'>
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={assets.upload_area}></img>
          </label>
          <input type='file' id='doc-img' hidden></input>
          <p>Upload Doctor<br></br> Pitcure</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input className='border rounded px-3 py-2' type='text' placeholder='Name' required></input>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input className='border rounded px-3 py-2' type='email' placeholder='Email' required></input>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input className='border rounded px-3 py-2' type='password' placeholder='Password' required></input>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor's Experience</p>
              <select  className='border rounded px-3 py-2' name='' >
                <option value="1 Year" id='1y'>1 Year</option>
                <option value="2 Year" id='2y'>2 Year</option>
                <option value="3 Year" id='3y'>3 Year</option>
                <option value="4 Year" id='4y'>4 Year</option>
                <option value="5 Year" id='5y'>5 Year</option>
                <option value="6 Year" id='6y'>6 Year</option>
                <option value="7 Year" id='7y'>7 Year</option>
                <option value="8 Year" id='8y'>8 Year</option>
                <option value="9 Year" id='9y'>9 Year</option>
                <option value="10 Year" id='10y'>10 Year</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input className='border rounded px-3 py-2' type='number' placeholder='Fees' required></input>
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select className='border rounded px-3 py-2' name='' >
                <option value="General Physician" id='GP'>General Physician</option>
                <option value="Gynecologist" id='GY'>Gynecologist</option>
                <option value="Dermatologist" id='dt'>Dermatologist</option>
                <option value="Pediatrician" id='pd'>Pediatrician</option>
                <option value="Neurologist" id='nt'>Neurologist</option>
                <option value="Gastroenterologist" id='gt'>Gastroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input className='border rounded px-3 py-2' type='text' placeholder='Education' required></input>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input className='border rounded px-3 py-2' type='text' placeholder='Address line1' required></input>
              <input className='border rounded px-3 py-2' type='text' placeholder='Address line2' required></input>
            </div>

          </div>


        </div>

        <div>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea className='w-full px-4 pt-2 border rounded' placeholder='Write about Doctor' rows={5} required></textarea>
        </div>

        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Doctor</button>

      </div>

    </form>
  )
}

export default AddDoctor