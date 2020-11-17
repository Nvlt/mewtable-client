import React from 'react';
import context from './context';




class landingPage extends React.Component
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
                <section className="intro">
                    <h2>Welcome to Mewtable</h2>
                    <p>
                        Mewtable is an easy to use messenger application, where you can stay connected with your friends on the go.
                    </p>
                    <p>Free to use, and no ads ever.</p>
                    <p>For graders the demo account is demo@demo.com, with a password of 'password'</p>
                </section>
                        <a className='start_btn' href="./login">Get started</a>
                <div className="push"></div>
            </main>
          <footer>V</footer>
            </>
        )
    }
}

export default landingPage;