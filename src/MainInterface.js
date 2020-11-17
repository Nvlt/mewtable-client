import React from 'react';
import ChannelBar from './ChannelBar.js';
import ChatWindow from './ChatWindow.js';
import TopNav from './TopNav.js';
import SideNav from './SideNav.js';
import apiServices from './apiServices';
import context from './context';
import PublicChannels from './PublicChannels.js';

export default class MainInterface extends React.Component
{
    static defaultProps = {
        match: {
          params: {},
        },
      };
    static contextType = context;
    async componentDidMount()
    {
        if(!this.context.initState)
        {
            return null;
        }
        window.addEventListener('resize',()=>{
            this.context.initState({})
        })
        
        
        apiServices.initSocket(this.context);
        const userdata = await apiServices.getUserData();
    //console.log(userdata);
        this.context.initState(userdata);
        
        setInterval(() => {
        //console.log("Performing heartbeat");
            apiServices.connection.send(JSON.stringify({type:'heartbeat',authToken:localStorage.getItem('token')}))
        }, 10000);



        apiServices.connection.onmessage = (msg)=> {
            
            if(msg.data !== "Authorized" && msg.data !== 'Checking credentials.')
            {
                
                this.context.messages.push(JSON.parse(msg.data));
                this.context.initState({});
            }            
        }
    }
    render()
    {
        let {id} = this.props.match.params;
        let {path} = this.props.match;
        if(!id)
        {
            if(this.context.channels[0])
            {
                id = this.context.channels[0].id;
            }
            

        }
        
        return(
        <>    
            <TopNav/>
            <div className="interface-container">
                <SideNav/>
                
                <ChannelBar route_channel={id}/>

                {path === '/chat/' || path === '/chat/:id' ? <ChatWindow route_channel={id}/> : path === "/channels/" ? <PublicChannels/> : 0}
                
            </div>
        </>
        );
    }
}
