import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Extras = () => {
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

    const extraNames = ["cafe", "alcohol", "steak", "fast-food", "shop", "taxi"];
    return (
        <div id='extras' className='carousel-wrapper' style={{ paddingTop: '70px', marginTop: '-70px' }}>
            <h2>Extras</h2>
            <Slider {...settings}>
                {extraNames.map((extraName, index) => (
                    <div key={index} >
                        <img
                            className="carousel-img"
                            src={`/images/extras/e_${extraName}.jpg`}
                            alt={extraName}
                        />
                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            {extraName.charAt(0).toUpperCase() + extraName.slice(1)}
                        </div>
                    </div>
                ))}
            </Slider>
            <br />
            <p>After a day of intense paintball battles, relax and refuel with our range of drinks and foods. </p>
            <p>If you need a ride home, don't worry - we offer a shuttle service to make your journey as easy as possible. </p>
            <p> Our goal is to ensure that you have an enjoyable and hassle-free paintball experience from start to finish.</p>
        </div>
    )
};

export default Extras;