import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Container, Row, Col } from 'react-bootstrap';

const StepDate = ({ next, prev, setData }) => {
    const [startDate, setStartDate] = React.useState(new Date());

    const handleNext = () => {
        setData(prevData => ({ ...prevData, date: startDate }));
        next();
    }

    return (
        <div className='m-3'>
            <h2 className='p-3'>Choose Date</h2>
            <p>Our Team awaits you 365 days a year and 24 hours a day</p>
            <p>Just pick a day and we organize your day full of fun</p>
            <Container className="d-flex justify-content-center align-items-center">
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <DatePicker inline className='text-black' selected={startDate} onChange={(date) => setStartDate(date)} minDate={new Date()} />
                    </Col>
                </Row>
            </Container>
            <div className="d-flex justify-content-around">
                <Button className='bg-success' onClick={prev}>Back</Button>
                <Button className='bg-success' onClick={handleNext}>Next</Button>
            </div>
        </div>
    );
}

export default StepDate;