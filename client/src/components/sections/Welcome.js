import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Welcome = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        draggable: true,

        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    dots: true,
                    infinite: true,
                    autoplay: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,

                }
            }
        ]
    };
    return (
        <div className='carousel-wrapper'>
            <h2>Welcome to Galactical Paintball!</h2>
            <p>We promise you the best paintball experience in the universe and beyond.</p>

            <Slider {...settings}>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                    <div key={num} >
                        <img
                            className="carousel-img"
                            src={`/images//pics/pic${num}.jpg`}
                            alt={`Slide ${num}`}
                        />
                    </div>
                ))}
            </Slider>
            <br />
            <br />
            <p>Prepare yourself for an unforgettable adventure and challenge yourself in one of our numerous diverse maps. </p>
            <p> Choose your weapon and let the games begin!</p>
        </div>
    );
}

export default Welcome;
