import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import ToDo from './containers/ToDo';
import './App.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ToDo />
    </DndProvider>
  );
}

export default App;
