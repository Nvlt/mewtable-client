import React from 'react';
import api from './apiServices';
import context from './context';
import ErrorDisplay from './ErrorDisplay';




class LoginPage extends React.Component
{
    static contextType = context;
    render()
    {
        return (
            <>
            
            <main>
            <header>
            <h1>Mewtable:<i style={{fontSize:"18px"}}> a catastrophe of chat.</i> </h1>
          </header>
              
                <div className="login-container">
                    <h2>Login or Sign up to continue:</h2>
                    <form className="login-form" name="login" action="#" onSubmit={async(e)=>{
                        e.preventDefault();
                        const email = document.getElementById('email').value;
                        const password = document.getElementById('password').value;
    
                        const loginResponse = await api.login(email, password);
                    //console.log(loginResponse);
                        if(loginResponse.status === "Approved")
                        {
                        //console.log("Test")
                            this.context.initState(loginResponse.initState);
                            window.localStorage.setItem('token',loginResponse.auth_header)    
                            window.location.replace("/chat");
                        

                        }
    
                    }}>
                        
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder='email'></input>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder='password'></input>
                        <button type="submit">Login</button>
                        <a href="./signup">Sign up.</a>
                    </form>
                </div>
                <ErrorDisplay/>
                <div className="push"></div>
            </main>
          <footer>V</footer>
            </>
        )
    }
}

export default LoginPage;