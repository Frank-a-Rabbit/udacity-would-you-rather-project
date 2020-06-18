import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {addNewQuestion} from "../globals/globalFunctions"
import {Redirect} from "react-router-dom"

class AddQuestion extends Component{
    state = {
        optionOne: "",
        optionTwo: "",
        navigateToHome: false
    };

    optionOneSelected = (event) => {
        event.preventDefault();
        this.setState({
          optionOne : event.target.value
        });
      };

      optionTwoSelected = (event) => {
        event.preventDefault();
        this.setState({
          optionTwo : event.target.value
        });
      };

    pollSubmitHandler = (event) => {
        event.preventDefault();
        const {optionOne, optionTwo} = this.state;
        this.props.addQuestion(optionOne, optionTwo);
        this.setState({navigateToHome: true})
    };

    render(){
        if (this.state.navigateToHome){
          return <Redirect to="/"></Redirect>
        }
        const {optionOne, optionTwo} = this.state;
        return(
            <div className="form-container">
              <h1>Create a new poll</h1>
              <form className="new-question" onSubmit={this.pollSubmitHandler}>
                <label>
                  Option One
                  <input type="text" value={optionOne} onChange={this.optionOneSelected}></input>
                </label>
                <label>
                  Option Two
                  <input type="text" value={optionTwo} onChange={this.optionTwoSelected}></input>
                </label>
                <button type="submit" disabled={optionOne === "" || optionTwo === ""}>Submit Poll</button>
              </form>
            </div>
          );
    }
};

AddQuestion.propTypes = {
  authedUser: PropTypes.string,
  addQuestion: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch){
  return {
    addQuestion: (optionOne, optionTwo) => {
      dispatch(addNewQuestion(optionOne, optionTwo));
    }
  }
};


export default connect(null, mapDispatchToProps)(AddQuestion)
