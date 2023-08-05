import { useSelector, useDispatch } from 'react-redux';

import type { RootState } from '../redux/store';
import { setTodo } from '../redux/todoSlice';

function useMoveTodo() {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const moveTodo = (fromIndex: number, toIndex: number) => {
    const updatedTodos = [...todos];

    const [movedTodo] = updatedTodos.splice(fromIndex, 1);

    updatedTodos.splice(toIndex, 0, movedTodo);

    dispatch(setTodo(updatedTodos));
  };

  return moveTodo;
}

export default useMoveTodo;
