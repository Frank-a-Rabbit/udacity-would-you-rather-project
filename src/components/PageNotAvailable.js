import React, {Component} from "react"
import {Redirect, withRouter} from "react-router-dom"

class PageNotAvailable extends Component{
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
  }

  render(){
    const {location} = this.props;
    return(
      <div className="not-found">
        <span>404: Not Found or User is not logged-in</span>
        <button className="return-to-login" onClick={() => this.setState({redirect: true})}>Go to Login/Home</button>
        {
          this.state.redirect && (
            <Redirect
              to={{
                pathname: "/",
                state: {from: location}
              }}
            ></Redirect>
          )
        }
      </div>
    )
  }
};

export default withRouter(PageNotAvailable)
