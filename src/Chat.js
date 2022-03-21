import { Avatar, Button, IconButton } from '@material-ui/core'
import { AttachFile, ChatOutlined, DonutLarge, InsertEmoticon, MicOutlined, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Chat.css'
import db from './firebase';
import fs from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useStateValue } from './StateProvider';

function Chat() {
    const [{ user }, dispatch] = useStateValue();
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: fs.firestore.FieldValue.serverTimestamp(),
        })
        setInput('');
    }
    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));
            db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }

    }, [roomId])
    return (
        <div className='chat' >
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last Seen At {
                        new Date(
                            messages[messages.length - 1]?.
                                timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton><AttachFile /></IconButton>
                    <IconButton><MoreVert /></IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map(message => (
                    <div className={`chat_message ${message.name === user.displayName && `chat_receiver`}`}>
                        <span className='chat_name'>{message.name}</span>
                        {message.message}
                        <span className="chat_timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </div>
                ))}

            </div>
            <div className="chat_footer">
                <IconButton><InsertEmoticon /></IconButton> 
                <form>
                    <input type="text" placeholder='Type A Message' onChange={e => setInput(e.target.value)} />
                    <Button type='submit' onClick={sendMessage}>Send A Message</Button>
                </form>
                <MicOutlined />
            </div>
        </div>
    )
}

export default Chat