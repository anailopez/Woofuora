import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllQuestions } from '../../store/questions';
import { thunkGetAllAnswers } from '../../store/answers';
import { thunkGetUsers } from '../../store/session';
import Navigation from '../Navigation';
import './UserProfile.css';


const UserProfile = () => {
    const userId = useSelector(state => state.session.user.id);
    const questionsArr = useSelector(state => Object.values(state.questionDetail.questionsReducer));
    const answersArr = useSelector(state => Object.values(state.questionDetail.answers));
    const usersArr = useSelector(state => state.session.users);
    const user = usersArr.find(user => userId === user.id);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetUsers());
        dispatch(thunkGetAllQuestions());
        dispatch(thunkGetAllAnswers());
    }, [dispatch]);

    return (
        <div>
            <Navigation />
            <div className='user-section'>
                {user && (
                    <div className='user-details'>
                        <img src={user.icon} />
                        <div>
                            <h1>{user.username}</h1>
                            <h2>{user.bio}</h2>
                        </div>
                    </div>
                )}
            </div>
            <div className='questions-answers'>
                <div className='questions-section'>
                    {user && (
                        <h3>Questions posted by {user.username}:</h3>
                    )}
                    {questionsArr && questionsArr.map(question => (
                        <div key={question.id}>
                            {question.ownerId === userId && (
                                <div className='questions'>
                                    <h4>{question.title}</h4>
                                    {question.description && (
                                        <p>{question.description}</p>
                                    )}
                                    {question.image && (
                                        <img src={question.image} />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className='answers-section'>
                    {user && (
                        <h3>Answers posted by {user.username}: </h3>
                    )}
                    {answersArr && answersArr.map(answer => (
                        <div key={answer.id}>
                            {answer.userId === userId && (
                                <div className='answers'>
                                    <p>{answer.body}</p>
                                    {answer.image && (
                                        <img src={answer.image} />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserProfile;
