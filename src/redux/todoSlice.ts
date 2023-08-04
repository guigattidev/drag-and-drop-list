import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodoState } from '../helpers/app.interfaces';

const initialState: ITodoState = {
  todos: [
    {
      id: 1,
      content: 'Lorem ipsum dolor sit amet, consectetuer',
      isDone: false,
      subtasks: [
        { id: 1, content: 'Far far away, behind the word', isDone: false },
        { id: 2, content: 'A wonderful serenity has taken possession', isDone: false },
        { id: 3, content: 'One morning, when Gregor Samsa woke', isDone: false },
      ],
    },
    { id: 2, content: 'Sed ut perspiciatis unde omnis iste', isDone: false },
    { id: 3, content: 'Li Europan lingues es membres del', isDone: false },
    { id: 4, content: 'The European languages are members of', isDone: false },
  ],
};

export const counterSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<Task>) => {
      state.todos = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.todos.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((task) => task.id !== action.payload);
    },
    toggleTaskDone: (state, action: PayloadAction<number>) => {
      const task = state.todos.find((task) => task.id === action.payload);

      if (task) {
        task.isDone = !task.isDone;
      }
    },
    addSubtask: (state, action: PayloadAction<{ taskId: number; subtask: Subtask }>) => {
      const task = state.todos.find((task) => task.id === action.payload.taskId);

      if (task) {
        if (!task.subtasks) {
          task.subtasks = [];
        }
        task.subtasks.push(action.payload.subtask);
      }
    },
  },
});

export const { setTodo, deleteTask, addTask, toggleTaskDone } = counterSlice.actions;

export default counterSlice.reducer;
