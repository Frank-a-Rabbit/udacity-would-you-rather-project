export const ADD_AUTHOR_QUESTION = "ADD_AUTHOR_QUESTION"
export const SAVE_AUTHOR_ANSWER = "SAVE_AUTHOR_ANSWER"
export const PROCESS_USERS = "PROCESS_USERS"

export function addAuthorQuestionHandler(authedUser, qid){
    return {
      type: ADD_AUTHOR_QUESTION,
      authedUser,
      qid
    }
  }

export function saveAuthorAnswerHandler(auth, qid, option){
  return {
    type: SAVE_AUTHOR_ANSWER,
    auth,
    qid,
    option
  }
}

export function processUsersHandler(users){
  return{
      type: PROCESS_USERS,
      users
  }
}