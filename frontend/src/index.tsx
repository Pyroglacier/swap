import React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'reflect-metadata';

import './index.css';
import { store } from './middlewares/store';
import { App } from './modules/app';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <DndProvider
                backend={
                    'ontouchstart' in document.documentElement
                        ? TouchBackend
                        : HTML5Backend
                }
            >
                <App />
            </DndProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
