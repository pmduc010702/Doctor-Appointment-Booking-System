// AddDoctor.jsx
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { assets } from '../../assets/assets';
import axios from 'axios';

const schema = yup.object().shape({
  name: yup.string().required('Doctor name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Min 6 characters').required('Password is required'),
  experience: yup.string().required(),
  fees: yup.number().typeError('Fees must be a number').required('Fees is required'),
  about: yup.string().required('About is required'),
  speciality: yup.string().required(),
  degree: yup.string().required('Degree is required'),
  address1: yup.string().required('Address Line 1 is required'),
  address2: yup.string().required('Address Line 2 is required'),
});

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const { backendUrl, aToken } = useContext(AdminContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (formValues) => {
    if (!docImg) return toast.error('Please upload doctor image');

    const formData = new FormData();
    formData.append('image', docImg);
    formData.append('name', formValues.name);
    formData.append('email', formValues.email);
    formData.append('password', formValues.password);
    formData.append('experience', formValues.experience);
    formData.append('fees', formValues.fees);
    formData.append('about', formValues.about);
    formData.append('speciality', formValues.speciality);
    formData.append('degree', formValues.degree);
    formData.append('address', JSON.stringify({ line1: formValues.address1, line2: formValues.address2 }));

    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success(data.message);
        reset();
        setDocImg(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="m-5 w-full">
      <p className="mb-6 text-2xl font-semibold text-gray-800 text-center sm:text-left">Add New Doctor</p>

      <div className="bg-white px-4 sm:px-6 py-8 border rounded-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-md mx-auto">
        {/* Upload */}
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 mb-8 text-gray-600 sm:pl-2">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-20 h-20 object-cover bg-gray-100 border border-gray-300 rounded-full hover:opacity-90"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor"
            />
            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          </label>
          <p className="text-sm text-center sm:text-left">Upload Doctor<br />Picture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <label className="font-medium">Doctor Name</label>
            <input {...register('name')} className="input-style" placeholder="Name" />
            <p className="error-text">{errors.name?.message}</p>
          </div>

          <div>
            <label className="font-medium">Email</label>
            <input {...register('email')} className="input-style" placeholder="Email" />
            <p className="error-text">{errors.email?.message}</p>
          </div>

          <div>
            <label className="font-medium">Password</label>
            <input type="password" {...register('password')} className="input-style" placeholder="Password" />
            <p className="error-text">{errors.password?.message}</p>
          </div>

          <div>
            <label className="font-medium">Experience</label>
            <select {...register('experience')} className="input-style">
              {[...Array(10)].map((_, i) => (
                <option key={i}>{i + 1} Year</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium">Fees</label>
            <input type="number" {...register('fees')} className="input-style" placeholder="Fees" />
            <p className="error-text">{errors.fees?.message}</p>
          </div>

          <div>
            <label className="font-medium">Speciality</label>
            <select {...register('speciality')} className="input-style">
              {["General Physician", "Gynecologist", "Dermatologist", "Pediatrician", "Neurologist", "Gastroenterologist"].map((s, i) => (
                <option key={i}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium">Address Line 2</label>
            <input {...register('address2')} className="input-style" placeholder="Address Line 2" />
            <p className="error-text">{errors.address2?.message}</p>
          </div>

          <div>
            <label className="font-medium">Address Line 1</label>
            <input {...register('address1')} className="input-style" placeholder="Address Line 1" />
            <p className="error-text">{errors.address1?.message}</p>
          </div>

          <div>
            <label className="font-medium">Degree</label>
            <input {...register('degree')} className="input-style" placeholder="Degree" />
            <p className="error-text">{errors.degree?.message}</p>
          </div>
        </div>

        <div className="mt-6">
          <label className="font-medium">About Doctor</label>
          <textarea {...register('about')} className="w-full border rounded px-3 py-2 text-sm" rows="4" placeholder="Write about doctor..." />
          <p className="error-text">{errors.about?.message}</p>
        </div>

        <div className="text-right">
          <button type="submit" className="bg-primary px-8 py-3 mt-6 text-white rounded-full hover:bg-opacity-90 transition">
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
