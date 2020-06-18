import React, {Fragment} from "react"
import {Switch, Route} from "react-router-dom"
import PropTypes from "prop-types"
import HomePage from "./HomePage"
import LeaderBoard from "./LeaderBoard"
import Login from "./Login"
import Logout from "./Logout"
import AddQuestion from "./AddQuestion"
import QuestionDetails from "./QuestionDetails"
import PageNotAvailable from "./PageNotAvailable"

function Routes(props){
  return (
    <Switch>
      {
        props.currentUserNotSet ? <Route path="/" exact component={Login}/> :
          <Fragment>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/leaderboard" component={LeaderBoard}></Route>
            <Route path="/questions/:id" component={QuestionDetails}></Route>
            <Route path="/add" component={AddQuestion}></Route>
            <Route path="/logout" component={Logout}></Route>
          </Fragment>
      }
      <Route component={PageNotAvailable}></Route>
    </Switch>
  )
};

Routes.propTypes = {currentUserNotSet: PropTypes.any}

export default Routes;