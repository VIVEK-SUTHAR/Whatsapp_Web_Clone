import { Avatar, IconButton, Popover } from '@material-ui/core';
import { ChatOutlined, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import db, { auth } from './firebase';
import SettingsPanel from './Settings';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import { useStateValue } from './StateProvider';
function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const [isSettings, setIsSettings] = useState(false)
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
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const logout = () => {
        auth.signOut();
    }
    const showSettings = () => {
        // alert("hi")
        setIsSettings(true)
    }
    return (
        <div className='sidebar'>
            {
                isSettings ? (
                    <SettingsPanel setIsSettings={setIsSettings} />
                ) : (
                    <>
                        <div className="sidebar__header">
                            <Avatar src={user?.photoURL} />
                            <div className="sidebar__headerRight">
                                <IconButton>
                                    <DonutLarge />
                                </IconButton>
                                <IconButton><ChatOutlined /></IconButton>
                                <IconButton><MoreVert onClick={handleClick} />
                                    <Popover
                                        className='sidebar_headerPopoverBox'
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <div className='popover_item_sidebar'>New Group</div>
                                        <div className='popover_item_sidebar'>Starred Messages</div>
                                        <div className='popover_item_sidebar' onClick={showSettings} >Settings</div>
                                        <div className='popover_item_sidebar' onClick={logout}>Log out</div>
                                    </Popover>
                                </IconButton>
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
                    </>
                )
            }

        </div>
    )

}

export default Sidebar