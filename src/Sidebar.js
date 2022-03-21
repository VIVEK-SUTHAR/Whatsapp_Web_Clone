import { Avatar, IconButton } from '@material-ui/core'
import { ChatOutlined, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useStateValue } from './StateProvider';
import './Sidebar.css'
import db from './firebase'
import SidebarChat from './SidebarChat'
function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();
    useEffect(() => {

        const unsubscribe = db.collection("rooms").onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        ))
        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton><ChatOutlined /></IconButton>
                    <IconButton><MoreVert /></IconButton>

                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input placeholder='Search Or start New chat'></input>
                </div>
            </div>
            <div className="sidebar__chats">

                <SidebarChat addNewChat />
                {
                    rooms.map(room => (
                        <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                    ))
                }

            </div>
        </div>
    )
}

export default Sidebar