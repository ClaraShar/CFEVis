import React, {Component} from 'react';
import ReactDom from 'react-dom';
import AppIndex from './components/AppIndex';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { AppContainer } from 'react-hot-loader';

// 热模块替换，和路由有关的暂不修改（renderWithHotReload）
if (module.hot) {
    module.hot.accept();
}

const store = configureStore();

ReactDom.render(
    <AppContainer>
        <Provider store={store}>
            <AppIndex/>
        </Provider>
    </AppContainer>
, document.getElementById('app'));