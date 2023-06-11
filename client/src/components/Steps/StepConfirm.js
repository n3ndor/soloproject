import React, { useContext } from 'react';
import UserContext from '../UserContext';
import { Button, Dropdown, Image, Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosInstance';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const StepConfirm = ({ prev, data, setData }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    let displayDate = new Date(data.date).toLocaleDateString();

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
                        <td>{data.map}</td>
                        <td>{data.weapon}</td>
                        <td>
                            {data.extras.map((extra, index) => (
                                <p key={index}>{extra}</p>
                            ))}
                        </td>
                        <td>{displayDate}</td>
                    </tr>
                    <tr>
                        <td>Change</td>
                        <td>
                            <Dropdown onSelect={(val) => setData({ ...data, map: val })}>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {data.map || 'Select a map'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {mapNames.map((mapName, index) => (
                                        <Dropdown.Item eventKey={mapName} key={index}>{mapName.charAt(0).toUpperCase() + mapName.slice(1)}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                        <td>
                            <Dropdown onSelect={(val) => setData({ ...data, weapon: val })}>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {data.weapon || 'Select a weapon'}
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
                                        checked={data.extras.includes(extraName)}
                                        onChange={handleExtraChange}
                                        key={index}
                                    />
                                ))}
                            </Form>
                        </td>
                        <td>
                            <DatePicker className='text-black' selected={data.date} onChange={(date) => setData({ ...data, date: date })} />
                        </td>
                    </tr>
                    <tr>
                        <td>Image preview</td>
                        <td><Image src={`/images/maps/m_${data.map}.jpg`} alt={data.map} width="100px" height="100px" /></td>
                        <td><Image src={`/images/weapons/w_${data.weapon}.jpg`} alt={data.weapon} width="100px" height="100px" /></td>
                        <td>
                            {data.extras.map((extra, index) => (
                                <Image key={index} src={`/images/extras/e_${extra}.jpg`} alt={extra} width="100px" height="100px" />
                            ))}
                        </td>
                        <td></td>
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
