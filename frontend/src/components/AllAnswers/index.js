import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllAnswers } from '../../store/answers';
import { thunkDeleteAnswer } from '../../store/answers';
import { thunkGetAllQuestions } from '../../store/questions';
import CreateAnswerForm from '../CreateAnswerForm';
import './AllAnswers.css';

const AllAnswers = ({ question }) => {
    const answersArr = useSelector(state => state.questionDetail.answers.orderedAnswers);
    const userId = useSelector(state => state.session.user.id);
    const arrAnswers = useSelector(state => state.questionDetail.answers);
    const answers = answersArr.find(answer => answer.questionId === question.id);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllAnswers());
    }, [dispatch]);



    return (
        <div>
            {question.ownerId !== userId && (
                <>
                    {!answers && (
                        <p>This question currently has no answers. Be the first to answer!</p>
                    )}
                    <CreateAnswerForm question={question} />
                </>
            )}
            {answersArr && answersArr.map(answer => (
                <div key={answer.id}>
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

                            </div>
                            {answer.userId === userId && (
                                <button onClick={() => { dispatch(thunkDeleteAnswer(answer.id)); dispatch(thunkGetAllAnswers()); dispatch(thunkGetAllQuestions()) }}>Delete your answer</button>
                            )}

                        </div>
                    )}
                </div>
            ))
            }
        </div >
    )
}

export default AllAnswers;
