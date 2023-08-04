import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import { uniqueId } from 'lodash';

import type { RootState } from '../redux/store';
import { orderTodos, setTodo, addTask } from '../redux/todoSlice';
import TaskItem from './TaskItem';

function ToDo() {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const order = useSelector((state: RootState) => state.todo.order);
  const dispatch = useDispatch();

  // const [todoOrder, setTodoOrder] = useState('ascending');
  const [taskText, setTaskText] = useState('');

  const moveTodo = (fromIndex: number, toIndex: number) => {
    const updatedTodos = [...todos];

    const [movedTodo] = updatedTodos.splice(fromIndex, 1);

    updatedTodos.splice(toIndex, 0, movedTodo);

    dispatch(setTodo(updatedTodos));
  };

  const handleOrderChange = () => {
    const todoOrder = order === 'ascending' ? 'descending' : 'ascending';

    dispatch(orderTodos(todoOrder));
  };

  const handleAddTask = () => {
    const uniqueIdValue = uniqueId();

    if (taskText.trim() !== '') {
      dispatch(
        addTask({
          id: Number(uniqueIdValue) + 4,
          content: taskText,
          isDone: false,
        }),
      );
      setTaskText('');
    }
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
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
              />
              <button
                type="submit"
                className={`flex-no-shrink p-2 border-2 rounded text-green-500 border-green-500 hover:text-white hover:bg-green-500`}
                onClick={handleAddTask}
              >
                Add
              </button>
            </div>
          </div>

          <div className={`w-full flex pb-4 justify-end`}>
            <p className={`ml-2 text-grey-darkest font-bold`}>
              Sort: <span className={`font-normal`}>Asc</span>
            </p>
            <label htmlFor="countries" className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}>
              Select an option
            </label>
            <select
              id="countries"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            >
              <option selected>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
            <div className={`ml-2`} onClick={handleOrderChange}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className={`w-6 h-6 text-gray-500 hover:text-yellow-500 cursor-pointer`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
                />
              </svg>
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
