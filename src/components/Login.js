import React, {PureComponent} from "react";
import {connect } from "react-redux"
import PropTypes from "prop-types"
import {setCurrentUser} from "../actions/authentication"

class LoginComponent extends PureComponent{
  constructor(props) {
    super(props)
    this.state = {
      userId : ""
    };
    this.updateActiveUser = this.updateActiveUser.bind(this);
    this.login = this.login.bind(this);
  };

  updateActiveUser(event){
    this.setState({userId: event.target.value});
  };

  login = (event) => {
    event.preventDefault();
    const {userId} = this.state;
    const {authenticate} = this.props;
    if(userId){
      authenticate(userId);
    }else{
      alert("No user selected");
    }
  };

  render(){
    const {users} = this.props;
    return (
        <div className="login-form">
          <form onSubmit = {this.login}>
              <span>Select a User</span>
              {
                Object.keys(users).map((user) => 
                  <div key={user} className="input-wrapper">
                    <label>{users[user].name}
                      <input type="radio" name="user" value={user} onChange={this.updateActiveUser}></input>
                    </label>
                  </div>
               )
              }
              <input className="submit-btn" type="submit" value="Set Active User"></input>
          </form>
        </div>
    );
  }
};

LoginComponent.propTypes = {
  users: PropTypes.object.isRequired,
  authenticate: PropTypes.func.isRequired
};

function mapStateToProps ({ users }){
  return {
    users
  }
};

function mapDispatchToProps(dispatch){
  return {
    authenticate: (id) => {
      dispatch(setCurrentUser(id))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
