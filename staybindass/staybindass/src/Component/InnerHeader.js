import React from 'react';
import { useNavigate } from 'react-router-dom';

const InnerHeader = () => {
  const navigate = useNavigate();
  return (
    <div className='d-flex align-items-center innerhead' style={{height : "80px", width: "100%"}}>
      <div className='round' style={{marginLeft : "10px"}}>
        <i onClick={() => navigate(-1)} className='bi bi-arrow-left' ></i>
      </div>
      <div>

      </div>
    </div>
  );
};

export default InnerHeader;
