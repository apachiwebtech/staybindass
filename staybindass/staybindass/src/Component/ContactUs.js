import React, { useState } from 'react';
import InnerHeader from './InnerHeader';
import axios from 'axios';
import { isValidEmail } from '../utils/isValidEmail';

const ContactUs = () => {

  const [value , setValues] = useState({
    name : '',
    email : '',
    subject : '',
    message : '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const handleSubmit = (event) =>{

    event.preventDefault();

    if(validateForm()){
      axios.post('http://localhost:8081/contact' , value)
    }
  }

  const handleChange = (event) => {
    setErrors((prev)=> ({...prev, [event.target.name] : ""}));
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  
  const validateForm=()=>{
    const newErrors = {...errors};

    if(!value.name.trim()){
      newErrors.name = "Name is required";
    }else{
      newErrors.name = "";
    }

    if(!value.email.trim()){
      newErrors.email = "Email is required"
    }else if (!isValidEmail(value.email)){
      newErrors.email = "Invalid Email format";
    }else {
      newErrors.email = "";
    }

    if(!value.subject.trim()){
      newErrors.subject = "Subject is required"
    }else {
      newErrors.subject = "";
    }

    if(!value.message.trim()){
      newErrors.message = "Message is  required"
    }else {
      newErrors.message = "";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  }
  return (
    <>
      <InnerHeader />
      <div className='mt90 px-3 login'>
        <div>
          <iframe src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3769.6068232705115!2d72.866125!3d19.124897!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c822a93c78b9%3A0x7fc80412deb7c8c0!2s91springboard%20Lotus%2C%20Andheri%20East!5e0!3m2!1sen!2sin!4v1683615140729!5m2!1sen!2sin' width='100%' height='450' style={{ border: '0' }} allowfullscreen='' title='description' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>
        </div>

        <h2 className='py-3'>Send a Message</h2>

        <form name='form' id='form' onSubmit={handleSubmit}>
          <div className='row'>
            <div className='mb-3'>
              <label htmlFor='exampleInputEmail1' className='form-label'>
                Enter Full Name
              </label>
              <input type='text' className='form-control' id='' onChange={handleChange} name="name" />
              <span id=''>{errors.name}</span>
            </div>

            <div className='mb-3 '>
              <label htmlFor='email1' className='form-label'>
                Enter Email
              </label>
              <input type='email' className='form-control' id='' onChange={handleChange}  name="email"/>
              <span id=''>{errors.email}</span>
            </div>

            <div className='mb-3'>
              <label htmlFor='email1' className='form-label'>
                Subject
              </label>
              <input type='text' className='form-control' id='' onChange={handleChange} name="subject" />
              <span id=''>{errors.subject}</span>
            </div>

            <div class=' mb-3'>
              <label for='floatingTextarea2' className='form-label'>
                Your Message
              </label>
              <textarea class='form-control' id='floatingTextarea2' style={{ height: '100px' }} onChange={handleChange} name='message'></textarea>
              <span id=''>{errors.message}</span>
            </div>

            
            <button type='submit' className='btn w-100 submit-btn' name='submit' id='submit'>
              Send a Message
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
