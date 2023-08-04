import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import { uniqueId } from 'lodash';

import type { RootState } from '../redux/store';
import { setTodo, addTask } from '../redux/todoSlice';
import TaskItem from './TaskItem';

function ToDo() {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const [todoText, setTodoText] = useState('');

  const handleAddTodo = () => {
    const uniqueIdValue = uniqueId();

    if (todoText.trim() !== '') {
      dispatch(
        addTask({
          id: Number(uniqueIdValue),
          content: todoText,
          isDone: false,
        }),
      );
      setTodoText('');
    }
  };

  const moveTodo = (fromIndex: number, toIndex: number) => {
    const updatedTodos = [...todos];

    const [movedTodo] = updatedTodos.splice(fromIndex, 1);

    updatedTodos.splice(toIndex, 0, movedTodo);

    dispatch(setTodo(updatedTodos));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`w-full flex items-center justify-center`}>
        <div className={`bg-white rounded shadow p-4 m-4 w-full max-w-5xl`}>
          <div className={`mb-4`}>
            <h1 className={`text-grey-darkest text-lg font-bold`}>Todo List</h1>
            <div className={`flex mt-4`}>
              <input
                type="text"
                className={`appearance-none border rounded w-full py-2 px-2 mr-4 text-grey-darker`}
                placeholder="Add New Task..."
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
              />
              <button
                className={`flex-no-shrink p-2 border-2 rounded text-green-500 border-green-500 hover:text-white hover:bg-green-500`}
                onClick={handleAddTodo}
              >
                Add
              </button>
            </div>
          </div>

          <div className={`grid divide-y`}>
            {todos.map(({ id, content, isDone, subtasks }, index) => (
              <TaskItem
                key={id}
                idTask={id}
                content={content}
                isDone={isDone}
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
