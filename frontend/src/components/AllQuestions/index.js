import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllQuestions } from '../../store/questions';
import { thunkDeleteQuestion } from '../../store/questions';

const AllQuestions = () => {
    const dispatch = useDispatch();

    const questions = useSelector((state) => Object.values(state.allQuestions));
    const userId = useSelector(state => state.session.user.id);

    useEffect(() => {
        dispatch(thunkGetAllQuestions());
    }, [dispatch]);


    //add onClick to buttons!
    return (
        <div>
            {questions && questions.map(question => (
                <div key={question.id}>
                    <h2>{question.title}</h2>
                    <p>{question.description}</p>
                    <img src={question.image} />
                    {question.ownerId === userId && (
                        <div>
                            <button>Edit</button>
                            <button onClick={() => dispatch(thunkDeleteQuestion(question.id))}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default AllQuestions;
