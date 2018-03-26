import React, { PropTypes } from 'react'
import Radium from 'radium'
import { getStyles } from './styles'
import LoadingMessage from '../../../Common/LoadingMessage'
import ButtonsSection from './ButtonsSection'
import SelectSection from './SelectSection'

const DialogLayout = ({
  closeCallback, narrowMode, loaderText, title, radioSection,
  disableSuccessButton, submitButtonText, submitButtonColor,
  selectSection, handleButtonCancel, handleButtonSubmit, isLoading, filePickerSection,
}) => {
  const { div, leftCol, fileIcon, loader, ...styles } = getStyles(narrowMode);

  if (isLoading) {
    return (
      <div style={loader}>
        <LoadingMessage text={loaderText} />
      </div>
    )
  }
  return (
    <div style={div}>
      <div style={leftCol}>
        <h2>{title}</h2>
        {radioSection && <div>{radioSection}</div>}
        {filePickerSection && <div style={fileIcon}>{filePickerSection}</div>}
      </div>
      {selectSection && <SelectSection {...styles}>{selectSection}</SelectSection> }
      <ButtonsSection
        {...styles}
        submitButtonColor={submitButtonColor}
        submitButtonText={submitButtonText}
        disableSuccessButton={disableSuccessButton}
        handleButtonCancel={handleButtonCancel}
        handleButtonSubmit={handleButtonSubmit}
        closeCallback={closeCallback}
        narrowMode={narrowMode}
      />
    </div>
  )
}

DialogLayout.propTypes = {
  narrowMode: PropTypes.bool,
  loaderText: PropTypes.string,
  title: PropTypes.string,
  radioSection: PropTypes.node,
  selectSection: PropTypes.node,
  handleButtonCancel: PropTypes.func,
  handleButtonSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  closeCallback: PropTypes.func,
  disableSuccessButton: PropTypes.bool,
  filePickerSection: PropTypes.node,
  submitButtonColor: PropTypes.string,
  submitButtonText: PropTypes.string,
};

export default Radium(DialogLayout)
