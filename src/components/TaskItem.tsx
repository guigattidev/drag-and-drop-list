import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { ITaskItemProps } from '../helpers/app.interfaces';
import { deleteTask, toggleTaskDone } from '../redux/todoSlice';
import SubTaskItem from './SubTaskItem';

const TaskItem = ({ idTask, content, isDone, subtasks, index, moveTodo }: ITaskItemProps) => {
  const dispatch = useDispatch();

  const [addSubTask, setAddSubTask] = useState(false);

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

  const handleDeleteTask = () => {
    dispatch(deleteTask(idTask));
  };

  const handleToggleTaskDone = () => {
    dispatch(toggleTaskDone(idTask));
  };

  const handleAddSubTaskClick = () => {
    setAddSubTask(!addSubTask);
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
              addSubTask && 'text-blue-500 fill-blue-100'
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
              isDone && 'text-green-500 fill-green-100'
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
        subtasks.map(({ id, content }, index) => (
          <SubTaskItem key={id} idTask={idTask} idSubTask={id} content={content} index={index} />
        ))}

      {addSubTask && (
        <div className={`py-3`}>
          <div className={`flex`}>
            <input
              className={`appearance-none border rounded w-full py-2 px-2 mr-4 text-grey-darker"
                  placeholder="Add New SubTask...`}
            />
            <button
              className={`flex-no-shrink p-2 border-2 rounded text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500`}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
