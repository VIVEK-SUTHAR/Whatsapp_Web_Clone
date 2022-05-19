import { Close } from '@material-ui/icons'
import React from 'react'
import "./ContactInfo.css"
function ContactInfo({ setIsContatctInfo }) {
    return (
        <div className="contact" >

            <div className="conatact_header">
                <Close  className='contact_avatar' onClick={() => setIsContatctInfo(false)} />
                <h3>Contact Info</h3>
            </div>
        </div>
    )
}

export default ContactInfo