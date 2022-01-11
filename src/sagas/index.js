import {fork} from 'redux-saga/effects';
import { getBoxplotDataFlow } from './boxplotData';

export default function* rootSaga(){
    yield fork(getBoxplotDataFlow);
}