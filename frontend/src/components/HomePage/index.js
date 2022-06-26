import { Route, Switch } from 'react-router-dom';
import AllQuestions from '../AllQuestions';
import CreateQuestionForm from '../CreateQuestionForm';


const HomePage = () => {
    return (
        <div>
            <CreateQuestionForm />
            <AllQuestions />
        </div>
    )
}

export default HomePage;
