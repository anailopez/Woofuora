import { csrfFetch } from "./csrf";

const GET_ALL_QUESTIONS = 'question/getAllQuestions';
const ADD_QUESTION = 'question/addQuestion';
const DELETE_QUESTION = 'question/deleteQuestion';
const UPDATE_QUESTION = 'question/updateQuestion';


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

export const actionDeleteQuestion = (questionId) => {
    return {
        type: DELETE_QUESTION,
        questionId
    }
}

export const actionUpdateQuestion = (question) => {
    return {
        type: UPDATE_QUESTION,
        question
    }
}


//thunk action creator
export const thunkGetAllQuestions = () => async (dispatch) => {
    const response = await csrfFetch('/api/questions');

    if (response.ok) {
        const questions = await response.json();
        dispatch(actionGetAllQuestions(questions));
        return questions;
    } else {
        return await response.json();
    }
};

export const thunkAddQuestion = (question) => async (dispatch) => {
    const { ownerId, title, description, image } = question;
    const response = await csrfFetch('/api/questions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ownerId,
            title,
            description,
            image
        })
    });

    if (response.ok) {
        const newQuestion = await response.json();
        dispatch(actionAddQuestion(newQuestion));
        return newQuestion;
    } else {
        return await response.json();
    }
}

export const thunkDeleteQuestion = (questionId) => async (dispatch) => {
    const response = await csrfFetch(`/api/questions/${questionId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const id = await response.json();
        dispatch(actionDeleteQuestion(id));
        return id;
    } else {
        return await response.json();
    }
}

export const thunkUpdateQuestion = (questionData) => async (dispatch) => {
    const response = await csrfFetch(`/api/questions/${questionData.questionId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(questionData)
    });

    if (response.ok) {
        const question = await response.json();
        dispatch(actionUpdateQuestion(question));
        return question;
    } else {
        return await response.json();
    }
}


//initial state
const initialState = { orderedQuestions: [] };

const sortList = (list) => {
    return list.sort((questionA, questionB) => {
        return questionB.updatedAt - questionA.updatedAt
    });
};

//reducer
const questionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_QUESTIONS:
            const allQState = { ...state };
            action.questions.forEach(question => {
                allQState[question.id] = question
            });
            return {
                ...allQState,
                orderedQuestions: sortList(action.questions)
            };

        case ADD_QUESTION:
            const addQState = { ...state };
            addQState[action.question.id] = action.question;
            const list = [...addQState.orderedQuestions];
            list.push(action.question);
            return {
                ...addQState,
                orderedQuestions: sortList(list)
            };

        case DELETE_QUESTION:
            const deleteQState = { ...state };
            delete deleteQState[action.questionId];
            const updatedList = deleteQState.orderedQuestions.filter(question => question.id !== action.questionId);
            return {
                ...deleteQState,
                orderedQuestions: sortList(updatedList)
            }

        case UPDATE_QUESTION:
            const updateQState = { ...state };
            const index = updateQState.orderedQuestions.findIndex(
                (question) => question.id === action.question.id);
            const newList = [...updateQState.orderedQuestions];
            newList[index] = action.question;
            return {
                ...state,
                [action.question.id]: action.question,
                orderedQuestions: sortList(newList)
            };

        default:
            return state;
    }
};

export default questionsReducer;
