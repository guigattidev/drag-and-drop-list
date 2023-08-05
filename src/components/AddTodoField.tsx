import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uniqueId } from 'lodash';

import { addTask, addSubtask, toggleAddSubtaskMode } from '../redux/todoSlice';
import { IAddTodoFieldProps } from '../helpers/app.interfaces';

function AddTodoField({ todoType, idTask }: IAddTodoFieldProps) {
  const dispatch = useDispatch();

  const [todoText, setTodoText] = useState('');

  const handleAddTask = () => {
    const uniqueIdValue = uniqueId();

    if (todoText.trim() !== '') {
      const newTask = {
        id: Number(uniqueIdValue) + 4,
        content: todoText,
        isDone: false,
        addSubTask: false,
      };

      dispatch(addTask(newTask));
      setTodoText('');
    }
  };

  const handleAddSubTask = () => {
    if (todoText.trim() !== '') {
      const newSubtask = {
        id: 0,
        content: todoText,
        isDone: false,
      };

      dispatch(addSubtask({ taskId: idTask, subtask: newSubtask }));
      dispatch(toggleAddSubtaskMode(idTask));

      setTodoText('');
    }
  };

  return (
    <>
      <input
        type="text"
        className={`appearance-none border rounded w-full p-2 mr-4 text-grey-darker`}
        placeholder={todoType === 'task' ? 'Add New Task...' : 'Add New SubTask...'}
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button
        type="submit"
        className={`flex-no-shrink p-2 border rounded hover:text-white ${
          todoType === 'task'
            ? 'text-green-500 border-green-500 hover:bg-green-500'
            : 'text-blue-500 border-blue-500 hover:bg-blue-500'
        } `}
        onClick={todoType === 'task' ? handleAddTask : handleAddSubTask}
      >
        Add
      </button>
    </>
  );
}

export default AddTodoField;
