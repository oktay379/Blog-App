import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./style.css";

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', {email, password})
        .then(res => {
            if(res.data === "Success") {
                window.location.href = "/"
            }
        })
        .catch(err => console.log(err))
    }

    return (
    <div className="signup_container">
        <div className="signup_form">
            <h2>Login Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" placeholder="Email" 
                    onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" placeholder="Password"
                    onChange={e => setPassword(e.target.value)}/>
                </div>
                <button className="signup_btn" >Login</button>
            </form>
            <br /><br />
            <p>Not Registered</p>
            <Link to="/register"><button>Signup</button></Link>
        </div>
    </div>
    )
}

export default Login