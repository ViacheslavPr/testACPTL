import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import './index.css';
import App from './screens/App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './store/reducers/rootReducer';
import { sagaWatcher } from './store/saga/sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
)

const root = createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
);

sagaMiddleware.run(sagaWatcher);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

