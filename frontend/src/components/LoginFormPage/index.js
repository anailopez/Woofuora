import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Footer from '../Footer';
import './LoginForm.css';
import logo from '../../images/Woofoura.png';


function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const demoLogin = async (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({ credential: "Goldie", password: 'password' }))
    }

    return (
        <div className='login-form-page'>
            <div className='login-form-box'>
                <div className='logo'>
                    {/* <img src={`${logo}`} alt="logo" /> */}
                    <h1>Woofuora</h1>
                    <p>A place where dogs can come together and better understand the world</p>
                </div>
                <div className='login-signup'>
                    <div className='signup-here'>
                        {/* <p>By continuing you indicate that you agree to Woofuora's Terms of Service and Privacy Policy</p> */}

                        <div className='demo-user'>
                            <button onClick={demoLogin}><i className="fa-solid fa-paw" />Continue as demo user</button>
                        </div>
                        <Link to='/signup'>
                            <button>Sign up here</button>
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <div className='login-inputs'>
                            <div className='title'>
                                <label>Login</label>
                            </div>
                            <label id='inputs'>
                                Username or Email
                                <input
                                    type="text"
                                    value={credential}
                                    onChange={(e) => setCredential(e.target.value)}
                                    required
                                />
                            </label>
                            <label id='inputs'>
                                Password
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <button id='login-btn' type="submit">Log In</button>
                    </form>
                </div>
            </div>
            <div className='login-footer'>
                <p>Created by Anai Amy Lopez</p>
                <a href={"https://github.com/anailopez"}>
                    <i className="fa-brands fa-github" />
                </a>
                <a href={"https://www.linkedin.com/in/anai-lopez-326289241/"}>
                    <i className="fa-brands fa-linkedin" />
                </a>
            </div>
        </div>
    );
}

export default LoginFormPage;
