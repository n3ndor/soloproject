import React, { useContext, useEffect, useState } from 'react';
import UserContext from './UserContext';
import { Button, Dropdown, Image, Table, Form } from 'react-bootstrap';
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
                console.log(`Fetching booking with ID: ${id}`);
                const response = await axios.get(`/api/bookings/${id}`, {
                    headers: { Authorization: `Bearer ${userToken}` },
                });
                console.log(response.data);
                setBookingData(response.data);
            } catch (error) {
                console.log("Error getting bookings: ", error);
            }

        };

        getBookings();
    }, [id, userToken]);

    const handleMapChange = (map) => {
        setBookingData({ ...bookingData, map });
    };

    const handleWeaponChange = (weapon) => {
        setBookingData({ ...bookingData, weapon });
    };

    const handleDateChange = (date) => {
        setBookingData({ ...bookingData, date });
    };

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
                        <th></th>
                        <th>Map</th>
                        <th>Weapon</th>
                        <th>Extras</th>
                        <th>Your date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Your chosen</td>
                        <td>{bookingData.map}</td>
                        <td>{bookingData.weapon}</td>
                        <td>
                            {bookingData.extras.map((extra, index) => (
                                <p key={index}>{extra}</p>
                            ))}
                        </td>
                        <td>{new Date(bookingData.date).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Change</td>
                        <td>
                            <Dropdown onSelect={handleMapChange}>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {bookingData.map || 'Select a map'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {mapNames.map((mapName, index) => (
                                        <Dropdown.Item eventKey={mapName} key={index}>{mapName.charAt(0).toUpperCase() + mapName.slice(1)}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                        <td>
                            <Dropdown onSelect={handleWeaponChange}>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {bookingData.weapon || 'Select a weapon'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {weaponNames.map((weaponName, index) => (
                                        <Dropdown.Item eventKey={weaponName} key={index}>{weaponName.charAt(0).toUpperCase() + weaponName.slice(1)}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
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
                        </td>
                        <td>
                            <DatePicker className='text-black' selected={new Date(bookingData.date)} onChange={handleDateChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>Image preview</td>
                        <td>
                            {bookingData.map &&
                                <Image src={`/images/maps/m_${bookingData.map}.jpg`} alt={bookingData.map} width="100px" height="100px" />}
                        </td>
                        <td>
                            {bookingData.weapon &&
                                <Image src={`/images/weapons/w_${bookingData.weapon}.jpg`} alt={bookingData.weapon} width="100px" height="100px" />}
                        </td>
                        <td>
                            {bookingData.extras.map((extra, index) => (
                                <Image key={index} src={`/images/extras/e_${extra}.jpg`} alt={extra} width="100px" height="100px" />
                            ))}
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
            <Button variant="primary" onClick={updateBooking}>Update Booking</Button>
        </div>
    );
};

export default UpdateBooking;
