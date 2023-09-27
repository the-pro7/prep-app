// import React from 'react'
import PropTypes from "prop-types"

const Option = ({option, optionClickAction}) => {
  return (
    <button className="option" onClick={optionClickAction}>{option}</button>
  )
}

Option.propTypes = {
  option: PropTypes.string.isRequired,
  optionClickAction: PropTypes.func.isRequired,
}

export default Option