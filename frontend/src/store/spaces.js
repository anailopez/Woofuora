import { csrfFetch } from "./csrf";

const GET_ALL_SPACES = 'spaces/getAllSpaces';
const CREATE_SPACE = 'spaces/createSpace';
const DELETE_SPACE = 'spaces/deleteSpace';
const EDIT_SPACE = 'spaces/editSpace';

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

const actionDeleteSpace = (spaceId) => {
    return {
        type: DELETE_SPACE,
        spaceId
    }
}

const actionEditSpace = (space) => {
    return {
        type: EDIT_SPACE,
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
    const { ownerId, name, icon, description } = space;
    const response = await csrfFetch('/api/spaces/create', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ownerId,
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

export const thunkDeleteSpace = (spaceId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spaces/${spaceId}/delete`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const id = await response.json();
        dispatch(actionDeleteSpace(id));
        return id;
    } else {
        return await response.json();
    }
}

export const thunkEditSpace = (spaceData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spaces/${spaceData.spaceId}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spaceData)
    });

    if (response.ok) {
        const space = await response.json();
        dispatch(actionEditSpace(space));
        return space;
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
            return createState;

        case DELETE_SPACE:
            const deleteState = { ...state }
            delete deleteState[action.spaceId]
            return deleteState;

        case EDIT_SPACE:
            const editState = { ...state }
            editState[action.space.id] = action.space
            return editState;

        default:
            return state
    }
}

export default spacesReducer
