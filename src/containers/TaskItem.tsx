import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { ITaskItemProps } from '../helpers/app.interfaces';
import { deleteTask, toggleTaskDone } from '../redux/todoSlice';
import { addSubtask } from '../redux/todoSlice';
import SubTaskItem from './SubTaskItem';

const TaskItem = ({ idTask, content, isDone, subtasks, index, moveTodo }: ITaskItemProps) => {
  const dispatch = useDispatch();

  const [addSubTaskState, setAddSubTaskState] = useState(false);
  const [subTaskText, setSubTaskText] = useState('');

  const [{ isDragging }, drag] = useDrag({
    type: 'TODO',
    item: { idTask, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TODO',
    hover: (item: any) => {
      if (item.index !== index) {
        moveTodo(item.index, index);

        item.index = index;
      }
    },
  });

  const handleSubtaskTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubTaskText(event.target.value);
  };

  const handleSubmit = () => {
    if (subTaskText.trim() !== '') {
      const newSubtask = {
        id: 0,
        content: subTaskText,
        isDone: false,
      };

      dispatch(addSubtask({ taskId: idTask, subtask: newSubtask }));

      setAddSubTaskState(false);
      setSubTaskText('');
    }
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(idTask));
  };

  const handleToggleTaskDone = () => {
    dispatch(toggleTaskDone(idTask));
  };

  const handleAddSubTaskClick = () => {
    setAddSubTaskState(!addSubTaskState);
  };

  const backgroundColor = isDragging ? '#F3F4F6' : '#ffffff';

  return (
    <div style={{ backgroundColor }}>
      <div className={`w-full flex py-3 items-center`}>
        <div ref={(node) => drag(drop(node))}>
          <svg
            className={`h-6 w-6 text-gray-500 hover:text-yellow-500 cursor-pointer`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {' '}
            <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="9" cy="5" r="1" /> <circle cx="9" cy="12" r="1" />{' '}
            <circle cx="9" cy="19" r="1" /> <circle cx="15" cy="5" r="1" /> <circle cx="15" cy="12" r="1" />{' '}
            <circle cx="15" cy="19" r="1" />
          </svg>
        </div>
        <div onClick={handleAddSubTaskClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className={`w-6 h-6 text-gray-500 hover:text-blue-500 hover:fill-blue-100 ${
              addSubTaskState && 'text-blue-600 fill-blue-100'
            } cursor-pointer`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div onClick={handleDeleteTask}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className={`w-6 h-6 text-gray-500 hover:text-red-500 hover:fill-red-100 cursor-pointer`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div onClick={handleToggleTaskDone}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className={`w-6 h-6 text-gray-500 hover:text-green-500 hover:fill-green-100 ${
              isDone && 'text-green-600 fill-green-100'
            } cursor-pointer`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className={`ml-2 text-grey-darkest ${isDone && 'line-through'}`}>
          <span className={`font-bold`}>{`Task ${idTask}: `}</span>
          {content}
        </p>
      </div>

      {subtasks &&
        subtasks.length > 0 &&
        subtasks.map(({ id, content, isDone }, index) => (
          <SubTaskItem key={id} idTask={idTask} idSubTask={id} content={content} isDone={isDone} index={index} />
        ))}

      {addSubTaskState && (
        <div className={`py-3`}>
          <form className={`flex`} onSubmit={handleSubmit}>
            <input
              type="text"
              className={`appearance-none border rounded w-full py-2 px-2 mr-4 text-grey-darker"
                  placeholder="Add New SubTask...`}
              value={subTaskText}
              onChange={handleSubtaskTextChange}
            />
            <button
              type="submit"
              className={`flex-no-shrink p-2 border-2 rounded text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500`}
            >
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
