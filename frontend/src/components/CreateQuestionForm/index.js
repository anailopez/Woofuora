import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAddQuestion } from '../../store/questions';

const CreateQuestionForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState();
    const ownerId = useSelector(state => state.session.user.id)
    // console.log('Ownerid:', ownerId);
    //WORKING!
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newQuestion = {
            ownerId: ownerId,
            title,
            description,
            image
        };

        const question = await dispatch(thunkAddQuestion(newQuestion));
        if (question) reset();
    };

    const reset = () => {
        setTitle('');
        setDescription('');
        setImage('');
    };

    return (
        <div>
            <h1>Post a new question!</h1>
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
                    rows='10'
                />
                <label>Image</label>
                <input
                    type='text'
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                    placeholder='Image URL'
                    name='image'
                />
                <button type='submit'>Post your question</button>
            </form>
        </div>
    )
}

export default CreateQuestionForm;
