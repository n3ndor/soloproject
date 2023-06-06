import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StepConfirm = ({ next, previous, data }) => {
    const navigate = useNavigate();

    const handleClickBook = () => {
        console.log(data);
        navigate('/');
    }

    const handleClickCancel = () => {
        navigate('/');
    }

    const formattedDate = data.date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className='m-3'>
            <h2 className='p-3'>Confirm Booking</h2>
            <p>Map: {data.map}</p>
            <p>Weapon: {data.weapon}</p>
            <p>Extras: {data.extras.join(", ")}</p>
            <p>Date: {formattedDate}</p>

            <Button className='m-1 bg-success' onClick={handleClickBook}>Book</Button>
            <Button className='m-1 bg-danger' onClick={handleClickCancel}>Cancel</Button>
        </div>
    );
}

export default StepConfirm;
