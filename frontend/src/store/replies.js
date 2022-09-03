import { csrfFetch } from "./csrf"

const GET_ALL_REPLIES = 'replies/getAllReplies'


//regular action creator
const actionGetAllReplies = (replies) => {
    return {
        type: GET_ALL_REPLIES,
        replies
    }
}


//thunk action creators
export const thunkGetAllReplies = () => async (dispatch) => {
    const response = await csrfFetch('/api/replies');

    if (response.ok) {
        const replies = await response.json();
        dispatch(actionGetAllReplies(replies));
        return replies
    } else {
        return await response.json();
    }
}


const initialState = {}

const repliesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REPLIES:
            const getAllState = { ...state }
            action.replies.forEach(reply => {
                getAllState[reply.id] = reply
            });
            return getAllState;

        default:
            return state;
    }
}

export default repliesReducer
