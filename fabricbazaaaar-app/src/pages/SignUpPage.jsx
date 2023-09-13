import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import '../css/loginStyle.css'
import Loader from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import AlertDialog from '../components/AlertDialog';
import OtpDialog from '../components/OtpDialog';
import { createNewUser } from '../api-client/apiClient';


export default function SignUpPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [cmPassword, setCmPassword] = useState("")
    const [errors, setErrors] = useState({});
    const [alertmeg, setAlertmeg] = useState({});
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigator = new useNavigate();

    useEffect(() => {
        if (!alert) {
            if (alertmeg.type === 'ok') {
                navigator("/login")
            }
        }
    }, [alert])


    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validateName = () => {
        return name.length !== '';
    };

    const validatePassword = () => {
        return password.length >= 6;
    };
    const validateCmPassword = () => {
        return password === cmPassword;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        e.preventDefault();
        const newErrors = {};

        if (!validateName()) {
            newErrors.name = 'Enter Name';
        }
        if (!validateEmail()) {
            newErrors.email = 'Invalid email address';
        }

        if (!validatePassword()) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!validateCmPassword()) {
            newErrors.cmPassword = 'Password Not Match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return
        }
        else {
            setErrors({})
            setLoading(true)
            createNewUser(name, email, btoa(`${password}-0123456789`), "user").then((resp) => {
                if (resp) {
                    console.log(resp);
                    setLoading(false);
                    setAlertmeg({ title: "Sussessful", desc: "successful Registration", type: "ok" })
                    setAlert(true);


                }
                else {
                    setLoading(false);
                    setAlertmeg({ title: "Invalid", desc: "Invalid Registration", type: "error" })
                    setAlert(true);
                }
            })
        }
    };
    return (
        <>
            <NavBar />
            {loading ? <Loader /> : <div className="container-l">
                <div className="info-text">
                    <p>Login to compare prices over platforms and get best price</p>
                </div>
                <div className="divider-y"></div>
                <div className="login-box">
                    <form onSubmit={handleSubmit}>
                        <div className="inputbox" >
                            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} required />
                            <label>Name</label>
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>

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
                        <div className="inputbox">
                            <input type="password" value={cmPassword} onChange={(e) => { setCmPassword(e.target.value) }} required />
                            <label>Confirm Password</label>
                            {errors.cmPassword && <span className="error">{errors.cmPassword}</span>}
                        </div>
                        <input type="submit" value="Register" />
                        {
                            alert && <AlertDialog title={alertmeg.title} desc={alertmeg.desc} type={alertmeg.type} onClose={setAlert} />
                        }
                    </form>
                </div>
            </div>}
        </>
    )
}
