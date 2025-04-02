import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { BrowserRouter } from 'react-router';
import { TanStackProvider } from './plugins/TanStackProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanStackProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </TanStackProvider>
  </StrictMode>
);
