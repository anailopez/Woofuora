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
                    <img src={`${logo}`} />
                </div>
                <div className='login-signup'>
                    <div className='signup-here'>
                        <p>Don't have a Woofoura account?</p>
                        <Link to='/signup'>
                            <button>Sign up here!</button>
                        </Link>
                        <div className='demo-user'>
                            <p>Or</p>
                            <button onClick={demoLogin}>Demo user login</button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <div className='login-inputs'>
                            <div className='title'>
                                <label>Login</label>
                            </div>
                            <label>
                                Username or Email
                                <input
                                    type="text"
                                    value={credential}
                                    onChange={(e) => setCredential(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Password
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <button type="submit">Log In</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LoginFormPage;
