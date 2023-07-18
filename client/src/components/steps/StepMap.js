import React, { useState } from 'react';
import { Button, Image, Row, Col } from 'react-bootstrap';

const StepMap = ({ next, setData, data }) => {
    const mapNames = ["apocalyptic", "castle", "cave", "city", "container", "indoor", "inflatable", "lake"];
    const [selectedMap, setSelectedMap] = useState(null);

    const handleClick = (mapName) => {
        setSelectedMap(mapName);
        setData(prevData => ({ ...prevData, map: mapName }));
    }

    const handleNext = () => {
        if (selectedMap) {
            next();
        } else {
            alert("Please select a map before proceeding.");
        }
    }

    return (
        <div className="step-number" style={{ "padding": "3%" }}>
            <h2>Step 1: Choose Map</h2>
            <Row>
                {mapNames.map((mapName, index) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={index} >
                        <Button variant="link" onClick={() => handleClick(mapName)}>
                            <Image
                                fluid
                                src={`/images/maps/m_${mapName}.jpg`}
                                alt={mapName}
                                thumbnail
                                style={selectedMap === mapName ? { border: '3px solid green', boxShadow: "0px 0px 10px 5px yellow" } : {}}
                            />
                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                {mapName.charAt(0).toUpperCase() + mapName.slice(1)}
                            </div>
                        </Button>
                    </Col>
                ))}
            </Row>
            <div className="d-flex justify-content-end">
                <Button className='bg-success ' onClick={handleNext}>Next</Button>
            </div>
        </div>
    );
}

export default StepMap;
