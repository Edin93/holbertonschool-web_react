import React from 'react'
import WithLogging from '../HOC/WithLogging'
import './Login.css'

export function Login() {
    return (
        <div className='App-body'>
            <p>Login to access the full dashboard</p>
            <label htmlFor='email' className='email'>
                Email:
                <input id='email' type='email' />
            </label>
            <label htmlFor='password' className='password'>
                Password:
                <input id="password" type='password' />
            </label>
            <button className='label-button'>OK</button>
        </div>
    );
}

export default WithLogging(Login);
