import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import thunk from 'redux-thunk';
import { thunkGetAllSpaces } from '../../store/spaces';

const AllSpaces = () => {
    const spaces = useSelector(state => Object.values(state.spaces))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllSpaces())
    }, [dispatch])

    return (
        <>
            <ul>
                {spaces && spaces.map(space => (
                    <li>{space.name}</li>
                ))}
            </ul>
        </>
    )
}

export default AllSpaces
