import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {Action, applyMiddleware, createStore, Reducer} from "redux";
import thunk from "redux-thunk";
import {currentReducer} from "./reducer";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

export interface ItemData {
    id: string
    nameHere: string
}

export interface State {
    position: number
    items: ItemData[]
}

const createStarterStore = (): State => {
    return {
        position: 2,
        items: [
            {id: '1', nameHere: 'the name for the first'},
            {id: '2', nameHere: 'the name for the second'},
            {id: '3', nameHere: 'another one'},
            {id: '4', nameHere: 'fourth one is here'},
            {id: 'last one', nameHere: 'all right, the last one should be this one'}
        ]
    }
}


const initialStore = createStarterStore();

const store = createStore(currentReducer, initialStore, applyMiddleware(thunk))

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
