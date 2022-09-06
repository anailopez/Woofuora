import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllQuestions } from '../../store/questions';
import SingleQuestion from '../SingleQuestion/SingleQuestion';
import './AllQuestions.css';

const AllQuestions = () => {
    const questionsArr = useSelector(state => state.questionDetail.questionsReducer.orderedQuestions);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllQuestions());
    }, [dispatch]);


    return (
        <div className='allQuestions'>
            {questionsArr && questionsArr.map(question => (
                <SingleQuestion question={question} />
            ))}
        </div>
    )
}

export default AllQuestions;
