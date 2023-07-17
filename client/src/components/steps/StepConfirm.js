import React, { useContext } from 'react';
import UserContext from '../UserContext';
import { Button, Image, Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosInstance';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const StepConfirm = ({ prev, data, setData }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const mapNames = ["apocalyptic", "castle", "cave", "city", "container", "indoor", "inflatable", "lake"];
    const weaponNames = ["dsr", "eclipse", "empire", "jt", "kingman", "nerf", "shocker", "tippmann"];
    const extraNames = ["alcohol", "cafe", "fast-food", "shop", "steak", "taxi"];

    const handleExtraChange = (e) => {
        let newExtras = [...data.extras];

        if (e.target.checked) {
            newExtras.push(e.target.name);
        } else {
            newExtras = newExtras.filter(extra => extra !== e.target.name);
        }

        setData({ ...data, extras: newExtras });
    }

    const handleClickBook = async (event) => {
        event.preventDefault();

        try {
            await axios.post('/api/bookings', {
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

            navigate("/")
        } catch (error) {
            console.log("Booking request error: ", error);
        }
    }

    const handleClickCancel = () => {
        navigate('/');
    }

    return (
        <div className='m-3'>
            <h2 className='p-3'>Confirm Booking</h2>

            <Table responsive variant="dark" className="vertical-line">
                <thead>
                    <tr>
                        <th>Map</th>
                        <th>Weapon</th>
                        <th>Extras</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td >
                            <Form>
                                {mapNames.map((mapName, index) => (
                                    <Form.Check
                                        type="radio"
                                        id={`map-${index}`}
                                        label={mapName.charAt(0).toUpperCase() + mapName.slice(1)}
                                        name='map'
                                        value={mapName}
                                        checked={data.map === mapName}
                                        onChange={(e) => setData({ ...data, map: e.target.value })}
                                        key={index}
                                    />
                                ))}
                            </Form>
                            <Image src={`/images/maps/m_${data.map}.jpg`} alt={data.map} width="100px" height="100px" />
                        </td>
                        <td >
                            <Form>
                                {weaponNames.map((weaponName, index) => (
                                    <Form.Check
                                        type="radio"
                                        id={`weapon-${index}`}
                                        label={weaponName.charAt(0).toUpperCase() + weaponName.slice(1)}
                                        name='weapon'
                                        value={weaponName}
                                        checked={data.weapon === weaponName}
                                        onChange={(e) => setData({ ...data, weapon: e.target.value })}
                                        key={index}
                                    />
                                ))}
                            </Form>
                            <Image src={`/images/weapons/w_${data.weapon}.jpg`} alt={data.weapon} width="100px" height="100px" />
                        </td>
                        <td >
                            <Form>
                                {extraNames.map((extraName, index) => (
                                    <Form.Check
                                        type="checkbox"
                                        id={`extra-${index}`}
                                        label={extraName.charAt(0).toUpperCase() + extraName.slice(1)}
                                        name={extraName}
                                        checked={data.extras.includes(extraName)}
                                        onChange={handleExtraChange}
                                        key={index}
                                    />
                                ))}
                            </Form>
                            <div>
                                {data.extras.map((extra, index) => (
                                    <Image key={index} className='m-1' src={`/images/extras/e_${extra}.jpg`} alt={extra} width="30%" />
                                ))}
                            </div>
                        </td>
                        <td >
                            <DatePicker
                                inline
                                className='text-black'
                                selected={data.date}
                                onChange={(date) => setData({ ...data, date: date })}
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>
            <div className="d-flex justify-content-around">
                <Button className='m-3 ' onClick={prev}>Back</Button>
                <Button className='m-3 bg-danger' onClick={handleClickCancel}>Cancel</Button>
                <Button className='m-3 bg-success' onClick={handleClickBook}>Book</Button>
            </div>
        </div>
    );
}

export default StepConfirm;