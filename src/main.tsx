import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from "./components/router/AppRouter.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>,
);
