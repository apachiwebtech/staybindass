import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SimpleSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 900,
        settings: {
          className: 'center',
          centerMode: true,
          infinite: true,
          centerPadding: '60px',
          slidesToShow: 3,
          speed: 500,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: true,
          infinite: true,
          speed: 2000,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const [villa, setVilla] = useState([]);

  const fetchjson = () => {
    fetch('http://localhost:8081/destination_master')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setVilla(data);
    });
  };

  useEffect(() => {
    fetchjson();
  }, []);




  return (
    <>
      <div >
        <div className='carousle-dest '>
          <div className='head-dest p-3'>
            <h2>Browse By Destination</h2>
          </div>
          <Slider {...settings}>
            {villa.map((item) => {
              return (
                // <Link to={`/listing?search=${item.title}`} key={item.id}>
                <Link to={`/listingNew/${item.title}`} key={item.id}>
                  <div className='item'>
                    <img src={'https://staybindass.com/upload/destination_master/' + item.logo} style={{width:"90px"}} alt='' />
                    <p>{item.title}</p>
                  </div>
                </Link>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default SimpleSlider;
