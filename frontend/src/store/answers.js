import { csrfFetch } from "./csrf";

const GET_ALL_ANSWERS = 'answer/getAllAnswers';
const ADD_ANSWER = 'answer/addAnswer';
const DELETE_ANSWER = 'answer/deleteAnswer';
const UPDATE_ANSWER = 'answer/updateAnswer';


//regular action creator
const actionGetAllAnswers = (answers) => {
    return {
        type: GET_ALL_ANSWERS,
        answers
    }
}

const actionAddAnswer = (answer) => {
    return {
        type: ADD_ANSWER,
        answer
    }
}

const actionDeleteAnswer = (answerId) => {
    return {
        type: DELETE_ANSWER,
        answerId
    }
}

const actionUpdateAnswer = (answer) => {
    return {
        type: UPDATE_ANSWER,
        answer
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

export const thunkAddAnswer = (answer) => async (dispatch) => {
    const { userId, questionId, body, image } = answer;
    const response = await csrfFetch('/api/answers', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            questionId,
            body,
            image
        })
    });

    if (response.ok) {
        const newAnswer = await response.json();
        dispatch(actionAddAnswer(newAnswer));
        return newAnswer;
    } else {
        return await response.json();
    }
}

export const thunkDeleteAnswer = (answerId) => async (dispatch) => {
    const response = await csrfFetch(`/api/answers/${answerId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const id = await response.json();
        dispatch(actionDeleteAnswer(id));
        return id;
    } else {
        return await response.json();
    }
}

export const thunkUpdateAnswer = (answerData) => async (dispatch) => {
    const response = await csrfFetch(`/api/answers/${answerData.answerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answerData)
    })

    if (response.ok) {
        const answer = await response.json();
        dispatch(actionUpdateAnswer(answer));
        return answer;
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

        case ADD_ANSWER:
            const addAState = { ...state };
            addAState[action.answer.id] = action.answer;
            const list = [...addAState.orderedAnswers];
            list.push(action.answer);
            return {
                ...addAState,
                orderedAnswers: sortList(list)
            };

        case DELETE_ANSWER:
            const deleteAState = { ...state };
            delete deleteAState[action.answerId];
            const updatedList = deleteAState.orderedAnswers.filter(answer => answer.id !== action.answerId);
            return {
                ...deleteAState,
                orderedAnswers: sortList(updatedList)
            }

        case UPDATE_ANSWER:
            const updateState = { ...state };
            updateState[action.answer.id] = action.answer;
            return updateState;

        default:
            return state;
    }
}


export default answersReducer;
