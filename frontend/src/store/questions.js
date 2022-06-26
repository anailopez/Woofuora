import { csrfFetch } from "./csrf";

const GET_ALL_QUESTIONS = 'question/getAllQuestions';
const ADD_QUESTION = 'question/addQuestion';


//regular action creator
export const actionGetAllQuestions = (questions) => {
    return {
        type: GET_ALL_QUESTIONS,
        questions
    };
};

export const actionAddQuestion = (question) => {
    return {
        type: ADD_QUESTION,
        question
    };
};

//thunk action creator
export const thunkGetAllQuestions = () => async (dispatch) => {
    const response = await csrfFetch('/api/questions');

    if (response.ok) {
        const questions = await response.json();
        // console.log('$$$$$', questions)
        //WORKING!!! is an array of objs
        dispatch(actionGetAllQuestions(questions));
        return questions;
    } else {
        return await response.json();
    }
};

export const thunkAddQuestion = (question) => async (dispatch) => {
    const response = await csrfFetch('/api/questions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(question)
    });

    if (response.ok) {
        const newQuestion = await response.json();
        dispatch(actionAddQuestion(newQuestion));
        return newQuestion;
    } else {
        return await response.json();
    }
}

const initialState = {};

//reducer
const questionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_QUESTIONS:
            const allQState = { ...state };
            action.questions.forEach(question => {
                allQState[question.id] = question
            });
            return allQState;
        case ADD_QUESTION:
            const addQState = { ...state };
            addQState[action.question.id] = action.question;
            return addQState;
        // case DELETE:
        //     const newState = { ...state }
        //     delete newState[action.id/*(?)*/]
        //     return newState;
        default:
            return state;
    }
};

export default questionsReducer;
