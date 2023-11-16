import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import md5 from "js-md5";
import InnerHeader from "./InnerHeader";

const Register = () => {
  const [errpass, setErrpass] = useState(false);
  const [erremail, setErremail] = useState(false);
  const [errmobile, setErrmobile] = useState(false);
  const [errname, setErrname] = useState(false);
  const [values, setValues] = useState({
    fullname: "",
    mobile: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const hashedPassword = md5(values.password);

    const data = {
      fullname: values.fullname,
      mobile: values.mobile,
      email: values.email,
      password: hashedPassword,
    };

    if (
      values.email !== "" &&
      values.fullname !== "" &&
      values.mobile !== "" &&
      values.password !== ""
    ) {
      axios
        .post("http://localhost:8081/staybindass", data)
        .then((res) => {
          navigate("/loginpage");
        })
        .catch((err) => console.log(err));
    } else {
      if (values.email === "") {
        setErremail(true);
      }
      if (values.password === "") {
        setErrpass(true);
      }
      if (values.fullname === "") {
        setErrname(true);
      }
      if (values.mobile === "") {
        setErrmobile(true);
      }
    }
  };

  useEffect(()=>{
   setTimeout(() => {
    setErremail(false);
    setErrmobile(false);
    setErrname(false);
    setErrpass(false);
   }, 2000);
  },[erremail,errmobile,errname,errpass])

  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <>
      <InnerHeader />
      <div className="login container mt80 login">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item w-100" role="presentation">
            <button
              className="nav-link active w-100"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Register
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabindex="0"
          >
            <h2 className="head">Stay Bindass With Us!</h2>
            <p>Let's Sign you up</p>

            <form name="form" method="POST" id="form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="mb-3 col-6">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={values.fullname}
                    onChange={handleChange}
                    name="fullname"
                  />
                  {
                    errname && <p style={{color : "red"}}>Please enter the name</p>
                  }
                </div>

                <div className="mb-3 col-6">
                  <label htmlFor="email1" className="form-label">
                    Mobile No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={values.mobile}
                    onChange={handleChange}
                    name="mobile"
                  />
                   {
                    errmobile && <p style={{color : "red"}}>Please enter the mobile</p>
                  }
                </div>

                <div className="mb-3 ">
                  <label htmlFor="email1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                  />
                   {
                    erremail && <p style={{color : "red"}}>Please enter the email</p>
                  }
                </div>

                <div className="mb-3 col-6">
                  <label htmlFor="email1" name="pass" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                  />
                   {
                    errpass && <p style={{color : "red"}}>Please enter the password</p>
                  }
                </div>

                <div className="mb-3 col-6">
                  <label htmlFor="email1" className="form-label">
                    Confirm Password
                  </label>
                  <input type="password" className="form-control" />
                </div>

                <button
                  type="submit"
                  className="btn w-100 submit-btn"
                  name="submit"
                  id="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
