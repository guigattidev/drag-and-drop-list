import { useDispatch } from 'react-redux';

import { deleteSubtask, toggleSubtaskDone } from '../redux/todoSlice';
import { ISubTaskItemProps } from '../helpers/app.interfaces';
import DeleteIcon from '../components/DeleteIcon';
import DoneIcon from '../components/DoneIcon';

const SubTaskItem = ({ idTask, idSubTask, content, isDone }: ISubTaskItemProps) => {
  const dispatch = useDispatch();

  const handleDeleteSubtaskClick = () => {
    dispatch(deleteSubtask({ taskId: idTask, subtaskId: idSubTask }));
  };

  const handleToggleSubtaskDoneClick = () => {
    dispatch(toggleSubtaskDone({ taskId: idTask, subtaskId: idSubTask }));
  };

  return (
    <div className={`w-full flex py-3 items-center`}>
      <div onClick={handleDeleteSubtaskClick}>
        <DeleteIcon />
      </div>
      <div onClick={handleToggleSubtaskDoneClick}>
        <DoneIcon isDone={isDone} />
      </div>
      <p className={`ml-2 text-grey-darkest ${isDone && 'line-through'}`}>
        <span className={`font-bold`}>{`Subtask ${idTask}.${idSubTask}: `}</span>
        {content}
      </p>
    </div>
  );
};

export default SubTaskItem;
