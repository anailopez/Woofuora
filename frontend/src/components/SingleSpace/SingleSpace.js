import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { thunkGetAllSpaces } from '../../store/spaces';
import { thunkGetAllQuestions } from '../../store/questions';
import { thunkDeleteSpace } from '../../store/spaces';
import { thunkEditSpace } from '../../store/spaces';
import Modal from 'react-modal';
import Navigation from '../Navigation';
import AllSpaces from '../AllSpaces/AllSpaces.js';

const SingleSpace = () => {
    const userId = useSelector(state => state.session?.user?.id);
    const { spaceId } = useParams();
    const spaces = useSelector(state => Object.values(state.spaces));
    const space = spaces.find(space => space.id === parseInt(spaceId));
    const questions = useSelector(state => Object.values(state.allQuestions));
    const filteredQuestions = questions.filter(question => question.spaceId === parseInt(spaceId));
    const [showEditSpaceForm, setEditSpaceForm] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    Modal.setAppElement('body');

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        dispatch(thunkGetAllSpaces());
        dispatch(thunkGetAllQuestions());
    }, [dispatch]);

    useEffect(() => {
        if (space) {
            setName(space.name);
            setDescription(space.description || '');
            setIcon(space.icon || '')
        }
    }, [dispatch, space])

    const handleDelete = async (spaceId) => {
        await dispatch(thunkDeleteSpace(spaceId));
        history.push('/');
    }

    const reset = () => {
        setName(space.name);
        setDescription(space.description || '');
        setIcon(space.icon || '');
        setValidationErrors([]);
        setHasSubmitted(false);
    };

    useEffect(() => {
        const errors = [];

        if (!name.length) {
            errors.push('Please provide a name for your new list')
        }

        if (name.length > 250) {
            errors.push('Name cannot exceed 250 characters')
        }

        if (description.length > 500) {
            errors.push('Description cannot exceed 500 characters')
        }

        if (icon.length > 500) {
            errors.push('Icon URL length cannot exceed 500 characters')
        }

        setValidationErrors(errors);
    }, [name, description, icon]);

    const handleEdit = async (e) => {
        e.preventDefault();

        // setHasSubmitted(true);

        const updatedSpace = {
            spaceId: spaceId,
            name: name,
            icon: icon,
            description: description,
            updatedAt: new Date()
        }

        const space = await dispatch(thunkEditSpace(updatedSpace))

        if (space) {
            reset();
        }

        closeEditModal();
        await dispatch(thunkGetAllSpaces());
    }

    function openEditModal() {
        setEditSpaceForm(true)
    }

    function closeEditModal() {
        setEditSpaceForm(false)
    }

    const styling = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };


    return (
        <>
            <Navigation />
            <AllSpaces />
            {space && (
                <>
                    {space.ownerId === userId && (
                        <>
                            <button onClick={openEditModal}>Edit space</button>
                            <Modal isOpen={showEditSpaceForm} style={styling}>
                                <div>
                                    <h2>Edit this space</h2>
                                    <ul>
                                        {hasSubmitted && validationErrors.length > 0 && validationErrors.map(error => (
                                            <li key={error}>{error}</li>
                                        ))}
                                    </ul>
                                    <form onSubmit={handleEdit}>
                                        <label htmlFor='name'>Name*</label>
                                        <input
                                            type='text'
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            name='name'
                                        />
                                        <label htmlFor='icon'>Icon URL</label>
                                        <input
                                            type='text'
                                            onChange={(e) => setIcon(e.target.value)}
                                            value={icon}
                                            name='icon'
                                        />
                                        <label htmlFor='description'>Brief description</label>
                                        <input
                                            type='text'
                                            onChange={(e) => setDescription(e.target.value)}
                                            value={description}
                                            name='description'
                                        />
                                        <button>Confirm edit</button>
                                    </form>
                                </div>
                            </Modal>
                            <button onClick={() => handleDelete(space.id)}>Delete space</button>
                        </>
                    )}
                    <div>
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
                    </div>
                </>
            )}
        </>
    )
}

export default SingleSpace
