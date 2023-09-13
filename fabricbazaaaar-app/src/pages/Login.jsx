import React, { useState } from 'react'
import '../css/loginStyle.css'
import NavBar from '../components/NavBar'
import { verifyUser } from '../api-client/apiClient';
import AlertDialog from '../components/AlertDialog';
import OtpDialog from '../components/OtpDialog';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(false);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [response, setResp] = useState(false);
  const [loading, setLoading] = useState(false);

  

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    e.preventDefault();
    const newErrors = {};

    if (!validateEmail()) {
      newErrors.email = 'Invalid email address';
    }

    if (!validatePassword()) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return
    }
    else {
      setErrors({})
      setLoading(true)
      verifyUser(email, btoa(`${password}-0123456789`)).then((resp) => {
        if (resp) {
          console.log(resp);
          setResp(resp)
          setLoading(false);
          setShowOtpBox(true)
        }
        else{
          setLoading(false);
          setAlert(true);
        }
      })
    }
  };
  return (
    <>
      <NavBar />
      {loading ? <Loader /> :<div className="container-l">
        <div className="info-text">
          <p>Login to compare prices over platforms and get best price</p>
        </div>
        <div className="divider-y"></div>
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <div className="inputbox" >
              <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
              <label>Email</label>
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="inputbox">
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
              <label>Password</label>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <input type="submit" value="Submit" />
            <p>You don't Have Accout <Link to="/sign-up">Sign Up</Link></p>
            {
              alert&&<AlertDialog title={'Invalid'} desc={'Invalid User Email Id or Password'} type={'error'} onClose = {setAlert}/>
            }
          </form>
        </div>{showOtpBox&&<OtpDialog resp={response}/>}
      </div>}</>
  )
}
