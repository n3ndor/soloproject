import React from 'react';
import { Button, Image, Row, Col } from 'react-bootstrap';

const StepMap = ({ next, setData, data }) => {
    const mapNames = ["apocalyptic", "castle", "cave", "city", "container", "indoor", "inflatable", "lake"];

    const handleClick = (mapName) => {
        setData(prevData => ({ ...prevData, map: mapName }));
        next();
    }

    return (
        <div style={{ "padding": "3%" }}>
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
                            />
                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                {mapName.charAt(0).toUpperCase() + mapName.slice(1)}
                            </div>
                        </Button>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default StepMap;
