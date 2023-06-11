import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axiosInstance';
import UserContext from './UserContext';
import { useContext } from 'react';
import Table from 'react-bootstrap/Table';

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

    return (
        <div className='m-3 bg-dark rounded-3'>
            <h2 className='p-3'>Your Old Bookings</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Map</th>
                        <th>Weapon</th>
                        <th>Extras</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{booking.map}</td>
                            <td>{booking.weapon}</td>
                            <td>{booking.extras.join(", ")}</td>
                            <td>{new Date(booking.date).toLocaleDateString()}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default OldBookings;
