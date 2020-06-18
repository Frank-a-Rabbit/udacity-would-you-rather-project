import React from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {withRouter} from "react-router-dom"

class Question extends React.Component {

  getQuestionDetails(event, questionId){
    let path = `/questions/${questionId}`;
    this.props.history.push(path);
  };
  render(){
    const {auth, question} = this.props;
    return (
      <div className="question-container">
        <div className="top-section">
          <h2>Would You Rather...</h2>
          <div onClick={(event) => this.getQuestionDetails(event, question.id)}>See Question Details</div>
        </div>
        <ul>
          <li className={question.optionOne.votes.includes(auth) ? "optionSelected" : ""}>
            {question.optionOne.text}
          </li>
          <li className={question.optionTwo.votes.includes(auth) ? "optionSelected" : ""}>
            {question.optionTwo.text}
          </li>
        </ul>
      </div>
    )
  }
};

Question.propTypes = {
  history: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired
};

function mapStateToProps (state,  { id }) {
  return {
    auth: state.authedUser,
    question : state.questions[id]
  }
};

export default withRouter(connect(mapStateToProps, null)(Question))
