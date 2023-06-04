// Maps.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Maps = () => {
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

    // Define the map names
    const mapNames = ["apocalyptic", "castle", "cave", "city", "container", "indoor", "inflatable", "lake"];

    return (
        <div id='maps' className='carousel-wrapper' style={{ paddingTop: '70px', marginTop: '-70px' }}>
            <h2>Maps</h2>
            <Slider {...settings}>
                {mapNames.map((mapName, index) => (
                    <div key={index} >
                        <img
                            className="carousel-img"
                            src={`/images/maps/m_${mapName}.jpg`}
                            alt={mapName}
                        />
                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            {mapName.charAt(0).toUpperCase() + mapName.slice(1)}
                        </div>
                    </div>
                ))}
            </Slider>
            <br />
            <p>Each of our eight maps offers a unique paintball experience to suit every style and level of play. </p>
            <p>Traverse the medieval castle, survive in the apocalyptic cityscape, or sneak through our container maze. </p>
            <p>Take a dip into our lake map, right next to a real lake. Challenge yourself with our inflatable arena. </p>
            <p>If the weather takes a turn, you can still enjoy the action indoors or explore our intricate cave system.</p>
            <p>Every game is a new adventure!</p>
        </div>
    );
}

export default Maps;
