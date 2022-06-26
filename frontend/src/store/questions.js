import { csrfFetch } from "./csrf";

const GET_ALL_QUESTIONS = 'question/getAllQuestions';

// const questions = [
//     { id: 1, ownerId: '3', title: "What do y'all like better: Greenies or Dentastix?", description: "My human is convinced she needs to buy me some of those teeth-cleaning treats (even though I brush my teeth aaaall the time) and she wants me to choose which ones I'd like. Any suggestions?", createdAt: new Date(), updatedAt: new Date() }
// ]
// console.log(questions)

//regular action creator
export const actionGetAllQuestions = (questions) => {
    return {
        type: GET_ALL_QUESTIONS,
        questions
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
        // case DELETE:
        //     const newState = { ...state }
        //     delete newState[action.id/*(?)*/]
        //     return newState;
        default:
            return state;
    }
};

export default questionsReducer;
