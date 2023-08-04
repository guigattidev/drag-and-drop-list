export interface ITaskItemProps {
  idTask: number;
  content?: string;
  isDone: boolean;
  subtasks?: any[];
  index: number;
  moveTodo?: () => void | any;
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
  subtasks?: ISubtask[];
}

export interface ITodoState {
  todos: ITask[];
  order: 'ascending' | 'descending';
}
