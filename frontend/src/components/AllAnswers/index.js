import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllAnswers, thunkDeleteAnswer, thunkAddAnswer } from '../../store/answers';
import { thunkGetAllQuestions } from '../../store/questions';
import { thunkCreateReply, thunkGetAllReplies } from '../../store/replies';
import Modal from 'react-modal';
import AllReplies from '../AllReplies/AllReplies';
import './AllAnswers.css';

const AllAnswers = ({ question }) => {
    const answersArr = useSelector(state => state.questionDetail.answers.orderedAnswers);
    const userId = useSelector(state => state.session.user.id);
    const answers = answersArr.find(answer => answer.questionId === question.id);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [content, setContent] = useState('');
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [body, setBody] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [answerErrors, setAnswerErrors] = useState([]);
    const [showReplyBtn, setShowReplyBtn] = useState(true);

    Modal.setAppElement('body');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllAnswers());
    }, [dispatch]);

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
            setShowReplyBtn(true);
        }

        await dispatch(thunkGetAllReplies());
    }

    useEffect(() => {
        const errors = [];

        if (!body.length) {
            errors.push('Cannot submit an empty answer!');
        }
        if (body.length > 500) {
            errors.push('Comment cannot exceed 500 characters');
        }

        setAnswerErrors(errors);
    }, [body]);

    const handleAnswer = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (answerErrors.length > 0) {
            return alert("Please fix errors with your answer");
        }

        const newAnswer = {
            userId: userId,
            questionId: question.id,
            body,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const answer = await dispatch(thunkAddAnswer(newAnswer));

        if (answer) {
            setBody('');
            setAnswerErrors([]);
            setHasSubmitted(false);
        }

        await dispatch(thunkGetAllAnswers());
    };

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
                    <div className='leave-answer-area'>
                        {hasSubmitted && answerErrors.length > 0 && answerErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                        <input
                            type='text'
                            placeholder='Add an answer...'
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                        />
                        <button id='add-comment-btn' onClick={handleAnswer}>Add answer</button>
                    </div>
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
                                    <h4>{answer.User.username}</h4>
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
                                            <i className="fa-solid fa-trash-can" /> Delete answer
                                        </button>
                                    </div>
                                )}
                                {answer.userId !== userId && (
                                    <div className='add-reply-area'>
                                        {showReplyBtn && (
                                            <button onClick={() => { setShowReplyInput(true); setCurrentAnswer(answer.id); setShowReplyBtn(false) }}>Reply</button>
                                        )}
                                        {showReplyInput && answer.id === currentAnswer && (
                                            <div className='reply-input-area'>
                                                <input
                                                    placeholder='Add a reply...'
                                                    type='text'
                                                    onChange={(e) => setContent(e.target.value)}
                                                    value={content}
                                                />
                                                <button onClick={() => handleReply(content, answer.id, userId)}>Reply</button>
                                                <button onClick={() => { setShowReplyInput(false); setShowReplyBtn(true) }}>Cancel</button>
                                            </div>
                                        )}
                                    </div>
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
