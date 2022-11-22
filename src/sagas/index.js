import {fork} from 'redux-saga/effects';
import { getHeatMapplotDataFlow } from './heatmapplotData'

export default function* rootSaga(){
    yield fork(getHeatMapplotDataFlow);
}