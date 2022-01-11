const initialState = {
    boxplotData: []
}

export const actionTypes = {
    GET_BOXPLOT_DATA: 'GET_BOXPLOT_DATA',
    RESPONSE_GET_BOXPLOT_DATA: 'RESPONSE_GET_BOXPLOT_DATA',
}

export const actions = {
    get_boxplot_data: function(){
        return{
            type: actionTypes.GET_BOXPLOT_DATA
        }
    }
}

export function boxplotdata(state = initialState, action){
    switch(action.type){
        case actionTypes.RESPONSE_GET_BOXPLOT_DATA:
            return {
                ...state,
                boxplotData: action.data
            }
        default:
            return state
    }
}