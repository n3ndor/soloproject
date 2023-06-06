// StepExtras.js
import React, { useState } from 'react';
import { Image, Row, Col, Button } from 'react-bootstrap';

const StepExtras = ({ next, setData, data }) => {
    const extraNames = ["cafe", "alcohol", "steak", "fast-food", "shop", "taxi"];
    const [selectedExtras, setSelectedExtras] = useState([]);

    const handleSelect = (extraName) => {
        if (selectedExtras.includes(extraName)) {
            setSelectedExtras(selectedExtras.filter(extra => extra !== extraName));
        } else {
            setSelectedExtras([...selectedExtras, extraName]);
        }
    }

    const handleNext = () => {
        setData(prevData => ({ ...prevData, extras: selectedExtras }));
        next();
    }

    return (
        <div style={{ "padding": "3%" }}>
            <h2>Step 3: Choose Extras</h2>
            <Row>
                {extraNames.map((extraName, index) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={index} >
                        <div onClick={() => handleSelect(extraName)}>
                            <Image
                                fluid
                                src={`/images/extras/e_${extraName}.jpg`}
                                alt={extraName}
                                thumbnail
                                style={selectedExtras.includes(extraName) ? { border: '2px solid green' } : {}}
                            />
                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                {extraName.charAt(0).toUpperCase() + extraName.slice(1)}
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
            <Button variant="success" onClick={handleNext}>Next</Button>
        </div>
    );
}

export default StepExtras;
