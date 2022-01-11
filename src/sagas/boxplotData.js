import {put, take, call} from 'redux-saga/effects';
import { actionTypes as boxPlotActionTypes  } from '../reducers/boxplotData';
import { actionTypes as IndexActionTypes } from '../reducers/index';
import {get, post} from '../fetch/fetch';

export function *getBoxplotDataFlow(){
    while(true){
        let req = yield take(boxPlotActionTypes.GET_BOXPLOT_DATA);
        let res = yield call(getBoxplotData) //这里转到下面的函数
        yield put({type: boxPlotActionTypes.RESPONSE_GET_BOXPLOT_DATA, data: res.data});
        console.log('getBoxplotData===> ', res.data)
    }
}

export function *getBoxplotData(){
    yield put({type: IndexActionTypes.FETCH_START});
    try{
        return yield call(get, '/getBoxplotData') //这一步应该是api/routes里的路由
    }catch(err){
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0})
        console.log('网络请求错误');
    }finally{
        yield put({type: IndexActionTypes.FETCH_END})
    }
}