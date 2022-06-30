import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AllQuestions from '../AllQuestions';
import CreateQuestionForm from '../CreateQuestionForm';
import Navigation from '../Navigation';
import './HomePage.css';

const HomePage = ({isLoaded}) => {
    const user = useSelector(state => state.session.user);
    const questions = useSelector(state => state.allQuestions.orderedQuestions);
    const [showPostForm, setShowPostForm] = useState(false);

    return (
        <div className='homepage'>
            <Navigation isLoaded={isLoaded} />
            {user ? (
                <div className='questions-content'>
                    <div className='post-question-button'>
                        {!showPostForm && (
                            <button onClick={() => setShowPostForm(true)}>Post a new question!</button>
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
