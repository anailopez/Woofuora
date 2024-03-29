import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import questionsReducer from './questions';
import answersReducer from './answers';
import spacesReducer from './spaces';
import repliesReducer from './replies';

const rootReducer = combineReducers({
    session: sessionReducer,
    questionDetail: combineReducers({
        questionsReducer,
        answers: answersReducer
    }),
    allQuestions: questionsReducer,
    spaces: spacesReducer,
    replies: repliesReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
