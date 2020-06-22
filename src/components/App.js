import React, {PureComponent} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {BrowserRouter} from "react-router-dom"
import Routes from "./Routes"
import NavMenu from "./Navigation"
import {setData} from "../globals/globalFunctions"

class App extends PureComponent{
  componentDidMount(){
    this.props.setData();
  }

  render(){
    const {currentUserNotSet} = this.props;
    return (
      <BrowserRouter>
        <section>
          <NavMenu></NavMenu>
          <Routes currentUserNotSet = {currentUserNotSet}></Routes>
        </section>
      </BrowserRouter>
    );
  }
};

App.propTypes = {
  setData : PropTypes.func.isRequired,
  currentUserNotSet: PropTypes.bool.isRequired
};

function mapStateToProps ({authedUser}) {
  return {
    currentUserNotSet: authedUser === null
  }
};

function mapDispatchToProps(dispatch) {
  return {
    setData: () => {
      dispatch(setData())
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(App)