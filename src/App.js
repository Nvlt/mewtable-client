import React from 'react';
import {BrowserRouter as Router,Redirect, Switch, Route} from "react-router-dom";
import './App.css';
import LoginPage from './LoginPage.js';
import MainInterface from './MainInterface.js';
import SignUp from './SignUp.js';
import context from './context.js';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import apiServices from './apiServices';
import LandingPage from './LandingPage.js';



class App extends React.Component{
  state = {
        user:'Violet#15638',
        channels:[
          {
              id:'08d8d90', 
              name:"", 
              participants:['Violet#15638','HAXOR#98775']
              
          },
          {
              id:'dsgsdg456', 
              name:"", 
              participants:['Violet#15638','Cat#16846']
              
          },
          {
              id:'1564gsdg', 
              name:"Meow Club", 
              participants:['Violet#15638','Cat#16846','HAXOR#98775']
              
          }

      ],
      friends:['Bob#15846','Cat#16846','HAXOR#98775'],
      friendRequests:['Kiwa#87753'],
      messages:[
        {
            id:'46321',
            message:'Heya!',
            channel:'08d8d90',
            date:'Tue Sep 01 2020 17:59:58 GMT-0700',
            sender:'Violet#15638'
            
        },
        {
            id:'23535',
            message:`Ah, it's you, I know you. You're the Dragonborn.`,
            channel:'08d8d90',
            date:'Tue Sep 01 2020 17:59:58 GMT-0700',
            sender:'HAXOR#98775'
            
        },
        {
            id:'y67454',
            message:`Wot? :o`,
            channel:'08d8d90',
            date:'Tue Sep 01 2020 17:59:58 GMT-0700',
            sender:'Violet#15638'
            
        },
        {
          id:'fasfs',
          message:'Mew!',
          channel:'dsgsdg456',
          date:'Tue Sep 01 2020 17:59:58 GMT-0700',
          sender:'Violet#15638'
          
      },
      {
          id:'534grdg',
          message:`Meoooowww meow meow..`,
          channel:'dsgsdg456',
          date:'Tue Sep 01 2020 17:59:58 GMT-0700',
          sender:'Cat#16846'
          
      },
      {
          id:'75643gg',
          message:`Mew mew..`,
          channel:'dsgsdg456',
          date:'Tue Sep 01 2020 17:59:58 GMT-0700',
          sender:'Violet#15638'
          
      },
      {
        id:'5323fdgx',
        message:`Welcome to meow club!`,
        channel:'1564gsdg',
        date:'Tue Sep 01 2020 17:59:58 GMT-0700',
        sender:'CrazyCat#456845s56'
        
    },
    {
      id:'534grdg',
      message:`Meroooooo!`,
      channel:'dsgsdg456',
      date:'Tue Sep 01 2020 17:59:58 GMT-0700',
      sender:'Cat#16846'
      
  },
    ],
      sidebar_expanded:1,
      error:null
  };
  toggleSidebar = ()=>
  {
    const {sidebar_expanded} = this.state;
    this.setState({sidebar_expanded:!sidebar_expanded});
//console.log(this.state.sidebar_expanded);
  }
  initState= (body)=>
  {
    this.setState(body);
  }
  getUserData = async()=>
  {
    let data = await apiServices.getUserData();
    this.setState({...data})
  }
  setError=(error,timeout = null)=>
  {
    this.setState({error:error});
    if(timeout)
    {
      setTimeout(() => {
        this.clearErrors();
      }, timeout);
    }

  }
  clearErrors=()=>
  {
    this.setState({error:null});
  }
  render(){
    
    const contextData = {
      user:this.state.user,
      channels:this.state.channels,
      friends:this.state.friends,
      friendRequests:this.state.friendRequests,
      messages:this.state.messages,
      sidebar_expanded:this.state.sidebar_expanded,
      public_channels:this.state.public_channels,
      toggleSidebar:this.toggleSidebar,
      getUserData:this.getUserData,
      error:this.state.error,
      setError:this.setError,
      clearErrors:this.clearErrors,
      initState:this.initState
    }
    
    const loggedin = localStorage.getItem('token') != null ? true : false;
    return (
      <div className="App">
        <context.Provider value={contextData}>
        <Router>
          <Switch>
            <Route exact path="/">
              {loggedin ? <Redirect to="/chat" /> : <Redirect to="/landing" />}
            </Route>
            <PublicRoute path="/login" component={LoginPage}/>
            <PublicRoute path="/landing" component={LandingPage}/>
            <PublicRoute path="/signup" component={SignUp}/>
            <PrivateRoute path="/chat/:id" component={MainInterface}/>
            <PrivateRoute path="/chat/" component={MainInterface}/>
            <PrivateRoute path="/channels/" component={MainInterface}/>
            
          </Switch>
        </Router>
        </context.Provider>
        
        
      </div>
    );
  }
}

export default App;
