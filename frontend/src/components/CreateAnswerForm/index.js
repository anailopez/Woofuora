import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAddAnswer } from '../../store/answers';
import { thunkGetAllAnswers } from '../../store/answers';
import { thunkGetAllQuestions } from '../../store/questions';
import './CreateAnswerForm.css';

const CreateAnswerForm = ({ question, closeAnswerModal }) => {
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const userId = useSelector(state => state.session.user.id);

    const dispatch = useDispatch();

    useEffect(() => {
        const errors = [];

        if (!body.length) {
            errors.push('Cannot submit an empty answer!');
        }
        if (image.length > 0 && !image.match(/\.(jpg|jpeg|png|gif)$/)) {
            errors.push('Please submit a valid image!');
        }

        setValidationErrors(errors);
    }, [body, image, hasSubmitted]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (validationErrors.length > 0) {
            await dispatch(thunkGetAllAnswers());
            return alert("Oops! Please fix errors with your answer!");
        }

        const newAnswer = {
            userId: userId,
            questionId: question.id,
            body,
            image,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const answer = await dispatch(thunkAddAnswer(newAnswer));

        if (answer) {
            reset();
        }

        await dispatch(thunkGetAllAnswers());
    };

    const reset = () => {
        setBody('');
        setImage('');
        setValidationErrors([]);
        setHasSubmitted(false);
        closeAnswerModal();
    };


    return (
        <div>
            <ul>
                {hasSubmitted && validationErrors.length > 0 && validationErrors.map(error => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <label>Your Answer:</label>
                <textarea
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                    name='body'
                    rows='2'
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
                <button className='post-button' type="submit">Submit your answer!</button>
            </form>
        </div>
    )
}


export default CreateAnswerForm;
