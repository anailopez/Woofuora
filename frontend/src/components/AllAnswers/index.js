import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllAnswers } from '../../store/answers';
import { thunkDeleteAnswer } from '../../store/answers';
import CreateAnswerForm from '../CreateAnswerForm';
import './AllAnswers.css';

const AllAnswers = ({ question, showAnswers, setShowAnswers }) => {
    const answersArr = useSelector(state => state.questionDetail.answers.orderedAnswers);
    const userId = useSelector(state => state.session.user.id);

    const answers = answersArr.find(answer => answer.questionId === question.id);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllAnswers());
    }, [dispatch]);


    return (
        <div>
            {showAnswers && (
                <>
                    <>
                        <button onClick={() => setShowAnswers(false)}>Hide answers</button>
                    </>
                    <>
                        {!answers && (
                            <>
                                <p>No answers yet!</p>
                                {question.ownerId !== userId && (
                                    <p>Be the first to answer this question!</p>
                                )}
                            </>
                        )}

                        {question.ownerId !== userId && (
                            <CreateAnswerForm question={question} />
                        )}
                    </>
                    {answersArr && answersArr.map(answer => (
                        <div key={answer.id}>
                            {answer.Question && question.id === answer.Question.id && (
                                <div>
                                    {answer.User && (
                                        <div className='answer-user'>
                                            <img src={answer.User.icon} alt="icon" />
                                            <h4>{answer.User.username} answered:</h4>
                                        </div>
                                    )}
                                    <div className='answer-content'>
                                        <p>{answer.body}</p>
                                        {answer.image && (
                                            <img src={answer.image} />
                                        )}

                                    </div>
                                    {question.ownerId !== userId && (
                                        <button onClick={() => { dispatch(thunkDeleteAnswer(answer.id)); dispatch(thunkGetAllAnswers()) }}>Delete your answer</button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div >
    )
}

export default AllAnswers;
