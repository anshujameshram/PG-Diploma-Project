import React, { useState, useEffect } from 'react'
import { createNewUser, updateUser } from '../api-client/apiClient';



export default function UserForm({ user, onClose }) {
    // const [formData, setFormData] = useState({});

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [cmPassword, setCmPassword] = useState("")
    const [userType, setUserType] = useState("")
    const [errors, setErrors] = useState({});
    const [formType, setFormType] = useState("form");
   
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPassword("");
            setUserType(user.type);
            setFormType("edit")
        }

    }, [user])


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
    const validateUserType = () => {
        return userType === 'select';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (formType === 'form') {
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
            if (validateUserType()) {
                newErrors.userType = 'Please select user type';
            }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return
            }
            else {
                createNewUser(name, email, btoa(`${password}-0123456789`), userType).then(() => {
                closeDialog();
                })
            }
        }
        else if (formType === "edit") {
            updateUser({
                "id": user.id,
                "name": name,
                "email": email,
                "password": btoa(`${password}-0123456789`),
                "type": userType,
                "token": null,
                "stamp": null
            }).then(()=>{
                closeDialog();
            })
        }
    }
    // 
    const closeDialog = () => {
        setName("");
        setEmail("");
        setPassword("");
        setCmPassword("");
        setUserType("");
        setErrors({});
        onClose();
        setUserType('form')
        user = undefined
    }

    return (
        <>

            <div className="dialog-box" >
                <h2>User Registration</h2>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Enter your name" />
                {errors.name && <span className="error">{errors.name}</span>}

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter your email" />
                {errors.email && <span className="error">{errors.email}</span>}

                <label htmlFor="password">Password:</label>
                <input type="text" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter a password" />
                {errors.password && <span className="error">{errors.password}</span>}
                {formType ==='form'?<>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="text" id="confirmPassword" value={cmPassword} onChange={(e) => { setCmPassword(e.target.value) }} placeholder="Confirm password" />
                {errors.cmPassword && <span className="error">{errors.cmPassword}</span>}</>:<></>}

                <label htmlFor="category">Type :</label>
                <select id="category" name="category" value={userType} onChange={(e) => { setUserType(e.target.value) }} placeholder='Select User'>
                    <option value="select">--Select User Type--</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                {errors.userType && <span className="error">{errors.userType}</span>}
                <div className="btn-group">
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={closeDialog}>Close</button>
                </div>
            </div>

        </>
    )
}
