import React from 'react';
import context from './context';
import images from './images/images.js';
export default class Message extends React.Component
{
    static contextType = context;

    render()
    {
        if(!this.props.message)
        {
            return <></>;
        }
        let {id, message, date, sender} = this.props.message;
        const d = new Date(Number(date));
        return(
            <li id={id} className={this.context.user === sender ? 'message user-message' : 'message'}>
                <img alt={`${id}_message`}  src={images.Default} className="med-dp"/>
                <p><b> {sender.split('#')[0]}: </b>{message}<br/><i className="date">{d.toUTCString()}</i></p>
            </li>)
    }
}