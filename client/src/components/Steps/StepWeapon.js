// StepWeapon.js
import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';

const StepWeapon = ({ next, setData, data }) => {
    const weaponNames = ["dsr", "eclipse", "empire", "jt", "kingman", "nerf", "shocker", "tippmann"];

    const handleClick = (weaponName) => {
        setData(prevData => ({ ...prevData, weapon: weaponName }));
        next();
    }

    return (
        <div style={{ "padding": "3%" }}>
            <h2>Step 2: Choose Weapon</h2>
            <Row>
                {weaponNames.map((weaponName, index) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={index} >
                        <Image
                            onClick={() => handleClick(weaponName)}
                            fluid
                            src={`/images/weapons/w_${weaponName}.jpg`}
                            alt={weaponName}
                            thumbnail
                        />
                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            {weaponName.charAt(0).toUpperCase() + weaponName.slice(1)}
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default StepWeapon;
