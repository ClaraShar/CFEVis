import {put, take, call} from 'redux-saga/effects';
import { actionTypes as scatterPlotActionTypes  } from '../reducers/scatterplotData';
import { actionTypes as IndexActionTypes } from '../reducers/index';
import {get, post} from '../fetch/fetch';

export function *getScatterplotDataFlow(){
    while(true){
        let req = yield take(scatterPlotActionTypes.GET_SCATTERPLOT_DATA);
        let res = yield call(getScatterplotData) //这里转到下面的函数
        yield put({type: scatterPlotActionTypes.RESPONSE_GET_SCATTERPLOT_DATA, data: res.data});
        console.log('getScatterplotData===> ', res.data)
    }
}

export function *getScatterplotData(){
    yield put({type: IndexActionTypes.FETCH_START});
    try{
        return yield call(get, '/getScatterplotData') //这一步应该是api/routes里的路由
    }catch(err){
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0})
        console.log('网络请求错误');
    }finally{
        yield put({type: IndexActionTypes.FETCH_END})
    }
}