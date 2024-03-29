import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { thunkGetUsers } from '../../store/session';
import Modal from 'react-modal';
import AllQuestions from '../AllQuestions';
import CreateQuestionForm from '../CreateQuestionForm';
import Navigation from '../Navigation';
import AllSpaces from '../AllSpaces/AllSpaces';
import './HomePage.css';


const HomePage = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session?.user);
    const [showPostForm, setShowPostForm] = useState(false);
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
            {sessionUser ? (
                <>
                    <Navigation isLoaded={isLoaded} />
                    <div className='homepage-content'>
                        <div className='all-spaces-container'>
                            <AllSpaces />
                        </div>
                        <div className='questions-content'>
                            <div className='createQuestion-container'>
                                <div id='question-input'>
                                    <input
                                        type='text'
                                        placeholder='What do you want to ask or share?'
                                        onClick={openQuestionModal}
                                    />
                                </div>
                                <div className='post-question-form'>
                                    <Modal isOpen={showPostForm} style={questionFormStyle}>
                                        <h2>What's your question?</h2>
                                        <CreateQuestionForm showPostForm={showPostForm} closeQuestionModal={closeQuestionModal} />
                                    </Modal >
                                </div>
                            </div>
                            <AllQuestions />
                        </div>
                    </div>
                </>
            ) : (
                <Redirect to='/login' />
            )}
        </div>
    )
}

export default HomePage;
