import { Avatar } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import "./ContactInfo.css";
import { useStateValue } from './StateProvider';
function ContactInfo({ setIsContatctInfo, seed, roomName }) {
    const [{ user }, dispatch] = useStateValue();
    return (
        <div className="contact" >
            <div className="conatact_header">
                <Close className='contact_close' onClick={() => setIsContatctInfo(false)} />
                <h3>Contact Info</h3>
            </div>
            <div className="contact_info">
                <Avatar className='conatct_avatar' src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="contact_userDetail">
                    <p>{roomName}</p>
                    <p>{user?.email}</p>
                </div>
            </div>
            <div className="contact_aboutUser">
                Hey,I am using WhatsApp
            </div>

        </div>
    )
}

export default ContactInfo