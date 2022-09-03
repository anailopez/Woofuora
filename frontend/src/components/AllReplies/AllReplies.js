import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllReplies } from '../../store/replies';

const AllReplies = ({ answer }) => {
    const replies = useSelector(state => Object.values(state.replies));
    const filteredReplies = replies.filter(reply => reply.answerId === answer.id)
    // console.log("**FILTERED", replies)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllReplies());
    }, [dispatch]);

    return (
        <div className='all-replies'>
            {replies && filteredReplies.map(reply => (
                <>
                    <img src={reply.User?.icon} alt='user icon'></img>
                    <h5>{reply.User?.username}</h5>
                    <p>{reply.content}</p>
                </>
            ))}
        </div>
    )
}

export default AllReplies
