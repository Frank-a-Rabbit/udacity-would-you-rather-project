import {SET_CURRENT_USER, UNSET_CURRENT_USER} from '../actions/authentication'

export default function authenticate(state = null, action){
    if(action.type === SET_CURRENT_USER){
        return action.id;
    }else if(action.type === UNSET_CURRENT_USER){
        return null;
    }else{
        return state;
    }
}