import ReactDOM from 'react-dom/client';
import App from './App';
import { createContext } from 'react';
import { Store } from './store/store';

export const Context = createContext();

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <Context.Provider 
    value={
      {
        store: new Store()
      }
    }
  >
    <App />
  </Context.Provider>
);
