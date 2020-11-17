import React from 'react';
import images from './images/images.js';
import context from './context';
import apiServices from './apiServices';
import {Link} from 'react-router-dom';

const forSelected = (route_channel,id)=>{
 //console.log(route_channel,id)
    if(route_channel === id)
    {
        return `session selected `;
    }
    else
    {
        return `session`;
    }
}
const shortenString = (str, length = 8)=>
{   
    if(str.length > length)
    {
        return str.substring(0,length) + "...";
    }
    else
    {
        return str;
    }
}
export default class ChannelButton extends React.Component
{
    static contextType = context
    render()
    {
        if(this.context === {} || !this.props.channel)
        {
            return <></>;
        }
        let {name, participants = [], id} = this.props.channel;
        let {route_channel} = this.props;
        
        if(!name)
        {
            name = participants.map((user)=>{
                if(user !== this.context.user)
                {
                    return user.split('#')[0];
                }
                else
                {
                    return null;
                }

            });
            if(name.length > 2)
            {
                name = name.join(', ');
            }
            else
            {
                name = name.join(' ');
            }
        }
        return(
            <li>
                
                <div className={forSelected(route_channel,id)}>
                <Link className='session-btn' to={`/chat/${id}`}>
                    <button className="session-btn" alt={name} >
                        <img alt={""}  src={images.cube}/> 
                        <p><b>{shortenString(name)}</b></p>
                    </button>
                    </Link>
                    <button className="close-btn" onClick={async (e)=>{
                        e.preventDefault();
                        await apiServices.leaveChannel(id);
                        this.context.getUserData();
                    }}>
                        <img alt={"Close Channel"}  src={images.close}/>
                    </button>
                </div>
                
            </li>
            )
    }
}
