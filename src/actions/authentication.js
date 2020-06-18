export const SET_CURRENT_USER = "SET_CURRENT_USER"
export const UNSET_CURRENT_USER = "UNSET_CURRENT_USER"

export function setCurrentUser(id){
  return {
    type: SET_CURRENT_USER,
    id
  };
}

export function unsetCurrentUser(){
  return {
    type: UNSET_CURRENT_USER
  };
}