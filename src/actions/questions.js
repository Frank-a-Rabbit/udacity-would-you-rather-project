export const PROCESS_QUESTIONS = "PROCESS_QUESTIONS";
export const NEW_QUESTION = "NEW_QUESTION";
export const SAVE_ANSWER = "SAVE_ANSWER";

export function newQuestionHandler(question){
  return {
    type: NEW_QUESTION,
    question
  }
}

export function processQuestionsHandler(questions){
  return{
    type: PROCESS_QUESTIONS,
    questions
  }
}

export function saveAnswerHandler(authedUser, qid, answer) {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer
  }
}