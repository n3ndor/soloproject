import React, { useState } from 'react';
import { Button, Image, Row, Col } from 'react-bootstrap';

const StepWeapon = ({ next, prev, setData, data }) => {
    const weaponNames = ["dsr", "eclipse", "empire", "jt", "kingman", "nerf", "shocker", "tippmann"];
    const [selectedWeapon, setSelectedWeapon] = useState(null);

    const handleClick = (weaponName) => {
        setSelectedWeapon(weaponName);
        setData(prevData => ({ ...prevData, weapon: weaponName }));
    }

    const handleNext = () => {
        if (selectedWeapon) {
            next();
        } else {
            alert("Please select a weapon before proceeding.");
        }
    }

    return (
        <div style={{ "padding": "3%" }}>
            <h2>Step 2: Choose Weapon</h2>
            <Row>
                {weaponNames.map((weaponName, index) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={index} >
                        <Button variant="link" onClick={() => handleClick(weaponName)}>
                            <Image
                                fluid
                                src={`/images/weapons/w_${weaponName}.jpg`}
                                alt={weaponName}
                                thumbnail
                                style={selectedWeapon === weaponName ? { border: '3px solid green', boxShadow: "0px 0px 10px 5px yellow" } : {}}
                            />
                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                {weaponName.charAt(0).toUpperCase() + weaponName.slice(1)}
                            </div>
                        </Button>
                    </Col>
                ))}
            </Row>
            <div className="d-flex justify-content-around">
                <Button className='bg-success' onClick={prev}>Back</Button>
                <Button className='bg-success' onClick={handleNext}>Next</Button>
            </div>
        </div>
    );
}

export default StepWeapon;
