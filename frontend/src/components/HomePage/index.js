import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { thunkGetUsers } from '../../store/session';
import AllQuestions from '../AllQuestions';
import CreateQuestionForm from '../CreateQuestionForm';
import Navigation from '../Navigation';
import './HomePage.css';

const HomePage = ({ isLoaded }) => {
    const user = useSelector(state => state.session.user);
    const questions = useSelector(state => state.allQuestions.orderedQuestions);
    const [showPostForm, setShowPostForm] = useState(false);
    const users = useSelector(state => state.session.users);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetUsers());
    }, [dispatch]);

    return (
        <div className='homepage'>
            <Navigation isLoaded={isLoaded} />
            {user ? (
                <div className='questions-content'>
                    <div className='post-question-box'>
                        {!showPostForm && (
                            <>
                                {/* <img src={}/> */}
                                <input type="text" onClick={() => setShowPostForm(true)} placeholder="Post a new question!"></input>
                            </>
                        )}
                    </div>
                    <>
                        {showPostForm && (
                            <div className='post-question-form'>
                                <h2>What's your question?</h2>
                                <CreateQuestionForm showPostForm={showPostForm} setShowPostForm={setShowPostForm} />
                                <button onClick={() => setShowPostForm(false)}>Cancel question</button>
                            </div>
                        )}
                    </>
                    <AllQuestions />
                </div>
            ) : (
                <Redirect to='/login' />
            )}
        </div>
    )
}

export default HomePage;
