import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleWare from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleWare();
const middlewares = [];

// let storeEnhancers = compose(
//     applyMiddleware(...middlewares, sagaMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState={}){
    const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunkMiddleware,sagaMiddleware)))
    sagaMiddleware.run(rootSaga);
    // if(module.hot){
    //     module.hot.accept('./reducers', () => {
    //         const nextRootReducer = require('./reducers/index');
    //         store.replaceReducer(nextRootReducer);
    //     });
    // };
    return store;
}