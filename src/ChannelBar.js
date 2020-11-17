import React from 'react';
import context from './context.js';
import ChannelButton from './ChannelButton.js';


class ChannelBar extends React.Component
{
    static contextType = context;
    render()
    {
        const populateChannelBar = ()=>
        {
            const {route_channel} = this.props;
            const buttons = this.context.channels.map((channel, index) => {
                return <ChannelButton key={index} channel={channel} route_channel={route_channel}/>
                
            });
            return buttons;
        }
        
        
        
        return(
            <>
                <div className={this.context.sidebar_expanded ? "chat-sessions":"hidden"}>
                    <h2>Your channels</h2>
                    <ul id="channel-bar-content">{populateChannelBar()}</ul>
                </div>
            </>
        );

    }
    
}

export default ChannelBar;