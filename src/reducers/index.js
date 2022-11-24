import { combineReducers } from 'redux';
import { boxplotdata } from './boxplotData';
import { heatmapplotdata } from './heatmapplotData';
import { scatterplotdata } from './scatterplotData';

const initialState = {
    isFetching: true,
    msg: {
        type: 1,
        content: ''
    }
};

export const actionTypes = {
    FETCH_START: 'FETCH_START',
    FETCH_END: 'FETCH_END',
    SET_MESSAGE: 'SET_MESSAGE'
};

export function reducer(state=initialState, action){
    switch(action.type){
        case actionTypes.FETCH_START:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_END:
            return {
                ...state,
                isFetching: false
            }
        case actionTypes.SET_MESSAGE:
            return {
                ...state,
                isFetching: false,
                msg: {
                    type: action.msgType,
                    content: action.msgContent
                }
            }
        default:
            return state
    }
}

export default combineReducers({
    boxplotdata,
    heatmapplotdata,
    scatterplotdata,
    globalState: reducer
});