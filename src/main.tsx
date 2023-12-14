import React from 'react';
import ReactDOM from 'react-dom/client';
import Article from "./components/Article.tsx";
// import App from './components/App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/*<App />*/}
      <Article />
    </React.StrictMode>,
);
