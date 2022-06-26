import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import AllQuestions from '../AllQuestions';


const HomePage = () => {
    return (
        <div>
            <AllQuestions />
        </div>
    )
}

export default HomePage;
