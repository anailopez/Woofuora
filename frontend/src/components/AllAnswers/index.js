import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllAnswers } from '../../store/answers';
import { thunkDeleteAnswer } from '../../store/answers';
import { thunkGetAllQuestions } from '../../store/questions';
import Modal from 'react-modal';
import CreateAnswerForm from '../CreateAnswerForm';
import './AllAnswers.css';

const AllAnswers = ({ question }) => {
    const answersArr = useSelector(state => state.questionDetail.answers.orderedAnswers);
    const userId = useSelector(state => state.session.user.id);
    const arrAnswers = useSelector(state => state.questionDetail.answers);
    const answers = answersArr.find(answer => answer.questionId === question.id);
    const [showAnswerForm, setShowAnswerForm] = useState(false);
    Modal.setAppElement('body');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllAnswers());
    }, [dispatch]);

    function openAnswerModal() {
        setShowAnswerForm(true)
    }

    function closeAnswerModal() {
        setShowAnswerForm(false)
    }

    const styling = {
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
        <div>
            {question.ownerId !== userId && (
                <>
                    {!answers && (
                        <p>This question currently has no answers. Be the first to answer!</p>
                    )}
                    <div className='leave-answer-button'>
                        <button onClick={openAnswerModal}>Leave an answer to this question!</button>
                    </div>
                    <Modal isOpen={showAnswerForm} style={styling}>
                        <CreateAnswerForm question={question} closeAnswerModal={closeAnswerModal} />
                        <button onClick={closeAnswerModal}>Cancel answer</button>
                    </Modal>
                </>
            )}
            {answersArr && answersArr.map(answer => (
                <div key={answer.id} className={'allanswers-content'}>
                    {answer.Question && question.id === answer.Question.id && (
                        <div>
                            {answer.User && (
                                <div className='answer-user'>
                                    {answer.User.icon && (
                                        <img src={answer.User.icon} alt="icon" />
                                    )}
                                    <h4>{answer.User.username} answered:</h4>
                                </div>
                            )}
                            <div className='answer-content'>
                                <p>{answer.body}</p>
                                {answer.image && (
                                    <img src={answer.image} />
                                )}
                                {answer.userId === userId && (
                                    <button onClick={() => { dispatch(thunkDeleteAnswer(answer.id)); dispatch(thunkGetAllAnswers()); dispatch(thunkGetAllQuestions()) }}>
                                        <i className="fa-solid fa-trash-can" /> Delete your answer
                                    </button>
                                )}

                            </div>
                        </div>
                    )}
                </div>
            ))
            }
        </div >
    )
}

export default AllAnswers;
