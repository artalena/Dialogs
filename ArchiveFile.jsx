import React, { PropTypes } from 'react'
import Radium from 'radium'
import { List } from 'immutable'
import ProjectActions from '../../Actions/ProjectActions'
import Base from '../../Common/BaseComponent'
import DialogLayout from './DialogLayout'

class ArchiveFileDialog extends Base {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      file: null,
    }
  }

  handleButtonSubmit = () => {
    const { selectedFiles } = this.props;
    if (selectedFiles) {
      this.setState({ isLoading: true });
      ProjectActions.archiveFiles({ archived: true, files: selectedFiles });
      ProjectActions.setStore({ key: 'filesAction', value: 'Select...' });
      this.setState({ isLoading: false });
    }
  };

  render() {

    const { narrowMode, closeCallback } = this.props;
    const { isLoading } = this.state;
    return (
      <DialogLayout
        isLoading={isLoading}
        loaderText="archiving file..."
        submitButtonText="Archive Files"
        narrowMode={narrowMode}
        closeCallback={closeCallback}
        title="Archive all selected files"
        handleButtonCancel={closeCallback}
        handleButtonSubmit={this.handleButtonSubmit}
      />
    )
  }
}

ArchiveFileDialog.propTypes = {
  narrowMode: PropTypes.bool,
  closeCallback: PropTypes.func,
  selectedFiles: PropTypes.instanceOf(List).isRequired,
  files: PropTypes.array.isRequired,
};

export default Radium(ArchiveFileDialog)
