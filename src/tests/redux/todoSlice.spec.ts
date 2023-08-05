import { configureStore } from '@reduxjs/toolkit';

import reducer, {
  addTask,
  deleteTask,
  toggleTaskDone,
  toggleAddSubtaskMode,
  addSubtask,
  deleteSubtask,
  toggleSubtaskDone,
  orderTodos,
  initialState,
} from '../../redux/todoSlice';
import { ISubtask, ITask } from '../../helpers/app.interfaces';

describe('todoSlice reducers', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({ reducer });
  });

  test('addTask should add a new task to the state', () => {
    const newTask = { id: 5, content: 'New Task', isDone: false, addSubTask: false };

    store.dispatch(addTask(newTask));

    expect(store.getState().todos).toHaveLength(initialState.todos.length + 1);
  });

  test('deleteTask should remove a task from the state', () => {
    const taskIdToDelete = 2;

    store.dispatch(deleteTask(taskIdToDelete));

    expect(store.getState().todos).toHaveLength(initialState.todos.length - 1);
    expect(store.getState().todos.some((task: ITask) => task.id === taskIdToDelete)).toBe(false);
  });

  test('toggleTaskDone should toggle the isDone status of a task', () => {
    const taskIdToToggle = 1;

    const initialStateOfTask = store.getState().todos.find((task: ITask) => task.id === taskIdToToggle);

    store.dispatch(toggleTaskDone(taskIdToToggle));

    const finalStateOfTask = store.getState().todos.find((task: ITask) => task.id === taskIdToToggle);

    expect(finalStateOfTask.isDone).toBe(!initialStateOfTask.isDone);
  });

  test('toggleAddSubtaskMode should toggle the addSubTask mode of a task', () => {
    const taskIdToToggle = 1;

    const initialStateOfTask = store.getState().todos.find((task: ITask) => task.id === taskIdToToggle);

    store.dispatch(toggleAddSubtaskMode(taskIdToToggle));

    const finalStateOfTask = store.getState().todos.find((task: ITask) => task.id === taskIdToToggle);

    expect(finalStateOfTask.addSubTask).toBe(!initialStateOfTask.addSubTask);
  });

  test('addSubtask should add a new subtask to the state', () => {
    const taskIdToAddSubtask = 1;
    const newSubtask = { id: 4, content: 'New Subtask', isDone: false };

    store.dispatch(addSubtask({ taskId: taskIdToAddSubtask, subtask: newSubtask }));

    const taskWithSubtasks = store.getState().todos.find((task: ITask) => task.id === taskIdToAddSubtask);

    expect(taskWithSubtasks.subtasks).toHaveLength(4);
  });

  test('deleteSubtask should remove a subtask from the state', () => {
    const taskIdToDeleteSubtask = 1;
    const subtaskIdToDelete = 2;

    store.dispatch(deleteSubtask({ taskId: taskIdToDeleteSubtask, subtaskId: subtaskIdToDelete }));

    const taskWithSubtasks = store.getState().todos.find((task: ITask) => task.id === taskIdToDeleteSubtask);

    expect(taskWithSubtasks.subtasks).toHaveLength(2);
    expect(taskWithSubtasks.subtasks.some((subtask: ISubtask) => subtask.id === subtaskIdToDelete)).toBe(true);
  });

  test('toggleSubtaskDone should toggle the isDone status of a subtask', () => {
    const taskIdToToggleSubtask = 1;
    const subtaskIdToToggle = 1;
    const initialStateOfSubtask = store
      .getState()
      .todos.find((task: ITask) => task.id === taskIdToToggleSubtask)
      .subtasks.find((subtask: ISubtask) => subtask.id === subtaskIdToToggle);

    store.dispatch(toggleSubtaskDone({ taskId: taskIdToToggleSubtask, subtaskId: subtaskIdToToggle }));

    const finalStateOfSubtask = store
      .getState()
      .todos.find((task: ITask) => task.id === taskIdToToggleSubtask)
      .subtasks.find((subtask: ISubtask) => subtask.id === subtaskIdToToggle);

    expect(finalStateOfSubtask.isDone).toBe(!initialStateOfSubtask.isDone);
  });

  test('orderTodos should sort the todos array in ascending order', () => {
    store.dispatch(orderTodos('ascending'));

    const todos = store.getState().todos;

    expect(todos.map((task: ITask) => task.id)).toEqual([1, 2, 3, 4]);
  });

  test('orderTodos should sort the todos array in descending order', () => {
    store.dispatch(orderTodos('descending'));

    const todos = store.getState().todos;

    expect(todos.map((task: ITask) => task.id)).toEqual([4, 3, 2, 1]);
  });
});
