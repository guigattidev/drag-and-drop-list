import { useSelector } from 'react-redux';

jest.mock('react-redux');

describe('ToDo', () => {
  test('uses useSelector hook', () => {
    const mockTodos = {
      todo: {
        todos: [
          { id: 1, content: 'Task 1', isDone: false, addSubTask: false, subtasks: [] },
          { id: 2, content: 'Task 2', isDone: true, addSubTask: false, subtasks: [] },
        ],
      },
    };

    (useSelector as jest.Mock).mockReturnValue(mockTodos);

    const todos = useSelector((state: any) => state.todo.todos);
    expect(todos).toEqual(mockTodos);
  });
});
