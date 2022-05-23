import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from './firebase';
import './SidebarChat.css';
import { useStateValue } from './StateProvider';

function SidebarChat({ id, addNewChat, name }) {
    const [seed, setSeed] = useState('');
    const [message, setMessage] = useState('');
    const [{ user }, dispatch] = useStateValue();
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
        dispatch(seed)
    }, []);
    const createChat = () => {
        const roomName = prompt("Enter Room name For Chat");
        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            })
        }
    }
    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
                setMessage(snapshot.docs.map((doc) =>
                    doc.data()))
            ))
        }
    }, [id])
    return (
        <>

            {!addNewChat ? (
            <Link to={`rooms/${id}`}>
                <div className="sidebarChat">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                    <div className="sidebarChat_info">
                        <h2>{name}</h2>
                        <p>{message[0]?.message}</p>
                    </div>
                </div>
            </Link>
            ) : (
            <div onClick={createChat} className="sidebarChat">
                <h2>Add new chat</h2>
            </div>

            )}
            
        </>
    )
}

export default SidebarChat