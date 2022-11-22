const initialState = {
    heatmapplotData: []
}

export const actionTypes = {
    GET_HEATMAPPLOT_DATA: 'GET_HEATMAPPLOT_DATA',
    RESPONSE_GET_HEATMAPPLOT_DATA: 'RESPONSE_GET_HEATMAPPLOT_DATA',
}

export const actions = {
    get_heatmapplot_data: function(){
        return{
            type: actionTypes.GET_HEATMAPPLOT_DATA
        }
    }
}

export function heatmapplotdata(state = initialState, action){
    switch(action.type){
        case actionTypes.RESPONSE_GET_HEATMAPPLOT_DATA:
            return {
                ...state,
                heatmapplotData: action.data
            }
        default:
            return state
    }
}