import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AddTask({}) {
  const [task, setTask] = useState('');

  const handleAddTodo = () => {
    //👇🏻 Logs the task to the console
    console.log({ task });
    setTask('');
  };
  return (
    <form className='form__input' onSubmit={handleAddTodo}>
      <label htmlFor='task'>Add Todo</label>
      <input
        required
        className='input'
        id='task'
        name='task'
        type='text'
        value={task}
        onChange={e => setTask(e.target.value)}
      />
      <button className='addTodoBtn' type='button'>
        ADD TODO
      </button>
    </form>
  );
}

export default AddTask;
