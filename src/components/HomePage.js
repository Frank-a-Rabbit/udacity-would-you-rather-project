import React, {PureComponent} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import Question from "./Question"

class HomePage extends PureComponent{
  state = {
    activePoll: "unanswered"
  };

  toggleActivePoll(poll){
    if(this.state.activePoll !== poll){
      this.setState({
        activePoll: poll
      });
    }
  };

  render(){
    const {user, unanswered, answered} = this.props;
    return(
      <div className={`homepage-container ${this.state.activePoll}`}>
        {
          user && (
            
            <div className="auth-user">
              <img src={user.avatarURL} alt={user.name} />
              <h5>{user.name}</h5>
            </div>
          )
        }
        <div className="primary-container">
          <div className="toggle-polls">
          <h2 className="unanswered" onClick={() => {this.toggleActivePoll("unanswered")}}>Unanswered Questions</h2>
          <h2 className="answered" onClick={() => {this.toggleActivePoll("answered")}}>Answered Questions</h2>
          </div>
          <div className="unanswered-container">
            {
              unanswered.map(qid => 
                <div key = {qid}>
                  <Question id = {qid}></Question>
                </div>
              )
            }
          </div>
          <div className="answered-container">
            {
              answered.map(qid => 
                <div key = {qid}>
                  <Question id = {qid}></Question>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
};

HomePage.propTypes = {
  answeredPolls : PropTypes.array,
  unansweredPolls : PropTypes.array
};

function mapStateToProps({ questions, users, authedUser }){
  const user = users[authedUser];
  const answered = Object.keys(user.answers).sort((a,b) => questions[b].timestamp - questions[a].timestamp);
  return {
    unanswered : Object.keys(questions).filter(qid => !answered.includes(qid)).sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    answered,
    user
  }
};

export default connect(mapStateToProps)(HomePage)
