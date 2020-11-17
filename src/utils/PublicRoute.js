import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export default function PrivateRoute({ component, ...props})
{
    const Component = component;
    const token = window.localStorage.getItem('token');
    return(
        <Route {...props} render={componentProps => (
            !token ? <Component {...componentProps}/>
            : <Redirect to={{pathname:'/chat', state:{from:componentProps.location}}}/>
        )}/>
    )
}