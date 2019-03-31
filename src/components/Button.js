import React from 'react';
import PropTypes from 'prop-types';
import '../styles/index.scss';

const Button = (props) => {
  const {className, name, value, callback} = props;
  
  return (
    <button className={className} name={name} onClick={callback}>{value}</button>
  );
};

Button.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
};

export default Button;
