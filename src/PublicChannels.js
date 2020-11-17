import React from 'react';
import images from './images/images.js';
import context from './context.js';
import apiServices from './apiServices';
export default class publicChannels extends React.Component
{
    static contextType = context;
    static defaultProps = {
        history: {
          goBack: () => {},
        },
        match: {
          params: {},
        },
      };
    
    
    
    render()
    {

       
        let wideScreen = (window.innerWidth > 500);
        let hide = (!wideScreen && this.context.sidebar_expanded);
        const populateFriends = ()=>
        {
            const publicChannels = this.context.public_channels;
            if(publicChannels)
            {
                let result = [];
                for(const channel of publicChannels)
                {

                    result.push(
                        <li className={'public_channel_btn'} key={channel.id}>
                            <button name="join_channel" channel_id={channel.id} onClick={async (e)=>{
                                e.preventDefault();
                                let id = channel.id;
                                await apiServices.joinChannel(id);
                                this.context.getUserData();
                            }}>
                            <img alt={`${channel.name}_channel`}  src={images.cube} className="mini-dp"/>
                            <p>{channel.name || channel.participants.join(' ')}</p>
                            </button>
                        </li>)
                }
                return result;
            }
            

        }
        
        
        
        return(
            <>
                <div className={hide ? "hidden":"channels-window"} style={{left:(this.context.sidebar_expanded ? "300px":"50px")}}>
                    <div className="publicChannels_header">
                        <h3>Public Channels</h3>
                    </div>
                    <form id='addChannel_form' onSubmit={async(e)=>{
                            e.preventDefault();
                            let input = e.target.channelName.value;
                            e.target.channelName.value = ''
                            if(input)
                            {
                                await apiServices.createChannel(input);
                                await this.context.getUserData();
                                
                            }
                            

                        }}><label htmlFor="channelName">Create Channel: </label><input id="channelName" name="channelName" type="text" /><button type="submit">Add</button></form>
                    <div className="pc_display">
                        <ul>
                            {populateFriends()}
                        </ul>
                    </div>
                    
                </div>
                
            </>
        )
    }
}

