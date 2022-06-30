import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllQuestions } from '../../store/questions';
import { thunkGetAllAnswers } from '../../store/answers';

const UserProfile = () => {
    const userId = useSelector(state => state.session.user.id);
    const questionsArr = useSelector(state => state.questionDetail.questionsReducer.orderedQuestions);
    const answersArr = useSelector(state => state.questionDetail.answers.orderedAnswers);
    const answers = useSelector(state => Object.values(state.questionDetail.answers));
    // console.log(user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllAnswers());
    }, [dispatch]);

    return (
        <div>
            {answers && answers.map(answer => (
                <>
                    {answer.User && answer.User.id === userId && (
                        <div key={answer.id}className='answers'>
                            <p>{answer.body}</p>
                        </div>
                    )}
                    {answer.Question && answer.Question.ownerId === userId && (
                        <div key={answer.Question}className='questions'>
                            <h3>{answer.Question.title}</h3>
                        </div>
                    )}
                </>
            ))}
        </div>
    )
}

export default UserProfile;
