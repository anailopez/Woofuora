import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkUpdateQuestion } from '../../store/questions';
import { thunkGetAllQuestions } from '../../store/questions';
import { thunkGetAllSpaces } from '../../store/spaces';


const EditQuestionForm = ({ questionId, showEditForm, setShowEditForm }) => {
    const questionsArr = useSelector((state) => Object.values(state.allQuestions));
    const question = questionsArr.find(question => question.id === questionId);
    const allSpaces = useSelector(state => Object.values(state.spaces));

    const [title, setTitle] = useState(question.title);
    const [description, setDescription] = useState(question.description || '');
    const [image, setImage] = useState(question.image || '');
    const [space, setSpace] = useState(question.spaceId || '');
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const ownerId = useSelector(state => state.session.user.id);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(thunkGetAllSpaces())
    }, [dispatch]);

    useEffect(() => {
        const errors = [];

        if (!title.length) {
            errors.push('Please make a title for your question!')
        }

        setValidationErrors(errors);
    }, [title]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (validationErrors.length > 0) {
            return alert("Oops! Please fix errors with your question!");
        }

        const updatedQuestion = {
            questionId: questionId,
            ownerId: ownerId,
            spaceId: space,
            title,
            description,
            image,
            updatedAt: new Date()
        };

        const question = await dispatch(thunkUpdateQuestion(updatedQuestion));

        if (question) {
            reset();
        }

        await dispatch(thunkGetAllQuestions());
        history.push(`/spaces/${space}`);
    };

    const reset = () => {
        setTitle('');
        setDescription('');
        setImage('');
        setValidationErrors([]);
        setHasSubmitted(false);
        setShowEditForm(false);
    };


    return (
        <div>
            {showEditForm && (
                <>
                    <h2>Want to make some changes to your question?</h2>
                    <ul>
                        {hasSubmitted && validationErrors.length > 0 && validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    <form onSubmit={handleSubmit}>
                        <label>Title</label>
                        <input
                            type='text'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder='Title'
                            name='title'
                        />
                        <label>Description</label>
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            name='description'
                            placeholder='Description'
                            rows='5'
                        />
                        <label>Image</label>
                        <input
                            type='text'
                            onChange={(e) => setImage(e.target.value)}
                            value={image}
                            placeholder='Image URL'
                            name='image'
                        />
                        <label htmlFor='space'>Add this question to a space (optional)</label>
                        <select onChange={(e) => setSpace(e.target.value)}>
                            <option disabled selected>Select a space</option>
                            {allSpaces && allSpaces.map(space => (
                                <option value={space.id}>{space.name}</option>
                            ))}
                        </select>
                        <button type='submit'>Update your question!</button>
                    </form>
                </>
            )}
        </div>
    )
}

export default EditQuestionForm;
