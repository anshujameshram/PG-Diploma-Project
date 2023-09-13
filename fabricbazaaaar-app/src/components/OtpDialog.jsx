import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


export default function OtpDialog({resp}) {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState({});


    const validateOtp = () => {
        return otp === resp.Otp;
    };
    const redirectToDashboard = (userId) => {
        if(resp.Otp === otp ){
            if(resp.Type.toLowerCase()==='admin'){
                navigate(`/admin-dashboard/${userId}`);
            }
            else{
                localStorage.setItem('user','user');
                navigate(`/`);
            }
        }
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!validateOtp()) {
            newErrors.otp = 'Invalid OPT';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return
        }
        redirectToDashboard(`${resp.Id}~${resp.Token}`);
        
    }
    function handleOtp(params) {
        setOtp(params);
    }
    return (
        <div className="otp-dialog-overlay">
            <div className="otp-dialog-box">
                <form onSubmit={handleSubmit}>
                    <h1>Enter OTP</h1>
                    <p>Otp is sent to you register Email Address</p>
                    <input type="number" maxLength="6" value={otp} onChange={(e)=>handleOtp(e.target.value)} className="no-spin-buttons" />
                    {errors.otp && <span className="error">{errors.otp}</span>}
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}
