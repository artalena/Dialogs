import React, { PropTypes } from 'react'
import Radium from 'radium'
import { List } from 'immutable'
import ProjectActions from '../../Actions/ProjectActions'
import Base from '../../Common/BaseComponent'
import DialogLayout from './DialogLayout'

class DeleteFileDialog extends Base {
  constructor(props) {
    super(props);
    this.state = {
      itemName: 'Unnamed',
      isLoading: false,
      file: null,
      folderID: null,
    }
  }

  handleButtonSubmit = () => {
    const { selectedFiles } = this.props;

    if (selectedFiles) {
      this.setState({ isLoading: true });
      ProjectActions.deleteFiles(selectedFiles);
      this.handleButtonCancel();
      this.setState({ isLoading: false });
    }
  };

  handleButtonCancel = () => {
    ProjectActions.setStore({ key: 'dialogVisible', value: 'none' });
    ProjectActions.setStore({ key: 'filesAction', value: 'Select...' });
  };

  render() {
    const { isLoading } = this.state;
    const { closeCallback, narrowMode } = this.props;
    return (
      <DialogLayout
        isLoading={isLoading}
        loaderText="deleting file..."
        narrowMode={narrowMode}
        closeCallback={closeCallback}
        title="Delete all selected files?"
        submitButtonText='Delete'
        handleButtonCancel={this.handleButtonCancel}
        handleButtonSubmit={this.handleButtonSubmit}
      />
    )
  }
}

DeleteFileDialog.propTypes = {
  narrowMode: PropTypes.bool,
  closeCallback: PropTypes.func,
  selectedFiles: PropTypes.instanceOf(List).isRequired,
  files: PropTypes.array.isRequired,
  folderSelected: PropTypes.number.isRequired,
};

export default Radium(DeleteFileDialog)
