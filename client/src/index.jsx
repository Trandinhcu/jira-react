import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import App from 'App';
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from './context/app';


if (document.getElementById('root')) {
    ReactDOM.render(
        <React.StrictMode>
            <RecoilRoot>
                <BrowserRouter>
                    <AppProvider>
                        <App />
                    </AppProvider>
                </BrowserRouter>
            </RecoilRoot>
    </React.StrictMode>,
    document.getElementById("root")
    );
}


