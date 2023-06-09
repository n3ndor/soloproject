import React, { useState } from 'react';
import Stepper from 'react-stepper-horizontal';
import StepMap from './steps/StepMap';
import StepWeapon from './steps/StepWeapon';
import StepExtras from './steps/StepExtras';
import StepDate from './steps/StepDate';
import StepConfirm from './steps/StepConfirm';

const NewBooking = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [bookingData, setBookingData] = useState({
        map: '',
        weapon: '',
        extras: [],
        date: ''
    });

    const steps = [
        { title: 'Choose Map', imagePath: '/images/maps/m_apocalyptic.jpg' },
        { title: 'Select Weapon', imagePath: '/images/weapon-image-path.jpg' },
        { title: 'Add Extras', imagePath: '/images/extras-image-path.jpg' },
        { title: 'Pick Date', imagePath: '/images/date-image-path.jpg' },
        { title: 'Confirm Booking', imagePath: '/images/confirm-image-path.jpg' }
    ];

    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);

    const stepComponents = [
        <StepMap next={nextStep} setData={setBookingData} data={bookingData} imagePath={steps[0].imagePath} />,
        <StepWeapon next={nextStep} setData={setBookingData} data={bookingData} imagePath={steps[1].imagePath} />,
        <StepExtras next={nextStep} setData={setBookingData} data={bookingData} imagePath={steps[2].imagePath} />,
        <StepDate next={nextStep} setData={setBookingData} data={bookingData} imagePath={steps[3].imagePath} />,
        <StepConfirm prev={prevStep} setData={setBookingData} data={bookingData} imagePath={steps[4].imagePath} />
    ];

    return (
        <div>
            <Stepper steps={steps} activeStep={currentStep} />
            <div>{stepComponents[currentStep]}</div>
        </div>
    );
};

export default NewBooking;
