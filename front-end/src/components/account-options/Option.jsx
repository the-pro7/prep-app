// import React from 'react'
import PropTypes from "prop-types";

const Option = ({ option, onOptionClicked, optionClassName }) => {
  return (
    <button
      onClick={onOptionClicked}
      className={optionClassName}
    >
      {option}
    </button>
  );
};

// Option.propTypes = {
//   option: PropTypes.string.isRequired,
//   selected: PropTypes.string.isRequired,
//   onOptionClicked: PropTypes.func.isRequired,
// };

export default Option;
