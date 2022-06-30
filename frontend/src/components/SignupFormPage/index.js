import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
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
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        const errors = [];

        if (icon.length > 0 && !icon.match(/\.(jpg|jpeg|png|gif)$/)) {
            errors.push('Please enter a valid image URL!');
        }

        setValidationErrors(errors);
    }, [icon]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();

        if(validationErrors.length > 0) {
            return alert("Oops! Looks like there was an error with your submission!")
        }

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
                <p>Already have a Woofoura account?</p>
                <Link to='/login'>
                    <button>Log in here!</button>
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                <ul>
                    {validationErrors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className='title'>
                    <label>Sign Up</label>
                </div>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <label>
                    Confirm Password
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
                    rows='2'
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormPage;
