import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllReplies, thunkDeleteReply } from '../../store/replies';

const AllReplies = ({ answer }) => {
    const userId = useSelector(state => state.session?.user?.id);
    const replies = useSelector(state => Object.values(state.replies));
    const filteredReplies = replies.filter(reply => reply.answerId === answer.id)

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
                    {reply.userId === userId && (
                        <button onClick={() => dispatch(thunkDeleteReply(reply.id))}>Delete reply</button>
                    )}
                </>
            ))}
        </div>
    )
}

export default AllReplies
