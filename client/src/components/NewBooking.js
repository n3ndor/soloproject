import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stepper from 'react-stepper-horizontal';
import StepMap from './steps/StepMap';
import StepWeapon from './steps/StepWeapon';
import StepExtras from './steps/StepExtras';
import StepDate from './steps/StepDate';
import StepConfirm from './steps/StepConfirm';
import UserContext from './UserContext';

const NewBooking = () => {
    const { user } = useContext(UserContext);
    const [currentStep, setCurrentStep] = useState(0);
    const [bookingData, setBookingData] = useState({
        map: '',
        weapon: '',
        extras: [],
        date: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const steps = [
        { title: 'Choose Map', imagePath: '/images/maps/m_apocalyptic.jpg' },
        { title: 'Select Weapon', imagePath: '/images/weapon-image-path.jpg' },
        { title: 'Add Extras', imagePath: '/images/extras-image-path.jpg' },
        { title: 'Pick Date', imagePath: '/images/date-image-path.jpg' },
        { title: 'Confirm Booking', imagePath: '/images/confirm-image-path.jpg' }
    ];

    const nextStep = () => {
        console.log("Current data before next step: ", bookingData);
        setCurrentStep(currentStep + 1);
    };
    const prevStep = () => setCurrentStep(currentStep - 1);

    const StepComponent = [StepMap, StepWeapon, StepExtras, StepDate, StepConfirm][currentStep];

    return (
        <div>
            <Stepper steps={steps} activeStep={currentStep} />
            <div>
                <StepComponent
                    next={nextStep}
                    prev={prevStep}
                    setData={setBookingData}
                    data={bookingData}
                    imagePath={steps[currentStep].imagePath}
                    user={user}
                />
            </div>
        </div>
    );
};

export default NewBooking;
