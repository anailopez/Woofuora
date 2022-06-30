import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllQuestions } from '../../store/questions';
import { thunkGetAllAnswers } from '../../store/answers';
import Navigation from '../Navigation';
import '../Navigation/Navigation.css';

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
            <Navigation />
            {/* {answers && answers.map(answer => (
                <div key={answer.id}>
                    {answer.User && answer.User.id === userId && (
                        <div className='answers'>
                            <p>{answer.body}</p>
                        </div>
                    )}
                    {answer.Question && answer.Question.ownerId === userId && (
                        <div className='questions'>
                            <h3>{answer.Question.title}</h3>
                        </div>
                    )}
                </div>
            ))} */}
        </div>
    )
}

export default UserProfile;
