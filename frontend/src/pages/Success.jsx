import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useContext(AppContext);

    const backendUrl = import.meta.env.VITE_BACKEND_URL; 

    useEffect(() => {
        const updatePaymentStatus = async () => {
            const searchParams = new URLSearchParams(location.search);
            const appointmentId = searchParams.get('appointmentId');

            console.log("✅ appointmentId from query:", appointmentId);

            if (!appointmentId) {
                toast.error('Missing appointment ID!');
                return;
            }

            try {
                const { data } = await axios.post(
                    `${backendUrl}/api/user/confirm-payment`,
                    { appointmentId },
                    {
                        headers: {
                            token: token,
                        },
                    }
                );

                if (data.success) {
                    toast.success('Payment confirmed!');
                    setTimeout(() => {
                        navigate('/my-appointments');
                    }, 1000);
                } else {
                    toast.error(data.message || 'Payment confirmation failed');
                }
            } catch (err) {
                console.log(err);
                toast.error('Something went wrong!');
            }
        };

        updatePaymentStatus();
    }, [location, navigate, token]);

    return <p className="p-4">✅ Processing payment, please wait...</p>;
};

export default Success;
