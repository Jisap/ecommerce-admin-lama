import React from 'react';
import "./topbar.css"

import { NotificationsNone, Language, Settings } from '@material-ui/icons'; // Mejor manera de importar Material-icons

const Topbar = () => {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">lamaadmin</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings/>
                    </div>
                    <img src="https://res.cloudinary.com/downe22q2/image/upload/v1616081624/svx9rcbuy1x0kjudcxus.jpg" className="topAvatar" alt="avatar"/>
                </div>
            </div>
        </div>
    )
}

export default Topbar
