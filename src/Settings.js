import { Avatar } from '@material-ui/core';
import { ArrowBack, Brightness4, Help, Keyboard, Lock, Notifications, Security, Wallpaper } from '@material-ui/icons';
import React from 'react';
import "./Settings.css";
import { useStateValue } from './StateProvider';

const SettingsPanel = ({ setIsSettings }) => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="settings">
      <div className='settings_header'>
        <ArrowBack className='arrowback' onClick={() => setIsSettings(false)} />
        Settings
      </div>
      <div className='settings_UserProfile '>
        <Avatar src={user?.photoURL} className="settings_UserAvatar" />
        <span>{user?.displayName}
          <p>{user?.email}</p>
        </span>
      </div>
      <div className="settings_options">
        <div className="settings_option">
          <Notifications /><span>Notifications</span>
        </div>
        <div className="settings_option">
          <Lock /><span>Privacy</span>
        </div>
        <div className="settings_option">
          <Security /><span>Security</span>
        </div>
        <div className="settings_option">
          <Brightness4 /><span>Theme</span>
        </div>
        <div className="settings_option">
          <Wallpaper /><span>Chat Wallpaper</span>
        </div>
        <div className="settings_option">
          <Keyboard /><span>Keyboard Shortcuts</span>
        </div>
        <div className="settings_option">
          <Help /><span>Help</span>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel