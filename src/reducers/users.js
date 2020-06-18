import {ADD_AUTHOR_QUESTION, SAVE_AUTHOR_ANSWER, PROCESS_USERS} from "../actions/users"

export default function users (state = {}, action){
  if(action.type === ADD_AUTHOR_QUESTION){
    return {
      ...state,
      [action.authedUser]: {
        ...state[action.authedUser],
        questions: state[action.authedUser].questions.concat([action.qid])
      }
    }
  }else if(action.type === SAVE_AUTHOR_ANSWER){
    return {
      ...state,
      [action.auth]: {
        ...state[action.auth],
        answers: {
          ...state[action.auth].answers,
          [action.qid]: action.option
        }
      }
    }
  }else if(action.type === PROCESS_USERS){
    return {
      ...state,
      ...action.users
    }
  }else{
    return state
  }
}