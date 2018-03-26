import React, { PropTypes } from 'react'
import Radium from 'radium'
import { List } from 'immutable'
import Select from 'react-select'
import Base from '../../Common/BaseComponent'
import ProjectActions from '../../Actions/ProjectActions'
import DialogLayout from './DialogLayout'
import { getNotSelectedFolders } from './utils'

class MoveFileDialog extends Base {
  constructor(props) {
    super(props);
    this.state = {
      itemName: 'Unnamed',
      isLoading: false,
      file: null,
      folderID: null,
      folderSelected: null,
    }
  }

  handleButtonSubmit = () => {
    const { selectedFiles } = this.props;
    const { folderSelected } = this.state;
    if (selectedFiles && folderSelected) {
      this.setState({ isLoading: true });
      ProjectActions.moveFiles({ folderID: folderSelected, files: selectedFiles });
      ProjectActions.setStore({ key: 'filesAction', value: 'Select...' });
      this.setState({ isLoading: false });
    }
  };

  handleButtonCancel = () => {
    ProjectActions.setStore({ key: 'dialogVisible', value: 'none' });
    ProjectActions.setStore({ key: 'filesAction', value: 'Select...' });
  };

  handleFolderChoose = (folderID) => {
    this.setState({ folderSelected: folderID });
  };

  render() {
    const { closeCallback, folderSelected: propsFolderSelected, folders, narrowMode } = this.props;
    const { folderSelected, isLoading } = this.state;
    const disableButtonMove = folderSelected === null;
    const notSelectedFolders = getNotSelectedFolders(folders, propsFolderSelected);

    const FOLDERS = [...notSelectedFolders.map(folder => ({ label: folder.get('name'), value: folder.get('id') }))];

    const selectSection = (
      <Select
        name='select-folder'
        value={folderSelected}
        options={FOLDERS}
        clearable={false}
        onChange={this.handleFolderChoose}
        disabled={false}
      />
    );

    return (
      <DialogLayout
        isLoading={isLoading}
        loaderText="moving files..."
        narrowMode={narrowMode}
        closeCallback={closeCallback}
        title="Move Files "
        submitButtonText="Move"
        selectSection={selectSection}
        disableSuccessButton={disableButtonMove}
        handleButtonCancel={this.handleButtonCancel}
        handleButtonSubmit={this.handleButtonSubmit}
      />
    )
  }

}

MoveFileDialog.propTypes = {
  narrowMode: PropTypes.bool,
  closeCallback: PropTypes.func,
  selectedFiles: PropTypes.instanceOf(List).isRequired,
  files: PropTypes.array.isRequired,
  folders: PropTypes.object,
  folderSelected: PropTypes.number.isRequired,
};

export default Radium(MoveFileDialog)
