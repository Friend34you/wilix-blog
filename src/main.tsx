import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from "./components/router/AppRouter.tsx";
// import App from './components/App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AppRouter />
        {/*<App />*/}
    </React.StrictMode>,
);
