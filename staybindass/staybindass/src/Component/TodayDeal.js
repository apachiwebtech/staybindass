import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useCount from '../utils/Count';

const TodaysDeal = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 0,
    slidesToScroll: 3,
    autoplay: true,
    speed: 2000,

    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          speed: 2000,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [villas, setvilla] = useState([]);
  const [wishdata, setwishdata] = useState([]);

  const fetchJson = () => {
    fetch('http://localhost:8081/current_deal')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setvilla(data);
      });
  };
  useEffect(() => {
    fetchJson();
  }, []);


  async function getwishdata() {
    const data = {
      user_id: localStorage.getItem('userId')
    }
    axios.post("http://localhost:8081/wish_data", data)
      .then((res) => {
        setwishdata(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getwishdata()

  }, [])

  const { fetchData } = useCount();

  const  navigate = useNavigate();

  const onhandleClick = async (id) => {
    const data = {
      property_id: id,
      user_id: localStorage.getItem('userId'),
    };

    if (localStorage.getItem('userId') ===  null) {
      navigate('/loginpage')
    }
    else {
      if (wishdata.some((item) => item.property_id === id)) {
        await axios.post('http://localhost:8081/wish_delete', data);

      } else {
        await axios.post('http://localhost:8081/wishlist', data);

      }
   
    }

     

    fetchData()
    getwishdata()
  };


  return (
    <>
      <div className='today-deal container'>
        <div className='head-dest p-2'>
          <h2>Today's Deal</h2>
        </div>

        <div className='t-datepicker'>
          <div className='t-check-in'></div>
          <div className='t-check-out'></div>
        </div>

        <Slider {...settings}>
          {villas.map((item, index) => {
            return (
              <div key={index}>
                <div style={{ position: 'relative' }}>
                  <i className={wishdata.some((ele) => ele.property_id === item.property_id) ? 'bi bi-heart-fill heartbtn heartred' : 'bi bi-heart-fill heartbtn '} onClick={() => onhandleClick(item.property_id)}></i>
                </div>
                <Link to={`/hotelmenu/${item.property_id}/${item.property_price}`} key={item.id}>
                  <div className='item card my-3 overflow-hidden' key={item.id}>
                    <div className='img-fit'>
                      <img src={'https://staybindass.com/upload/property_thumbnail/' + item?.uploadimage} alt='' />
                      <p className='night-label '>{item.night} </p>
                    </div>

                    <div className='info-part'>
                      <h4>{item?.title} </h4>
                      <p className='dest-text'>
                        {item?.city} , {item?.name} , India
                      </p>
                      <p className='dest-text'>
                        {item?.minguest} Guest | {item?.r_type} Bedrooms | {item?.pool}
                      </p>
                      <p className='dest-text'>
                        <b>
                          <span className='fs-5'>₹{item.property_price}</span> /night
                        </b>
                      </p>
                      <p className='extra-text'>(exc. taxes & charges)</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default TodaysDeal;
