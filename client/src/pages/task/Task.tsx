import { io } from 'socket.io-client';

import AddTask from './AddTask';
import TasksContainer from './TasksContainer';
/*
👇🏻  Pass Socket.io into the required components
    where communications are made with the server
*/

const API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;
const socket = io(API_URL).connect();

function Task() {
  return (
    <div>
      <AddTask socket={socket} />
      <TasksContainer socket={socket} />
    </div>
  );
}

export default Task;
