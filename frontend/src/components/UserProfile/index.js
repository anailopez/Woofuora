import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllQuestions } from '../../store/questions';
import { thunkGetAllAnswers } from '../../store/answers';
import { thunkGetUsers } from '../../store/session';
import Navigation from '../Navigation';
import './UserProfile.css';


const UserProfile = () => {
    const userId = useSelector(state => state.session.user.id);
    const questionsArr = useSelector(state => Object.values(state.questionDetail.questionsReducer));
    const answersArr = useSelector(state => Object.values(state.questionDetail.answers));
    const usersArr = useSelector(state => state.session.users);
    const user = usersArr.find(user => userId === user.id);

    const generateKey = (id) => {
        return `${id}${Math.random()}`
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetUsers());
        dispatch(thunkGetAllQuestions());
        dispatch(thunkGetAllAnswers());
    }, [dispatch]);

    return (
        <div>
            <Navigation />
            <div className='user-section'>
                {user && (
                    <div className='user-details'>
                        <img src={user.icon} alt="icon" />
                        <div>
                            <h1>{user.username}</h1>
                            <h2>{user.bio}</h2>
                        </div>
                    </div>
                )}
            </div>
            <div className='questions-answers'>
                <div className='questions-section'>
                    {user && (
                        <h3>All of your questions:</h3>
                    )}
                    {questionsArr && questionsArr.map(question => (
                        <div key={generateKey(question.id)}>
                            {question.ownerId === userId && (
                                <div className='questions'>
                                    <h4>- {question.title}</h4>
                                    {question.description && (
                                        <p>Description: {question.description}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className='answers-section'>
                    {user && (
                        <h3>All of your answers: </h3>
                    )}
                    {answersArr && answersArr.map(answer => (
                        <div key={generateKey(answer.id)}>
                            {answer.userId === userId && (
                                <div className='answers'>
                                    <h4>- {answer.body}</h4>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserProfile;
