// Carousel.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// In your component
const CarouselComponent = () => {
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
            <Slider {...settings}>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                    <div key={num} >
                        <img
                            className="carousel-img"
                            src={`/images/pic${num}.jpg`}
                            alt={`Slide ${num}`}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default CarouselComponent;
