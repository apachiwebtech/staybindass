import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCount from '../utils/Count';


const Footer = () => {

  const {select, fetchData} = useCount();
  useEffect(()=>{
    fetchData()
  },[]);

  return (
    <div className='foot fixed-bottom'>
      

      <div className='row'>
        <Link to='/' className='col-3 border-1 text-center py-3 active'>
          <div>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-house-door' viewBox='0 0 16 16'>
              <path d='M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z' />
            </svg>
            <p>Home</p>
          </div>
        </Link>

        <Link to='/mybooking' className='col-3 border-1 text-center py-3'>
          <div>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-bag-check' viewBox='0 0 16 16'>
              <path fillRule='evenodd' d='M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z' />
              <path d='M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z' />
            </svg>
            <p>My Booking</p>
          </div>
        </Link>

        <Link to='/wishlist' className='col-3 border-1 text-center py-3'>
          <div style={{ position: 'relative' }}>
            <p className='wishCount'>{select?.data}</p>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-heart' viewBox='0 0 16 16'>
              <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
            </svg>
            <p>Wish List</p>
          </div>
        </Link>

        <Link to='/myprofile' className='col-3 border-1 text-center py-3'>
          <div>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-person' viewBox='0 0 16 16'>
              <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z' />
            </svg>
            <p>Profile</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
