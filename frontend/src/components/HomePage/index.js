import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AllQuestions from '../AllQuestions';
import CreateQuestionForm from '../CreateQuestionForm';


const HomePage = () => {
    const user = useSelector(state => state.session.user);

    return (
        <div>
            {user ? (
                <>
                    <CreateQuestionForm />
                    <AllQuestions />
                </>
            ) : (
                <Redirect to='/login' />
            )}
        </div>
    )
}

export default HomePage;
