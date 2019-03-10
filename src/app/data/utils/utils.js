export function appendItemsNewdata(state, action){
    if(typeof state.response !== 'undefined'){
        var appendedMoredata = state.response.data.concat(action.payload.response.data);
        action.payload.response.data = appendedMoredata
        return action.payload;
    }else{
        return action.payload
    }
}