import { useDrag, useDrop } from 'react-dnd';

import { IDragDropProps } from '../helpers/app.interfaces';

function useDragDrop({ idTask, index, moveTodo }: IDragDropProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'TODO',
    item: { idTask, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TODO',
    hover: (item: any) => {
      if (item.index !== index) {
        let itemIndex = item.index;

        moveTodo(itemIndex, index);

        itemIndex = index;
      }
    },
  });

  const backgroundColor = isDragging ? '#F3F4F6' : '#ffffff';

  return { drag, drop, backgroundColor };
}

export default useDragDrop;
