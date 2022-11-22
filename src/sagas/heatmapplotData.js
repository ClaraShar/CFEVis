import {put, take, call} from 'redux-saga/effects';
import { actionTypes as heatmapPlotActionTypes  } from '../reducers/heatmapplotData';
import { actionTypes as IndexActionTypes } from '../reducers/index';
import {get, post} from '../fetch/fetch';

export function *getHeatMapplotDataFlow(){
    while(true){
        let req = yield take(heatmapPlotActionTypes.GET_HEATMAPPLOT_DATA);
        let res = yield call(getHeatmapplotData) //这里转到下面的函数
        yield put({type: heatmapPlotActionTypes.RESPONSE_GET_HEATMAPPLOT_DATA, data: res.data});
        console.log('getHeatMapplotData===> ', res.data)
    }
}

export function *getHeatmapplotData(){
    yield put({type: IndexActionTypes.FETCH_START});
    try{
        return yield call(get, '/getHeatmapplotData') //这一步应该是api/routes里的路由
    }catch(err){
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0})
        console.log('网络请求错误');
    }finally{
        yield put({type: IndexActionTypes.FETCH_END})
    }
}