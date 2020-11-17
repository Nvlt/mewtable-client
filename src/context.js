import React from 'react';
const context = React.createContext({
    channels:[],
    friends:[],
    friendRequests:[],
    messages:[],
    sidebar_expanded:1,
    toggleSidebar:()=>{}
});
export default context;