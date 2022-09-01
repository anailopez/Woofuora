import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
                    <Link to={`/spaces/${space.id}`}>
                        <li>{space.name}</li>
                    </Link>
                ))}
            </ul>
        </>
    )
}

export default AllSpaces
