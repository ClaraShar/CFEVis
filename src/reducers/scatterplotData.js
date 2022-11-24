const initialState = {
    scatterplotData: []
}

export const actionTypes = {
    GET_SCATTERPLOT_DATA: 'GET_SCATTERPLOT_DATA',
    RESPONSE_GET_SCATTERPLOT_DATA: 'RESPONSE_GET_SCATTERPLOT_DATA',
}

export const actions = {
    get_scatterplot_data: function(){
        return{
            type: actionTypes.GET_SCATTERPLOT_DATA
        }
    }
}

export function scatterplotdata(state = initialState, action){
    switch(action.type){
        case actionTypes.RESPONSE_GET_SCATTERPLOT_DATA:
            return {
                ...state,
                scatterplotData: action.data
            }
        default:
            return state
    }
}