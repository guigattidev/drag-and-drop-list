import React from 'react';
import { useDispatch } from 'react-redux';

import { orderTodos } from '../redux/todoSlice';

function ToDo() {
  const dispatch = useDispatch();

  const handleOrderChange = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    const todoOrder = event.target.value === 'ascending' ? 'ascending' : 'descending';

    dispatch(orderTodos(todoOrder));
  };

  return (
    <>
      <p className={`ml-2 text-grey-darkest font-bold mr-2`}>Sort:</p>
      <select className={`border rounded p-2 text-grey-darker`} onChange={handleOrderChange}>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
    </>
  );
}

export default ToDo;
