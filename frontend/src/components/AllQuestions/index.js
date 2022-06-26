import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllQuestions } from '../../store/questions';

const AllQuestions = () => {
    const dispatch = useDispatch();

    const questions = useSelector((state) => Object.values(state.allQuestions));

    useEffect(() => {
        dispatch(thunkGetAllQuestions());
    }, [dispatch]);

    return (
        <div>
                {questions && Object.values(questions.map(question => (
                    <div key={question.id}>
                        <h2>{question.title}</h2>
                        <p>{question.description}</p>
                    </div>
                )))}
        </div>
    )
}

export default AllQuestions;
