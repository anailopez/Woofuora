import { csrfFetch } from "./csrf";

const GET_ALL_ANSWERS = 'answer/getAllAnswers';


//regular action creator
export const actionGetAllAnswers = (answers) => {
    return {
        type: GET_ALL_ANSWERS,
        answers
    }
}


//thunk action creator
export const thunkGetAllAnswers = () => async (dispatch) => {
    const response = await csrfFetch('/api/answers');

    if (response.ok) {
        const answers = await response.json();
        dispatch(actionGetAllAnswers(answers));
        return answers;
    } else {
        return await response.json();
    }
}


//initial state
const initialState = { orderedAnswers: [] };

const sortList = (list) => {
    return list.sort((answerA, answerB) => {
        return answerB.createdAt - answerA.createdAt
    });
};

//reducer
const answersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ANSWERS:
            const allAState = { ...state };
            action.answers.forEach(answer => {
                allAState[answer.id] = answer
            });
            return {
                ...allAState,
                orderedAnswers: sortList(action.answers)
            };
            
        default:
            return state;
    }
}


export default answersReducer;
