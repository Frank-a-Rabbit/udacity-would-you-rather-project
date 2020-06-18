import React, {PureComponent} from "react";
import {connect} from "react-redux"
import PropTypes from "prop-types"

class User extends PureComponent{

  render(){
    const {user} = this.props;

    return(
      <div className="user-details">
        <img src={user.avatarURL} alt={`${user.name}`}/>
        <h4>{user.name}</h4>
      </div>
    );
  }
};

User.propTypes = {
  user: PropTypes.object.isRequired
};

function mapStateToProps({users}, {id}){
  return{
    user : users[id]
  }
};

// export default User
export default connect(mapStateToProps)(User)
