import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAddQuestion } from '../../store/questions';
import { thunkGetAllQuestions } from '../../store/questions';
import { thunkGetAllSpaces } from '../../store/spaces';
import './CreateQuestion.css';

const CreateQuestionForm = ({ showPostForm, closeQuestionModal }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [space, setSpace] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const allSpaces = useSelector(state => Object.values(state.spaces));

    const ownerId = useSelector(state => state.session.user.id);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllSpaces())
    }, [dispatch]);

    useEffect(() => {
        const errors = [];

        if (!title.length) {
            errors.push('Please create a title for your question')
        }
        if (image.length > 0 && !image.match(/\.(jpg|jpeg|png|gif)$/)) {
            errors.push('Please enter a valid image URL');
        }

        setValidationErrors(errors);
    }, [title, image, hasSubmitted]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (validationErrors.length > 0) {
            await dispatch(thunkGetAllQuestions());
            return alert("Please fix errors with your question");
        }

        const newQuestion = {
            ownerId: ownerId,
            spaceId: space,
            title,
            description,
            image,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const question = await dispatch(thunkAddQuestion(newQuestion));

        if (question) {
            reset();
        }

        await dispatch(thunkGetAllQuestions());
    };

    const reset = () => {
        setTitle('');
        setDescription('');
        setImage('');
        setValidationErrors([]);
        setHasSubmitted(false);
        closeQuestionModal();
    };

    return (
        <div className='createQuestion-bg'>
            <div className='createQuestion-container'>
                <div className='createQuestion-errors'>
                    <ul>
                        {hasSubmitted && showPostForm && validationErrors.length > 0 && validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
                <div className='createQuestion-form'>
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
                            className='image-input'
                        />
                        <label htmlFor='space'>Add this question to a space (optional)</label>
                        <select onChange={(e) => setSpace(e.target.value)}>
                            {allSpaces && allSpaces.map(space => (
                                <option value={space.id}>{space.name}</option>
                            ))}
                        </select>
                        <button id='modal-button' className='post-button' type='submit'>Post question</button>
                        <br />
                        <button id='modal-button' onClick={closeQuestionModal}>Cancel question</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateQuestionForm;
