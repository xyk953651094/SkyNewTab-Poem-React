import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import PopupComponent from "./components/popupComponent";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/iconFont/iconfont.css'
import {ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <ConfigProvider locale={zhCN}>
        <App/>
        {/*<PopupComponent/>*/}
    </ConfigProvider>
    // </React.StrictMode>
);
