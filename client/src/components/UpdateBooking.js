import React, { useContext, useEffect, useState } from 'react';
import UserContext from './UserContext';
import { Button, Image, Table, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './axiosInstance';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const UpdateBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, userToken } = useContext(UserContext);

    const mapNames = ["apocalyptic", "castle", "cave", "city", "container", "indoor", "inflatable", "lake"];
    const weaponNames = ["dsr", "eclipse", "empire", "jt", "kingman", "nerf", "shocker", "tippmann"];
    const extraNames = ["alcohol", "cafe", "fast-food", "shop", "steak", "taxi"];

    const [bookingData, setBookingData] = useState({
        map: '',
        weapon: '',
        extras: [],
        date: new Date()
    });

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        const getBookings = async () => {
            try {
                const response = await axios.get(`/api/bookings/${id}`, {
                    headers: { Authorization: `Bearer ${userToken}` },
                });
                setBookingData(response.data);
            } catch (error) {
                console.log("Error getting bookings: ", error);
            }

        };

        getBookings();
    }, [id, userToken]);

    const handleExtraChange = (e) => {
        let newExtras = [...bookingData.extras];
        if (e.target.checked) {
            newExtras.push(e.target.name);
        } else {
            newExtras = newExtras.filter(extra => extra !== e.target.name);
        }
        setBookingData({ ...bookingData, extras: newExtras });
    };

    const updateBooking = async () => {
        try {
            await axios.put(`/api/bookings/${id}`, bookingData, {
                headers: { Authorization: `Bearer ${userToken}` },
            });
            navigate('/old-bookings');
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    return (
        <div className='m-3'>
            <h2 className='p-3'>Update Booking</h2>
            <Table responsive variant="dark" className="vertical-line">
                <thead>
                    <tr>
                        <th>Map</th>
                        <th>Weapon</th>
                        <th>Extras</th>
                        <th>Your date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Form>
                                {mapNames.map((mapName, index) => (
                                    <Form.Check
                                        type="radio"
                                        id={`map-${index}`}
                                        label={mapName.charAt(0).toUpperCase() + mapName.slice(1)}
                                        name='map'
                                        value={mapName}
                                        checked={bookingData.map === mapName}
                                        onChange={(e) => setBookingData({ ...bookingData, map: e.target.value })}
                                        key={index}
                                    />
                                ))}
                            </Form>
                            <Image src={`/images/maps/m_${bookingData.map}.jpg`} alt={bookingData.map} width="100px" height="100px" />
                        </td>
                        <td>
                            <Form>
                                {weaponNames.map((weaponName, index) => (
                                    <Form.Check
                                        type="radio"
                                        id={`weapon-${index}`}
                                        label={weaponName.charAt(0).toUpperCase() + weaponName.slice(1)}
                                        name='weapon'
                                        value={weaponName}
                                        checked={bookingData.weapon === weaponName}
                                        onChange={(e) => setBookingData({ ...bookingData, weapon: e.target.value })}
                                        key={index}
                                    />
                                ))}
                            </Form>
                            <Image src={`/images/weapons/w_${bookingData.weapon}.jpg`} alt={bookingData.weapon} width="100px" height="100px" />
                        </td>
                        <td>
                            <Form>
                                {extraNames.map((extraName, index) => (
                                    <Form.Check
                                        type="checkbox"
                                        id={`extra-${index}`}
                                        label={extraName.charAt(0).toUpperCase() + extraName.slice(1)}
                                        name={extraName}
                                        checked={bookingData.extras.includes(extraName)}
                                        onChange={handleExtraChange}
                                        key={index}
                                    />
                                ))}
                            </Form>
                            <div>
                                {bookingData.extras.map((extra, index) => (
                                    <Image key={index} className='m-1' src={`/images/extras/e_${extra}.jpg`} alt={extra} width="30%" />
                                ))}
                            </div>
                        </td>
                        <td>
                            <DatePicker
                                inline
                                className='text-black'
                                selected={new Date(bookingData.date)}
                                onChange={(date) => setBookingData({ ...bookingData, date: date })}
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>

            <div className="d-flex justify-content-center">
                <Button className='m-3 bg-success right' onClick={updateBooking}>Save and Go Back</Button>
            </div>
        </div>
    );
};

export default UpdateBooking;
