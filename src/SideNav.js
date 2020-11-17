import React from 'react';
import images from './images/images.js';

import context from './context';



export default class SideNav extends React.Component
{
    static contextType = context;

    render()
    {
        return(
            <div className="side-bar">
                    <button id="expand-toggle-btn"><img alt={"toggle channel bar"}  src={!this.context.sidebar_expanded ? images.expand : images.collapse} onClick={this.context.toggleSidebar}/></button>
                    <button id="logout-btn"><img alt={"log out"}  src={images.logout} onClick={(e)=>{
                        e.preventDefault();
                        localStorage.removeItem('token');
                        window.location.replace('/login');

                    }}/></button>
                </div>
        )
    }
    
}

