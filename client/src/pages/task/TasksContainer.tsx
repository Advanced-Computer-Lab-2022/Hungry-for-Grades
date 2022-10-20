import { Link } from 'react-router-dom';
import { Socket } from 'socket.io-client';
type Props = {
  socket: typeof Socket;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TasksContainer({ socket }: Props) {
  return (
    <div className='container'>
      <div className='pending__wrapper'>
        <h3>Pending Tasks</h3>
        <div className='pending__container'>
          <div className='pending__items'>
            <p>Debug the Notification center</p>
            <p className='comment'>
              <Link to='/comments'>2 Comments</Link>
            </p>
          </div>
        </div>
      </div>

      <div className='ongoing__wrapper'>
        <h3>Ongoing Tasks</h3>
        <div className='ongoing__container'>
          <div className='ongoing__items'>
            <p>Create designs for Novu</p>
            <p className='comment'>
              <Link to='/comments'>Add Comment</Link>
            </p>
          </div>
        </div>
      </div>

      <div className='completed__wrapper'>
        <h3>Completed Tasks</h3>
        <div className='completed__container'>
          <div className='completed__items'>
            <p>Debug the Notification center</p>
            <p className='comment'>
              <Link to='/comments'>2 Comments</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TasksContainer;
