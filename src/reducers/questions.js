import {NEW_QUESTION, PROCESS_QUESTIONS, SAVE_ANSWER} from "../actions/questions"

export default function questions(state = {}, action){
  if(action.type === PROCESS_QUESTIONS){
    return {
      ...state,
      ...action.questions
    };
  }else if(action.type === NEW_QUESTION){
    const {question} = action;
    return {
      ...state,
      [question.id]: question,
    };
  }else if(action.type === SAVE_ANSWER){
    const {authedUser, qid, answer} = action;
    return {
      ...state,
      [qid]: {
        ...state[qid],
        [answer]: {
          ...state[qid][answer],
          votes: state[qid][answer].votes.concat([authedUser])
        }
      }
    };
  }else{
    return state;
  }
}