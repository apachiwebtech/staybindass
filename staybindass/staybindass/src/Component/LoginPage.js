import React, { useState } from 'react';
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import md5 from 'js-md5';
import InnerHeader from './InnerHeader';

const LoginPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const mail = values.email;
    const pass = values.password;

    const hashedPassword = md5(pass);
    console.log(hashedPassword)

    const data = {
      email: values.email,
      password: hashedPassword,
    };

    if (!mail) {
      document.getElementById('error_mail').innerHTML = '<p>Please enter a valid email id.</p>';
      setTimeout(() => {
        document.getElementById('error_mail').innerHTML = '';
      }, 5000);
      return;
    }

    if (!pass) {
      $('#error_pass').html('<p>Please enter a password.</p>').css({ color: 'red' });
      setTimeout(function () {
        $('#error_pass').html('');
      }, 5000);
      return; // Prevent form submission
    }

    axios.post('http://localhost:8081/awt_registeruser', data)
      .then((res) => {
        if (res.data.userId) {
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('email', res.data.email);
          localStorage.setItem('mobile', res.data.mobile);
          localStorage.setItem('fullname', res.data.fullname);
          navigate('/myprofile');
        } else {
          navigate('/loginpage');
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  return (
    <div>
      <InnerHeader/>
      <div className='login container mt80'>
        <ul className='nav nav-pills mb-3' id='pills-tab' role='tablist'>
          <li className='nav-item w-100' role='presentation'>
            <button className='nav-link active w-100' id='pills-home-tab' data-bs-toggle='pill' data-bs-target='#pills-home' type='button' role='tab' aria-controls='pills-home' aria-selected='true'>
              Login
            </button>
          </li>
        </ul>

        <div className='tab-content' id='pills-tabContent'>
          <div className='tab-pane fade show active' id='pills-home' role='tabpanel' aria-labelledby='pills-home-tab' tabindex='0'>
            <h2 className='head'>Stay Bindass With Us!</h2>
            <p>Let's log you in</p>

            <form name='form' onSubmit={handleSubmit} id='form'>
              <div className='row'>
                <div className='mb-3'>
                  <label htmlFor='exampleInputEmail1' className='form-label'>
                    Email
                  </label>
                  <input type='email' className='form-control' id='mail' value={values.email} onChange={handleChange} name='email' />
                  <span id='error_mail'></span>
                </div>
                <div className='mb-3'>
                  <label htmlFor='email1' name='pass' className='form-label'>
                    password
                  </label>
                  <input type='password' className='form-control' id='pass' onChange={handleChange} value={values.password} name='password' />
                  <span id='error_pass'></span>
                </div>
                <p id='error_form'></p>
                <button type='submit' className='btn w-100 submit-btn' name='submit' id='submit'>
                  submit
                </button>
              </div>

          
            </form>
            <div className='mt-2'>
                <p  style={{display: "inline"}}>Dont have a account ...</p><Link to="/reg">Register here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
