export interface ITaskItemProps {
  idTask: number;
  content?: string;
  isDone: boolean;
  addSubTask: boolean;
  subtasks?: any[];
  index?: number;
  moveTodo?: ((itemIndex: number | any, index: number) => void) | any;
}

export interface ISubTaskItemProps {
  idTask: number;
  idSubTask: number;
  content?: string;
  isDone: boolean;
  index?: number;
}

export interface ISubtask {
  id: number;
  content: string;
  isDone: boolean;
}

export interface ITask {
  id: number;
  content: string;
  isDone: boolean;
  addSubTask: boolean;
  subtasks?: ISubtask[];
}

export interface ITodoState {
  todos: ITask[];
  order: 'ascending' | 'descending';
}

export interface IAddTodoFieldProps {
  todoType: 'task' | 'subtask';
  idTask?: number | any;
}

export interface IAddIconProps {
  addSubTask: boolean;
}
export interface IDoneIconProps {
  isDone: boolean;
}
export interface IDragDropProps {
  idTask: number;
  index?: number;
  moveTodo: ((itemIndex: number | any, index: number) => void) | any;
}
