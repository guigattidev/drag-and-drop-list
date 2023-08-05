import renderer from 'react-test-renderer';

import TaskItem from '../../containers/TaskItem';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

jest.mock('../../hooks/useDragDrop', () => () => ({
  drag: jest.fn(),
  drop: jest.fn(),
  backgroundColor: 'white',
}));

describe('TaskItem', () => {
  it('renders correctly', () => {
    const props = {
      idTask: 1,
      content: 'Test Task',
      isDone: false,
      addSubTask: false,
      subtasks: [],
      index: 0,
      moveTodo: jest.fn(),
    };

    const tree = renderer.create(<TaskItem {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
