import { useState } from 'react';

//import { useParams } from 'react-router-dom';
//import socket from '../../services/socket'

function Comments() {
  const [comment, setComment] = useState('');

  const addComment = () => {
    console.log({
      comment,
      userId: localStorage.getItem('userId')
    });
    setComment('');
  };

  return (
    <div className='comments__container'>
      <form className='comment__form' onSubmit={addComment}>
        <label htmlFor='comment'>Add a comment</label>
        <textarea
          required
          id='comment'
          name='comment'
          placeholder='Type your comment...'
          rows={5}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button className='commentBtn' type={'button'}>
          ADD COMMENT
        </button>
      </form>

      <div className='comments__section'>
        <h2>Existing Comments</h2>
        <div />
      </div>
    </div>
  );
}

export default Comments;
