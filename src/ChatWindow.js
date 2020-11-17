import React from 'react';
import images from './images/images.js';
import context from './context.js';
import Message from './Message.js';
import apiServices from './apiServices';
export default class ChatWindow extends React.Component
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
    
    componentDidMount()
    {
        let chat = document.getElementsByClassName('chat-display')[0];
        if(chat)
        {
            chat.scrollTop = chat.scrollHeight;
        }
    }
    componentDidUpdate()
    {
       
        let chat = document.getElementsByClassName('chat-display')[0];
        if(chat)
        {
            chat.scrollTop = chat.scrollHeight;
        }
       
    }
    
    render()
    {
        if(!this.context.channels || !this.context.user)
        {
            return <></>;
        }
     //console.log(this.props);
        let wideScreen = (window.innerWidth > 500);
        let hide = (!wideScreen && this.context.sidebar_expanded);

        let {route_channel} = this.props;
        let currentChannel = this.context.channels.find(channel => channel.id === route_channel);
        if(!currentChannel)
        {
            currentChannel = {name:'',participants:[],id:''}
        }
        let {name, participants, id} = currentChannel;
     //console.log(currentChannel);
        if(!name)
        {
            name = []; 
                for(const user of participants)
                {
                    if(user)
                    {
                        name.push(user.split('#')[0])
                    }
                }
        
                

            
           
            
            name = name.join(', ')
        }
        const populateMessages = ()=>
        {
            
            let buttons = []; 
            for(const message in this.context.messages)
            {
                if(this.context.messages[message].channel === route_channel)
                {
                    
                    buttons.push(<Message key={message} message={this.context.messages[message]}/>);
                }
            }
            return buttons;
        }
        
        
        return(
            <>
                <div className={hide ? "hidden":"chat-window"} style={{left:(this.context.sidebar_expanded ? "300px":"50px")}}>
                    <div className="chat-header">
                        <h3>{name}</h3>
                    </div>
                    <div className="chat-display">
                        <ul>
                            
                            {populateMessages()}
                            
                            
                        </ul>
                    </div>
                    <form className="chat-form" onSubmit={(e)=>{
                        e.preventDefault();
                        const input = document.getElementById('chat-input');
                        const message = input.value;
                        input.value='';
                        
                        apiServices.connection.send(JSON.stringify({type:'message',authToken:localStorage.getItem('token'), channel_id:id, message}));
                    }}>
                        <input aria-label="message input" type="text" id="chat-input" className="chat-text" placeholder="Enter a message:"></input>
                        <button aria-label="send button" className="send-btn"><img alt={"send button"}  src={images.send}/></button>
                    </form>
                </div>
            </>
        )
    }
}

