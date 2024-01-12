import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/App.tsx";
import usersStore from "./store/UsersStore.ts";

usersStore.checkIsUserAuth();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
);
