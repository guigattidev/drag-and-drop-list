import renderer from 'react-test-renderer';

import SubTaskItem from '../../containers/SubTaskItem';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

describe('SubTaskItem', () => {
  it('renders correctly', () => {
    const props = {
      idTask: 1,
      idSubTask: 1,
      content: 'Test Subtask',
      isDone: false,
    };

    const tree = renderer.create(<SubTaskItem {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
