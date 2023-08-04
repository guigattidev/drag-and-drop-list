import { useDispatch } from 'react-redux';

import { deleteSubtask, toggleSubtaskDone } from '../redux/todoSlice';
import { ISubTaskItemProps } from '../helpers/app.interfaces';

const SubTaskItem = ({ idTask, idSubTask, content, isDone }: ISubTaskItemProps) => {
  const dispatch = useDispatch();

  const handleDeleteSubtask = () => {
    dispatch(deleteSubtask({ taskId: idTask, subtaskId: idSubTask }));
  };

  const handleToggleSubtaskDone = () => {
    dispatch(toggleSubtaskDone({ taskId: idTask, subtaskId: idSubTask }));
  };

  return (
    <div className={`w-full flex py-3 items-center`}>
      <div onClick={handleDeleteSubtask}>
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
      <div onClick={handleToggleSubtaskDone}>
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
        <span className={`font-bold`}>{`Subtask ${idTask}.${idSubTask}: `}</span>
        {content}
      </p>
    </div>
  );
};

export default SubTaskItem;
