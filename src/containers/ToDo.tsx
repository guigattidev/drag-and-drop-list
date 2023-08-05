import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';

import type { RootState } from '../redux/store';
import TaskItem from './TaskItem';
import SortSelect from '../components/SortSelect';
import AddTodoField from '../components/AddTodoField';
import useMoveTodo from '../hooks/useMoveTodo';

function ToDo() {
  const todos = useSelector((state: RootState) => state.todo.todos);

  const moveTodo = useMoveTodo();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`w-full flex items-center justify-center`}>
        <div className={`bg-white rounded shadow p-4 m-4 w-full max-w-5xl`}>
          <div className={`mb-4`}>
            <h1 className={`text-grey-darkest text-lg font-bold`}>Todo List</h1>
            <div className={`flex mt-4`}>
              <AddTodoField todoType="task" />
            </div>
          </div>

          <div className={`w-full flex pb-4 justify-end items-center`}>
            <SortSelect />
          </div>

          <div className={`grid divide-y`}>
            {todos.map(({ id, content, isDone, addSubTask, subtasks }, index) => (
              <TaskItem
                key={id}
                idTask={id}
                content={content}
                isDone={isDone}
                addSubTask={addSubTask}
                subtasks={subtasks}
                index={index}
                moveTodo={moveTodo}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default ToDo;
