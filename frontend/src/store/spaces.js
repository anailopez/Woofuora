import { csrfFetch } from "./csrf";

const GET_ALL_SPACES = 'spaces/getAllSpaces';
const CREATE_SPACE = 'spaces/createSpace';
const DELETE_SPACE = 'sapces/deleteSpace';


//regular action creators
const actionGetAllSpaces = (spaces) => {
    return {
        type: GET_ALL_SPACES,
        spaces
    }
};

const actionCreateSpace = (space) => {
    return {
        type: CREATE_SPACE,
        space
    }
}


//thunk action creators
export const thunkGetAllSpaces = () => async (dispatch) => {
    const response = await csrfFetch('/api/spaces');

    if (response.ok) {
        const spaces = await response.json();
        dispatch(actionGetAllSpaces(spaces));
        return spaces;
    } else {
        return await response.json();
    }
};

export const thunkCreateSpace = (space) => async (dispatch) => {
    const { name, icon, description } = space;
    const response = await csrfFetch('/api/spaces/create', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            icon,
            description
        })
    });

    if (response.ok) {
        const newSpace = await response.json();
        dispatch(actionCreateSpace(newSpace));
        return newSpace;
    } else {
        return await response.json();
    }
}


const initialState = {}

const spacesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPACES:
            const allSpaceState = { ...state }
            action.spaces.forEach(space => {
                allSpaceState[space.id] = space
            })
            return allSpaceState;

        case CREATE_SPACE:
            const createState = { ...state }
            createState[action.space.id] = action.space
            return createState

        default:
            return state
    }
}

export default spacesReducer
