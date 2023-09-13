import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../css/adminStyle.css'
import NavBar from '../components/NavBar';
import UserDashboard from '../components/UserDashboard';
import ProductDashboard from '../components/ProductDashboard';
import { isValidUser } from '../api-client/apiClient';
import AlertDialog from '../components/AlertDialog';

export default function AdminDashBoard() {
    const { userData } = useParams();
    const [option, setOption] = useState('user');
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const [i, t] = userData.split('~')
        isValidUser(i, t).then((sd) => {
            if (sd) {
                setUserId(i);
            }
            else {

            }
        }).catch(() => {

        })

    }, [userData])

    return (
        <>
            <NavBar />
            <div className="container-a">
                <div className="siderbar-menu">
                    <div className='tag-line'>Admin Dashboard</div>
                    <div className='sidebar-options'>
                        <ul >
                            <li>
                                <div className={`menu-option ${option === 'user' ? 'active-menu' : ''}`} onClick={() => setOption('user')} id="user">
                                    Users
                                    <img src="/img/line-angle-right-icon.svg" alt='' className="toggle-btn" />
                                </div>
                            </li>
                            <li>
                                <div className={`menu-option ${option === 'products' ? 'active-menu' : ''}`} onClick={() => setOption('products')} id="products">
                                    Products
                                    <img src="/img/line-angle-right-icon.svg" alt='' className="toggle-btn" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="main-container" id="mainContainer">
                    {
                        userId ? option === 'user' ? <UserDashboard /> : <ProductDashboard /> :
                            <AlertDialog title={'Restricted'} desc={'Invalid User Access Prohibited \n Please Login Again'} type={'error'} />
                    }
                </div>

            </div>
        </>
    )
}
