import { useDispatch } from 'react-redux';

import { ITaskItemProps } from '../helpers/app.interfaces';
import { toggleAddSubtaskMode, deleteTask, toggleTaskDone } from '../redux/todoSlice';
import SubTaskItem from './SubTaskItem';
import AddTodoField from '../components/AddTodoField';
import DragIcon from '../components/DragIcon';
import AddIcon from '../components/AddIcon';
import DeleteIcon from '../components/DeleteIcon';
import DoneIcon from '../components/DoneIcon';
import useDragDrop from '../hooks/useDragDrop';

const TaskItem = ({ idTask, content, isDone, addSubTask, subtasks, index, moveTodo }: ITaskItemProps) => {
  const dispatch = useDispatch();

  const { drag, drop, backgroundColor } = useDragDrop({ idTask, index, moveTodo });

  const handleDeleteTaskClick = () => {
    dispatch(deleteTask(idTask));
  };

  const handleToggleTaskDoneClick = () => {
    dispatch(toggleTaskDone(idTask));
  };

  const handleAddSubTaskClick = () => {
    dispatch(toggleAddSubtaskMode(idTask));
  };

  return (
    <div style={{ backgroundColor }}>
      <div className={`w-full flex py-4 items-center`}>
        <div ref={(node) => drag(drop(node))}>
          <DragIcon />
        </div>
        <div onClick={handleAddSubTaskClick}>
          <AddIcon addSubTask={addSubTask} />
        </div>
        <div onClick={handleDeleteTaskClick}>
          <DeleteIcon />
        </div>
        <div onClick={handleToggleTaskDoneClick}>
          <DoneIcon isDone={isDone} />
        </div>
        <p className={`ml-2 text-grey-darkest ${isDone && 'line-through'}`}>
          <span className={`font-bold`}>{`Task ${idTask}: `}</span>
          {content}
        </p>
      </div>
      {subtasks &&
        subtasks.length > 0 &&
        subtasks.map(({ id, content, isDone }) => (
          <SubTaskItem key={id} idTask={idTask} idSubTask={id} content={content} isDone={isDone} />
        ))}

      {addSubTask && (
        <div className={`py-3`}>
          <div className={`flex`}>
            <AddTodoField todoType="subtask" idTask={idTask} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
