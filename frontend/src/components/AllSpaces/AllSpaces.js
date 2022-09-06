import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkGetAllSpaces } from '../../store/spaces';
import { thunkCreateSpace } from '../../store/spaces';
import Modal from 'react-modal';
import './allspaces.css';

const AllSpaces = () => {
    const userId = useSelector(state => state.session?.user?.id);
    const spaces = useSelector(state => Object.values(state.spaces));
    const [showSpaceForm, setShowSpaceForm] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    Modal.setAppElement('body');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllSpaces())
    }, [dispatch])

    function openSpaceModal() {
        setShowSpaceForm(true)
    }

    function closeSpaceModal() {
        setShowSpaceForm(false)
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

    const reset = () => {
        setName('');
        setDescription('');
        setIcon('');
        setValidationErrors('')
        setHasSubmitted(false);
        setShowSpaceForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        const newSpace = {
            ownerId: userId,
            name: name,
            icon: icon,
            description: description,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const space = await dispatch(thunkCreateSpace(newSpace));

        if (space) {
            reset();
        }

        await dispatch(thunkGetAllSpaces())
    }


    return (
        <div className='all-spaces'>
            <button id='create-space-btn' onClick={openSpaceModal}><i className="fa-solid fa-plus" />Create Space</button>
            <Modal isOpen={showSpaceForm} style={styling}>
                <button id='modal-button' onClick={closeSpaceModal}><i className="fa-solid fa-x" /></button>
                <ul>
                    {validationErrors.length > 0 && validationErrors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                <h1>Create a Space</h1>
                <p>Share your interests, curate content, host discussions, and more.</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name*</label>
                    <p>This can be changed in Space settings.</p>
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
                    <p>Include a few keywords to show people what to expect if they join.</p>
                    <input
                        type='text'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        name='description'
                    />
                    <button id='modal-button'>Create</button>
                </form>
            </Modal>
            <ul id='all-spaces-list'>
                {spaces && spaces.map(space => (
                    <Link to={`/spaces/${space.id}`}>
                        <li>{space.name}</li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default AllSpaces
