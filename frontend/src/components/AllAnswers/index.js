import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllAnswers } from '../../store/answers';

const AllAnswers = ({ questionId }) => {
    const dispatch = useDispatch();

    const answersArr = useSelector(state => state.questionDetail.answers.orderedAnswers);

    useEffect(() => {
        dispatch(thunkGetAllAnswers());
    }, [dispatch]);

    return (
        <div>
            {answersArr && answersArr.map(answer => (
                <>
                    {answer.Question && questionId === answer.Question.id && (
                        <div key={answer.id}>
                            {answer.User && (
                                <>
                                    <img src={answer.User.icon} alt="icon" />
                                    <h4>{answer.User.username} answered:</h4>
                                </>
                            )}
                            <div className='answer-content'>
                                <p>{answer.body}</p>
                                {answer.image && (
                                    <img src={answer.image} />
                                )}

                            </div>
                        </div>
                    )}
                </>
            ))}
        </div>
    )
}

export default AllAnswers;
