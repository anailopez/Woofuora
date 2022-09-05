import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllAnswers } from '../../store/answers';
import { thunkDeleteAnswer, thunkUpdateAnswer } from '../../store/answers';
import { thunkGetAllQuestions } from '../../store/questions';
import { thunkCreateReply, thunkGetAllReplies } from '../../store/replies';
import Modal from 'react-modal';
import CreateAnswerForm from '../CreateAnswerForm';
import AllReplies from '../AllReplies/AllReplies';
import './AllAnswers.css';

const AllAnswers = ({ question }) => {
    const answersArr = useSelector(state => state.questionDetail.answers.orderedAnswers);
    const userId = useSelector(state => state.session.user.id);
    const answers = answersArr.find(answer => answer.questionId === question.id);
    const [showAnswerForm, setShowAnswerForm] = useState(false);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [content, setContent] = useState('');
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);


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

    useEffect(() => {
        const errors = [];

        if (!content.length) {
            errors.push('Cannot submit an empty reply')
        }

        if (content.length > 500) {
            errors.push('Reply cannot exceed 500 characters')
        }

        setValidationErrors(errors);
    }, [content]);

    const handleReply = async (content, answerId, userId) => {

        if (validationErrors.length > 0) {
            return alert('Cannot submit reply')
        }
        const newReply = {
            content: content,
            answerId: answerId,
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const reply = await dispatch(thunkCreateReply(newReply));

        if (reply) {
            setContent('');
            setCurrentAnswer('');
            setValidationErrors([]);
            setShowReplyInput(false);
        }

        await dispatch(thunkGetAllReplies());
    }

    return (
        <div className='all-answers'>
            {!answers && (
                <p>This question currently has no answers.</p>
            )}
            {question.ownerId !== userId && (
                <>
                    {!answers && (
                        <p>Be the first to answer this question!</p>
                    )}
                    <div className='leave-answer-button'>
                        <input
                            type='text'
                            placeholder='Add a comment...'
                            onClick={openAnswerModal}
                        />
                        {/* <button onClick={openAnswerModal}>Leave an answer to this question!</button> */}
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
                                    <img src={answer.image} alt="answer" />
                                )}
                                {answer.userId === userId && (
                                    <div>
                                        <button onClick={() => { dispatch(thunkDeleteAnswer(answer.id)); dispatch(thunkGetAllAnswers()); dispatch(thunkGetAllQuestions()) }}>
                                            <i className="fa-solid fa-trash-can" /> Delete your answer
                                        </button>
                                        <button>Edit Answer</button>
                                    </div>
                                )}
                                {answer.userId !== userId && (
                                    <>
                                        <button onClick={() => { setShowReplyInput(!showReplyInput); setCurrentAnswer(answer.id) }}>Reply</button>
                                        {showReplyInput && answer.id === currentAnswer && (
                                            <div>
                                                <input
                                                    placeholder='Add a reply...'
                                                    type='text'
                                                    onChange={(e) => setContent(e.target.value)}
                                                    value={content}
                                                />
                                                <button onClick={() => handleReply(content, answer.id, userId)}>Reply</button>
                                            </div>
                                        )}
                                    </>
                                )}

                            </div>
                            <AllReplies answer={answer} />
                        </div>
                    )}
                </div>
            ))}
        </div >
    )
}

export default AllAnswers;
