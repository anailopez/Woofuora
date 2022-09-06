import { csrfFetch } from "./csrf"

const GET_ALL_REPLIES = 'replies/getAllReplies';
const CREATE_REPLY = 'replies/createReply';
const DELETE_REPLY = 'replies/deleteReply';

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

const actionDeleteReply = (replyId) => {
    return {
        type: DELETE_REPLY,
        replyId
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

export const thunkDeleteReply = (replyId) => async (dispatch) => {
    const response = await csrfFetch(`/api/replies/${replyId}/delete`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const id = await response.json();
        dispatch(actionDeleteReply(id));
        return id;
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

        case DELETE_REPLY:
            const deleteState = { ...state }
            delete deleteState[action.replyId]
            return deleteState;

        default:
            return state;
    }
}

export default repliesReducer
