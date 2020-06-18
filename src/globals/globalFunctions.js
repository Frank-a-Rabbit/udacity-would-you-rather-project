import {_getUsers, _getQuestions, _saveQuestionAnswer, _saveQuestion} from "./_DATA"
import {addAuthorQuestionHandler, saveAuthorAnswerHandler, processUsersHandler} from "../actions/users"
import {newQuestionHandler, processQuestionsHandler, saveAnswerHandler} from "../actions/questions"

function initData(){
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }));
}

export function setData(){
    return (dispatch) => {
        initData()
            .then(({ users, questions})=> {
                dispatch(processUsersHandler(users));
                dispatch(processQuestionsHandler(questions));
        })
    }
}

export function addNewQuestion(optionOneText, optionTwoText){
    return (dispatch, getState) => {
        const {authedUser} = getState();
        _saveQuestion({
            author : authedUser,
            optionOneText,
            optionTwoText
        })
        .then((question) => {
            console.log("From globals: ", question)
            dispatch(newQuestionHandler(question));
            dispatch(addAuthorQuestionHandler(authedUser, question.id));
        })

    }
}

export function submitAnswer(qid, selected){
    return (dispatch, getState) => {
      const {authedUser} = getState();
      const data = {
        authedUser: authedUser,
        answer: selected,
        qid
      };
      _saveQuestionAnswer(data)
          .then(() => {
              dispatch(saveAnswerHandler(authedUser, qid, selected));
              dispatch(saveAuthorAnswerHandler(authedUser, qid, selected));
          })
    }
}