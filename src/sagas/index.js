import {fork} from 'redux-saga/effects';
import { getBoxplotDataFlow } from './boxplotData';
import { getHeatMapplotDataFlow } from './heatmapplotData';
import { getScatterplotDataFlow } from './scatterplotData';

export default function* rootSaga(){
    yield fork(getBoxplotDataFlow);
    yield fork(getHeatMapplotDataFlow);
    yield fork(getScatterplotDataFlow);
}