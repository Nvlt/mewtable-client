import React from 'react';
import context from './context';


export default class ErrorDisplay extends React.Component
{
    static contextType = context;
    render()
    {
        return((this.context.error)?<span className='error_message'>
            <h3 style={{color:"white", fontWeight:"bolder"}}>{this.context.error}</h3>
        </span>:<></>);
    }
}

