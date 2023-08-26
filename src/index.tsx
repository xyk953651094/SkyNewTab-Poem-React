import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import PopupComponent from "./components/popupComponent";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/iconFont/iconfont.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <App/>
    // <PopupComponent/>
    // </React.StrictMode>
);
