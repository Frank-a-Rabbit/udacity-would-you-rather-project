import questions from "./questions"
import authedUser from "./authentication"
import users from "./users"
import {combineReducers} from "redux"

export default combineReducers({
  questions,
  authedUser,
  users
})