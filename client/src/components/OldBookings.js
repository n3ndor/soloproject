import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axiosInstance';
import UserContext from './UserContext';
import { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const OldBookings = () => {
    const { user, userToken } = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        const getBookings = async () => {
            try {
                const response = await axios.get('/api/bookings', {
                    headers: { Authorization: `Bearer ${userToken}` },
                });

                setBookings(response.data);
            } catch (error) {
                console.log("Error getting bookings: ", error);
            }
        };

        getBookings();
    }, [userToken]);

    const handleUpdate = (bookingId) => {
        navigate(`/bookings/update/${bookingId}`);
    };

    const handleDelete = async (bookingId) => {
        try {
            await axios.delete(`/api/bookings/${bookingId}`, {
                headers: { Authorization: `Bearer ${userToken}` },
            });

            setBookings(bookings.filter(booking => booking._id !== bookingId));
        } catch (error) {
            console.log("Error deleting booking: ", error);
        }
    };

    return (
        <div className='m-3 bg-dark rounded-3'>
            <h2 className='p-3'>Your Old Bookings</h2>
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Map</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index}>
                            <td><div className="cell-content">{index + 1}</div></td>
                            <td><div className="cell-content">{booking.map}</div></td>
                            <td><div className="cell-content">{new Date(booking.date).toLocaleDateString()}</div></td>
                            <td>
                                <Button className='mx-2' variant="warning" onClick={() => handleUpdate(booking._id)}>Update</Button>
                                <Button className='mx-2' variant="danger" onClick={() => handleDelete(booking._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default OldBookings;
