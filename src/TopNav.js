import React from 'react';
import images from './images/images';
import context from './context';
import {Link} from 'react-router-dom';

export default class TopNav extends React.Component
{
    static contextType = context;


    render()
    {
        if(!this.context.user)
        {
            return <></>;
        }
        const user = this.context.user.split('#');
        return(
            <>
            <header>
                <h1>Mewtable</h1>
                <Link className="channels-link" onClick={()=>{
                    this.context.initState({sidebar_expanded:0})
                }} to={`/channels/`}>           
                <button className="pc_btn">
                    public channels
                </button>
                </Link>
                
                <button className="user-profile">
                    <img alt={"profile display for user"}  className="mini-dp" src={images.Default}/><p>{user[0]}<i className="token">#{user[1]}</i></p>
                </button>
            </header>
            </>
        );
    }
}

