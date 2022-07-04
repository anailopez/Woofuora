import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { thunkGetUsers } from '../../store/session';
import Modal from 'react-modal';
import AllQuestions from '../AllQuestions';
import CreateQuestionForm from '../CreateQuestionForm';
import Navigation from '../Navigation';
import './HomePage.css';


const HomePage = ({ isLoaded }) => {
    const user = useSelector(state => state.session.user);
    const questions = useSelector(state => state.allQuestions.orderedQuestions);
    const [showPostForm, setShowPostForm] = useState(false);
    const users = useSelector(state => state.session.users);
    Modal.setAppElement('body');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetUsers());
    }, [dispatch]);


    function openQuestionModal() {
        setShowPostForm(true)
    }

    function closeQuestionModal() {
        setShowPostForm(false)
    }

    const questionFormStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };


    return (
        <div className='homepage'>
            {user ? (
                <>
                    <Navigation isLoaded={isLoaded} />
                    <div className='questions-content'>
                        <div className='createQuestion-container'>
                            <button className="post-questions-button" onClick={openQuestionModal}> Post a new question! </button>
                            <div className='post-question-form'>
                                <Modal isOpen={showPostForm} style={questionFormStyle}>
                                    <h2>What's your question?</h2>
                                    <CreateQuestionForm showPostForm={showPostForm} closeQuestionModal={closeQuestionModal} />
                                    <button onClick={closeQuestionModal}>Cancel question</button>
                                </Modal >
                            </div>
                        </div>
                        <AllQuestions />
                    </div>
                </>
            ) : (
                <Redirect to='/login' />
            )}
        </div>
    )
}

export default HomePage;
