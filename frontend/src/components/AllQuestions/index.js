import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllQuestions } from '../../store/questions';
import { thunkDeleteQuestion } from '../../store/questions';
import EditQuestionForm from '../EditQuestionForm';

const AllQuestions = () => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [buttonId, setButtonId] = useState(null);
    const dispatch = useDispatch();

    const questionsArr = useSelector((state) => Object.values(state.allQuestions));
    const userId = useSelector(state => state.session.user.id);

    useEffect(() => {
        dispatch(thunkGetAllQuestions());
    }, [dispatch]);


    return (
        <div>
            {questionsArr && questionsArr.map(question => (
                <div key={question.id}>
                    {question.User && (
                        <>
                            <img src={question.User.icon} alt='icon' />
                            <h3>{question.User.username}'s question:</h3>
                        </>
                    )}
                    <h2>{question.title}</h2>
                    <p>{question.description}</p>
                    {question.image && (
                        <img src={question.image} />
                    )}
                    {question.User && showEditForm && question.User.id === userId && buttonId === question.id && (
                        <div>
                            <EditQuestionForm questionId={question.id} showEditForm={showEditForm} setShowEditForm={setShowEditForm} />
                            <button onClick={() => setShowEditForm(false)}>Cancel Changes</button>
                        </div>
                    )}
                    {question.ownerId === userId && !showEditForm && (
                        <div>
                            <button id={buttonId} onClick={(e) => { setShowEditForm(true); setButtonId(question.id) }}>Edit</button>
                            <button onClick={() => dispatch(thunkDeleteQuestion(question.id))}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default AllQuestions;
