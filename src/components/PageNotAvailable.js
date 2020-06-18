import React from "react"
import PropTypes from "prop-types"

const PageNotAvailable = ({history}) => (
  <div>
    <span>404: Not Found or User is not logged-in</span>
    <button className="return-to-login" onClick={() => history.push("/")}>Go to login page</button>
  </div>
)

PageNotAvailable.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default PageNotAvailable
