import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from "./components/router/AppRouter.tsx";
import usersStore from "./store/usersStore.ts";
import {injectStores} from "@mobx-devtools/tools";
// import App from './components/App.tsx';

injectStores({usersStore});

usersStore
  .fetchUser()
  .catch(() => console.log("unauthorized"))
  .finally(() => console.log("fetchingEnd"));

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AppRouter />
        {/*<App />*/}
    </React.StrictMode>,
);
