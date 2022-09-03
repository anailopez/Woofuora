import { csrfFetch } from "./csrf"

const GET_ALL_REPLIES = 'replies/getAllReplies';
const CREATE_REPLY = 'replies/createReply';


//regular action creator
const actionGetAllReplies = (replies) => {
    return {
        type: GET_ALL_REPLIES,
        replies
    }
}

const actionCreateReply = (reply) => {
    return {
        type: CREATE_REPLY,
        reply
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

export const thunkCreateReply = (reply) => async (dispatch) => {
    const { content, answerId, userId } = reply;
    const response = await csrfFetch('/api/replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content,
            answerId,
            userId
        })
    })

    if (response.ok) {
        const newReply = await response.json();
        dispatch(actionCreateReply(newReply));
        return newReply;
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

        case CREATE_REPLY:
            const createState = { ...state }
            createState[action.reply.id] = action.reply
            return createState;

        default:
            return state;
    }
}

export default repliesReducer
