import config from './config.js';


const apiServices = {
    connection:null,
    login:async(email, password)=>
    {
        const LoginResponse = await fetch(`${config.api_endpoint}/login`,{
            method:"POST",
            headers:{"content-type": "application/json"},
            body:JSON.stringify({email:email, password:password})
        });
        const respJson = await LoginResponse.json();
        return respJson;
    },
    register:async(email, password, display_name)=>
    {
        const LoginResponse = await fetch(`${config.api_endpoint}/register`,{
            method:"POST",
            headers:{"content-type": "application/json"},
            body:JSON.stringify({email:email, password:password,display_name:display_name})
        });
        const respJson = await LoginResponse.json();
        return respJson;
    },
    initSocket:async(context)=>
    {
    //console.log("initSocket");
        const token = localStorage.getItem('token');
        apiServices.connection = await new WebSocket(config.wss_endpoint);
    //console.log(apiServices.connection);


        apiServices.connection.onopen = function open() 
        {
        //console.log("On open");
            apiServices.connection.send(JSON.stringify({authToken:token, channel_id:"-55"}));
        };
 
        apiServices.connection.onmessage = function Authorization(msg) {
        //console.log('other message');
            if(msg.data === 'Authorized')
            {
                apiServices.connection.onmessage = function messageHandler(msg) {
                    
                //console.log('message');
                    context.messages.push(JSON.parse(msg.data));
                //console.log(context.messages);
                    context.initState({});
                    
                    
                }
            }
        };

        apiServices.connection.onclose = function closing(data){
        //console.log("closing", data);
            localStorage.removeItem('token');
            window.location.replace('/login');

        }
    
    },
    leaveChannel:async(id)=>
    {
        const token = localStorage.getItem('token');


        if(token)
        {
            const userdata = await fetch(`${config.api_endpoint}/channels`,{
                method:"PATCH",
                headers:{
                    "content-type": "application/json",
                    "authorization":token
            },
            body:JSON.stringify({action:"remove",id:id})
                
            });
        //console.log(userdata);
            return userdata
        }
    },
    joinChannel:async(id)=>
    {
        const token = localStorage.getItem('token');


        if(token)
        {
            const userdata = await fetch(`${config.api_endpoint}/channels`,{
                method:"PATCH",
                headers:{
                    "content-type": "application/json",
                    "authorization":token
            },
            body:JSON.stringify({action:"add",id:id})
                
            });
        //console.log(userdata);
            return userdata
        }
    },
    createChannel:async(name)=>
    {
        const token = localStorage.getItem('token');


        if(token)
        {
            const userdata = await fetch(`${config.api_endpoint}/channels`,{
                method:"POST",
                headers:{
                    "content-type": "application/json",
                    "authorization":token
            },
            body:JSON.stringify({name:name,participants:[]})
                
            });
        //console.log(userdata);
            return userdata
        }
    },
    getUserData:async()=>
    {
        const token = localStorage.getItem('token');


        if(token)
        {
            const userdata = await fetch(`${config.api_endpoint}/user`,{
                method:"GET",
                headers:{
                    "content-type": "application/json",
                    "authorization":token
            },
                
            });
            return await userdata.json();
        }
    }


}
export default apiServices;