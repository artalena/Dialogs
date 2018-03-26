import React, { PropTypes } from 'react'
import Radium from 'radium'

const SelectSection = ({ children, leftColText, selectLabel }) => (
  <div style={leftColText}>
    <span style={selectLabel}>Select a Folder</span>
    {children}
  </div>
);

SelectSection.propTypes = {
  leftColText: PropTypes.object,
  selectLabel: PropTypes.string,
};

export default Radium(SelectSection);
