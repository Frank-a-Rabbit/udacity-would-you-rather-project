import React, {PureComponent} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import User from "./User"
import {submitAnswer} from "../globals/globalFunctions"
import PageNotAvailable from "./PageNotAvailable"

class QuestionDetails extends PureComponent{

  state = {
    selectedOption: "",
    processingAnswer: false,
    invalidQuestion: false
  };

  submitSelection = (selection) => {
    this.setState({
      selectedOption: selection,
      processingAnswer: true
    });
    setTimeout(() => {
      this.setState({processingAnswer: false});
      this.props.saveAnswer(this.state.selectedOption);
    }, 600);
  };

  render(){
    const {question, author, answer, authedUser, invalidQuestion} = this.props;
    if(invalidQuestion){
      return <PageNotAvailable></PageNotAvailable>
    }
    return(
      <div className="detail-container">
        {
          this.state.processingAnswer && (
            <div className="processing">
              <h6>Submitting Answer</h6>
            </div>
          )
        }
        <div className="top-section">
          <h1>Would You Rather</h1>
          <h2>Asked By:</h2>
          <User id={author.id}></User>
        </div>
        <div className="bottom-section">
          <div className={answer !== undefined ? "answered-question" : "unaswered-question"}>
            <div className="detail-item">
                <div className="votes">
                  <h5>Total Votes:</h5>
                  <h5>{this.props.totalVotes}</h5>
                </div>
                <div>
                  <div>
                    <span>{question.optionOne.text}</span>
                    {
                      question.optionTwo.votes.includes(authedUser) !== true && (
                        <button className={this.state.selectedOption !== "" ? "active" : undefined} onClick={() => this.submitSelection("optionOne")}>Vote For This Option</button>
                      )
                    }
                    <div>
                      <h5>Percentage of Total Votes:</h5>
                      <h5>%{this.props.optionOnePerc !== "NaN" ? this.props.optionOnePerc : 0}</h5>
                      <div className="total-votes">
                        <h5>Votes for this Option</h5>
                        {question.optionOne.votes.length}
                      </div>
                      {
                        question.optionOne.votes.includes(authedUser) && (
                          <div className="authed-answer">Current user has voted for this option</div>
                        )
                      }
                    </div>
                  </div>
                  <div>
                    <span>{question.optionTwo.text}</span>
                    {
                      question.optionOne.votes.includes(authedUser) !== true && (
                        <button className={this.state.selectedOption !== "" ? "active" : undefined} onClick={(event) => this.submitSelection("optionTwo")}>Vote For This Option</button>
                      )
                    }
                      <div className="bottom">
                        <h5>Percentage of Total Votes:</h5>
                        <h5>%{this.props.optionTwoPerc !== "NaN" ? this.props.optionTwoPerc : 0}</h5>
                        <div className="total-votes">
                          <h5>Votes for this Option</h5>
                          {question.optionTwo.votes.length}
                        </div>
                        {
                          question.optionTwo.votes.includes(authedUser) && (
                            <div className="authed-answer">Current user has voted for this option</div>
                          )
                        }
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
};

QuestionDetails.propTypes = {
  question: PropTypes.object,
  questionAuthor: PropTypes.object,
  answer: PropTypes.string
};

function convertToPercentage(num){
  return Number.parseFloat(num).toFixed(2);
};

function mapStateToProps({questions, authedUser, users}, {match}){
  const {id} = match.params;
  const question = questions[id];
  let invalidQuestion = true;
  if(question !== undefined){
    invalidQuestion = false;
    const author = users[question.author];
    const answers = users[authedUser].answers;
    var answer = answers.hasOwnProperty(question.id) ? answers[question.id] : undefined;
    let totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
    let optionOnePerc = convertToPercentage((question.optionOne.votes.length / totalVotes) * 100);
    let optionTwoPerc = convertToPercentage((question.optionTwo.votes.length / totalVotes) * 100);
    return {
      question,
      author,
      answer,
      totalVotes,
      optionOnePerc,
      optionTwoPerc,
      users,
      authedUser,
      invalidQuestion
    }
  }else{
    return{
      invalidQuestion
    }
  }
};

function mapDispatchToProps(dispatch, props){
  const {id} = props.match.params;
  return {
    saveAnswer: (answer) => {
      dispatch(submitAnswer(id, answer));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails)
