import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import App from './App.tsx';

const container = document.getElementById('root')!;
const root = createRoot(container);

const strictMode = import.meta.env.NODE_ENV !== 'production';

root.render(
  (strictMode && (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )) || (
    <Provider store={store}>
      <App />
    </Provider>
  ),
);
