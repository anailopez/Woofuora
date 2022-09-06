import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import Footer from "../Footer";
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [icon, setIcon] = useState('');
    const [bio, setBio] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password, icon, bio }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className="signup-form-box">
            <div className='signup-here'>
                <p>Already have a Woofuora account?</p>
                <Link to='/login'>
                    <button>Log in here!</button>
                </Link>
            </div>
            <div className="signup-form">
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div className='title'>
                        <label>Sign Up</label>
                    </div>
                    <label>
                        Email:
                        <br />
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Username:
                        <br />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Confirm Password:
                        <br />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>Set Your icon! (optional)</label>
                    <input
                        type="text"
                        onChange={(e) => setIcon(e.target.value)}
                        value={icon}
                        placeholder="Icon URL"
                    />
                    <label>Bio (optional)</label>
                    <textarea
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                        name='bio'
                        placeholder='Bio'
                        rows='5'
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default SignupFormPage;
