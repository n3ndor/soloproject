import React, { useContext } from 'react';
import UserContext from '../UserContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosInstance';

const StepConfirm = ({ next, previous, data }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    let displayDate = new Date(data.date).toLocaleDateString();

    const handleClickBook = async (event) => {
        event.preventDefault();
        console.log("Raw date:", data.date);
        console.log("Booking request:", {
            userId: user._id,
            map: data.map,
            weapon: data.weapon,
            extras: data.extras,
            date: data.date,
        });

        try {
            const response = await axios.post('/api/bookings', {
                userId: user._id,
                map: data.map,
                weapon: data.weapon,
                extras: data.extras,
                date: data.date,
            });

            if (!data.date) {
                console.error('Date is not defined:', data.date);
                return;
            }

            console.log("Response data: ", response.data);
        } catch (error) {
            console.log("Booking request error: ", error);
            console.log("Error message: ", error.response.data);
        }
    }

    const handleClickCancel = () => {
        navigate('/');
    }

    return (
        <div className='m-3'>
            <h2 className='p-3'>Confirm Booking</h2>
            <p>Map: {data.map}</p>
            <p>Weapon: {data.weapon}</p>
            <p>Extras: {data.extras.join(", ")}</p>
            <p>Your date: {displayDate}</p>

            <Button className='m-1 bg-success' onClick={handleClickBook}>Book</Button>
            <Button className='m-1 bg-danger' onClick={handleClickCancel}>Cancel</Button>
        </div>
    );
}

export default StepConfirm;
