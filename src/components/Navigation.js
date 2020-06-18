import React, {PureComponent} from "react"
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"
import PropTypes from "prop-types"

class NavMenu extends PureComponent{

  render() {
    const {authedUser} = this.props;
    return (
      <nav className="navigation">
        {
          authedUser &&
          <div className="nav-inner">
            <Link to="/">Homepage</Link>
            <Link to="/leaderboard">Leaders</Link>
            <Link to="/add">New Questions</Link>
            <Link to="/logout">Logout</Link>
          </div>
        }
      </nav>
    );
  }
};

NavMenu.propTypes = {
  authedUser: PropTypes.string,
};

function mapStateToProps ({authedUser}) {
  return {
    authedUser
  }
};

export default withRouter(connect(mapStateToProps, null)(NavMenu))
