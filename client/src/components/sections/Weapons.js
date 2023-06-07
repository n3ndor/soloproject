// Weapons.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Weapons = () => {
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

    const weaponNames = ["dsr", "eclipse", "empire", "jt", "kingman", "nerf", "shocker", "tippmann"];

    return (
        <div id='weapons' className='carousel-wrapper' style={{ paddingTop: '70px', marginTop: '-70px' }}>
            <h2>Weapons</h2>
            <Slider {...settings}>
                {weaponNames.map((weaponName, index) => (
                    <div key={index} >
                        <img
                            className="carousel-img"
                            src={`/images/weapons/w_${weaponName}.jpg`}
                            alt={weaponName}
                        />
                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            {weaponName.charAt(0).toUpperCase() + weaponName.slice(1)}
                        </div>
                    </div>
                ))}
            </Slider>
            <br />
            <p>We provide a variety of top-grade weapons for you to choose from, </p>
            <p>including the DSR, Eclipse, Empire, JT, Kingman, Nerf, Shocker, and Tippmann. </p>
            <p>Each weapon has its unique attributes and uses, </p>
            <p>you can choose one that best fits your game strategy and style.</p>
        </div>

    );
}
export default Weapons;