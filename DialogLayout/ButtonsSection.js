import React, { PropTypes } from 'react'
import Radium from 'radium'
import Button from '../../../Common/Button'

const ButtonsSection = ({
  handleButtonCancel, handleButtonSubmit, buttonCancel, disableSuccessButton,
  submitButtonText, submitButtonColor,
  narrowMode, buttonSubmit, button, rightCol, closeCallback }) => (
  <div style={rightCol}>
    <div style={button}>
      <Button
        handleClick={() => handleButtonCancel()}
        color={'gray'}
        size={'large'}
        style={buttonCancel}
      >
          Cancel
      </Button>
      <Button
        handleClick={() => handleButtonSubmit()}
        color={submitButtonColor}
        size={'large'}
        width={'100%'}
        style={buttonSubmit}
        disabled={disableSuccessButton}
      >
        {submitButtonText}
      </Button>
    </div>
    {narrowMode &&
      <div style={button}>
        <Button
          handleClick={() => closeCallback()}
          size={'large'}
          width={'100%'}
          color={'gray'}
        >
          Cancel
        </Button>
      </div>}
  </div>
);

ButtonsSection.propTypes = {
  submitButtonText: PropTypes.string,
  handleButtonCancel: PropTypes.func,
  handleButtonSubmit: PropTypes.func,
  buttonCancel: PropTypes.shape(),
  disableSuccessButton: PropTypes.bool,
  submitButtonColor: PropTypes.string,
  narrowMode: PropTypes.bool,
  buttonSubmit: PropTypes.shape(),
  button: PropTypes.shape(),
  rightCol: PropTypes.shape(),
  closeCallback: PropTypes.func,
};
ButtonsSection.defaultProps = {
  submitButtonColor: 'orange',
  submitButtonText: 'Delete',
}

export default Radium(ButtonsSection);
