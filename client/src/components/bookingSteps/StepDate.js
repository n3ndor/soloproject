import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button } from 'react-bootstrap';

const StepDate = ({ next, setData, data }) => {
    const [startDate, setStartDate] = React.useState(new Date());

    const handleClick = () => {
        setData(prevData => ({ ...prevData, date: startDate }));
        next();
    }

    return (
        <div className='m-3'>
            <h2 className='p-3'>Choose Date</h2>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <Button className='m-1 bg-success' onClick={handleClick}>Next</Button>
        </div>
    );
}

export default StepDate;
