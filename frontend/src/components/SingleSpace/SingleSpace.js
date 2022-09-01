import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { thunkGetAllSpaces } from '../../store/spaces';
import { thunkGetAllQuestions } from '../../store/questions';
import { thunkDeleteSpace } from '../../store/spaces';
import AllQuestions from '../AllQuestions';

const SingleSpace = () => {
    const { spaceId } = useParams();
    const spaces = useSelector(state => Object.values(state.spaces));
    const space = spaces.find(space => space.id === parseInt(spaceId));
    const questions = useSelector(state => Object.values(state.allQuestions));
    const filteredQuestions = questions.filter(question => question.spaceId === parseInt(spaceId));
    const dispatch = useDispatch();
    // console.log(filteredQuestions);
    const history = useHistory();

    useEffect(() => {
        dispatch(thunkGetAllSpaces());
        dispatch(thunkGetAllQuestions());
    }, [dispatch]);

    const handleDelete = async (spaceId) => {
        await dispatch(thunkDeleteSpace(spaceId));
        history.push('/');
    }

    return (
        <>
            {space && (
                <>
                    <img src={`${space.icon}`}></img>
                    <h1>{space.name}</h1>
                    <button onClick={() => handleDelete(space.id)}>Delete space</button>
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
