import React from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types'

function Leaderboard(props){
  const {users} = props;
  const arr = [];
  for(let user in users){
    arr.push(users[user]);
  }

  arr.sort((a, b) => {
    return (Object.keys(b.answers).length + Object.keys(b.questions).length) - (Object.keys(a.answers).length + Object.keys(b.questions).length);
  });
  return(
    <div className="leaderboard">
      <h1>LeaderBoard</h1>
      <div className="bottom-section">
        {arr.map((user, index) => (
          <div key={user.id}>
            <div><span>Position: </span>{index + 1}</div>
            <div className="profile">
              <div><img src={user.avatarURL} className='avatar' alt={`Avatar of ${user.name}`}/></div>
              <div>{user.name}</div>
            </div>
            <div><span>Questions Asked: </span>{user.questions.length}</div>
            <div><span>Questions Answered: </span>{Object.keys(user.answers).length}</div>
          </div>
        ))}
      </div>
    </div>
  )
};

Leaderboard.propTypes = {
  users: PropTypes.object.isRequired
};

const mapStateToProps = ({users}) => {
  return {
    users
  }
};

export default connect(mapStateToProps)(Leaderboard)
