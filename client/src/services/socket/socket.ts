import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SERVER_BASE_API_URL, {
  withCredentials: true
});

export default socket;
