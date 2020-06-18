import React, {Component} from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {unsetCurrentUser} from "../actions/authentication"

class Logout extends Component{
  componentDidMount () {
    this.props.dispatch(unsetCurrentUser())
  }
  render(){
    return <Redirect to="/"></Redirect>
  }
};

export default connect()(Logout)
