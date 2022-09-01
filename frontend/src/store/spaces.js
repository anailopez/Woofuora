import { csrfFetch } from "./csrf";

const GET_ALL_SPACES = 'spaces/getAllSpaces';
// const GET_ONE_SPACE = 'spaces/getOneSpace';


//regular action creators
const actionGetAllSpaces = (spaces) => {
    return {
        type: GET_ALL_SPACES,
        spaces
    }
};

// const actionGetOneSpace = (space) => {
//     return {
//         type: GET_ONE_SPACE,
//         space
//     }
// }


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

// export const thunkGetOneSpace = (spaceId) => async (dispatch) => {
//     const response = await csrfFetch(`/api/spaces/${spaceId}`);

//     if (response.ok) {
//         const space = await response.json();
//         dispatch(actionGetOneSpace(space));
//         return space;
//     } else {
//         return await response.json();
//     }
// }


const initialState = {}

const spacesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPACES:
            const allSpaceState = { ...state }
            action.spaces.forEach(space => {
                allSpaceState[space.id] = space
            })
            return allSpaceState;

        // case GET_ONE_SPACE:
        //     const oneSpaceState = { ...state }
        //     oneSpaceState[action.space.id] = action.space
        //     return oneSpaceState;

        default:
            return state
    }
}

export default spacesReducer
