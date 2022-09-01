import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetAllSpaces } from '../../store/spaces';
import { thunkGetAllQuestions } from '../../store/questions';
import AllQuestions from '../AllQuestions';

const SingleSpace = () => {
    const { spaceId } = useParams();
    const spaces = useSelector(state => Object.values(state.spaces));
    const space = spaces.find(space => space.id === parseInt(spaceId));
    const questions = useSelector(state => Object.values(state.allQuestions));
    const filteredQuestions = questions.filter(question => question.spaceId === parseInt(spaceId));
    const dispatch = useDispatch();
    console.log(filteredQuestions);

    useEffect(() => {
        dispatch(thunkGetAllSpaces());
        dispatch(thunkGetAllQuestions());
    }, [dispatch]);

    return (
        <>
            {space && (
                <>
                    <img src={`${space.icon}`}></img>
                    <h1>{space.name}</h1>
                    <div>
                        {filteredQuestions && filteredQuestions.map(question => (
                            <>
                                <img src={`${question.User.icon}`}></img>
                                <h3>{question.User.username}</h3>
                                <h2>{question.title}</h2>
                                <p>{question.description}</p>
                            </>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default SingleSpace
