import React, { useState,useEffect } from 'react'
import UserForm from './UserForm'
import UserCell from './UserCell';
import { getAllUsers } from '../api-client/apiClient';
import Loader from './Loader';

export default function UserDashboard() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [onChangeData, setOnChangeData] = useState(null);
    const [userList, setUserList] = useState(null);

    
    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        fetchData();
    }, [isDialogOpen,onChangeData]);

    const fetchData = async () => {
        try {
            const user = await getAllUsers();
            setUserList(user);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    return (
        <>
            {loading ? <Loader /> : <>
                <div className="top-btn">
                    <button className="add-btn" id="add-user" onClick={openDialog}>
                        New User<img src="/img/plus-line-icon.svg" alt="" />
                    </button>
                </div>
                <div className="item-list">
                    <div className='table-heading row-5'>
                        <div>Sr. No.</div>
                        <div>Email</div>
                        <div>Name</div>
                        <div>Type</div>
                        <div>Actions</div>
                    </div>
                    <div className='table-body'>

                        {
                            userList.map((user) => (<UserCell key={user.id} user={user} onChange={setOnChangeData} />))
                        }
                    </div>

                </div>
                <div className={`dialog-overlay ${isDialogOpen ? 'display-flex' : ''}`} id="dialogOverlay">
                    <UserForm isOpen={isDialogOpen} onClose={closeDialog} />
                </div>
            </>}
        </>
    )
}
