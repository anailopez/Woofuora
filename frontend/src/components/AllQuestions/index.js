import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllQuestions } from '../../store/questions';
import { thunkDeleteQuestion } from '../../store/questions';
import EditQuestionForm from '../EditQuestionForm';

const AllQuestions = () => {
    const [showEditForm, setShowEditForm] = useState(false);
    const dispatch = useDispatch();

    const questions = useSelector((state) => state.allQuestions);
    const questionsArr = Object.values(questions);
    const userId = useSelector(state => state.session.user.id);

    useEffect(() => {
        dispatch(thunkGetAllQuestions());
    }, [dispatch]);

    return (
        <div>
            {questions && questionsArr.map(question => (
                <div key={question.id}>
                    {question.User && (
                        <>
                            <img src={question.User.icon}></img>
                            <h3>{question.User.username}'s question:</h3>
                        </>
                    )}
                    <h2>{question.title}</h2>
                    <p>{question.description}</p>
                    <img src={question.image} />
                    {showEditForm && (
                        <div>
                            <EditQuestionForm questionId={question.id} />
                            <button onClick={() => setShowEditForm(false)}>Cancel Changes</button>
                        </div>
                    )}
                    {question.ownerId === userId && !showEditForm && (
                        <div>
                            <button onClick={() => setShowEditForm(true)}>Edit</button>
                            <button onClick={() => dispatch(thunkDeleteQuestion(question.id))}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default AllQuestions;
