import React ,{useState}from 'react'
import { deleteUser } from '../api-client/apiClient'
import UserForm from './UserForm';

export default function UserCell({ user, onChange }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        onChange(user.id);
    };
    const onDelete = async () => {
        await deleteUser(user.id)
        onChange(user.id);
    }
    return (
        <><div className='row-5'>
            <div>{user.id}</div>
            <div>{user.email}</div>
            <div>{user.name}</div>
            <div>{user.type}</div>
            <div className='btn-group-r'>
                <button className="btn" onClick={openDialog}>Edit</button>
                <button className="btn" onClick={onDelete}>Delete</button>
            </div>
        </div>
            <div className={`dialog-overlay ${isDialogOpen ? 'display-flex' : ''}`} id="dialogOverlay">
                { isDialogOpen && <UserForm isOpen={isDialogOpen} user={user} onClose={closeDialog} />}
            </div>
        </>

    )
}
