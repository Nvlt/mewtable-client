import React from 'react';
import apiServices from './apiServices';
import context from './context';
import ErrorDisplay from './ErrorDisplay';


export default class SignUp extends React.Component
{
    static contextType = context;
    render()
    {
    return(
            <>
                
            <main>
            <header>
            <h1>Mewtable:<i style={{fontSize:"18px"}}> a catastrophe of chat.</i> </h1>
        </header>
                <div className="signup-container">
                    <h2 htmlFor="signup">Login or Sign up to continue:</h2>
                    <form className="signup-form" name="signup" action="./" onSubmit={async(e)=>{
                        e.preventDefault();
                        const email = e.target.email.value;
                        const password = e.target.password.value;
                        const username = e.target.username.value;
                        if(email && password && username)
                        {
                            const data = await apiServices.register(email,password,username);
                            if(Object.keys(data).includes('error'))
                            {
                                this.context.setError(data.error,5000);
                            }
                            else
                            {                      
                                window.localStorage.setItem('token',data.auth_header)    
                                window.location.replace("/chat");
                            }
                        }
                        else
                        {
                            this.context.setError('You must choose an email, display name, and password..',5000)
                        }
                        
                        
                    }}>
                        
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username"/>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password"/>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email"/>
                        <button type="submit">Submit</button>
                    </form>
                    <ErrorDisplay/>
                </div>
                
                <div className="push"></div>
            </main>
        <footer>V</footer>
            </>);
    }
}

