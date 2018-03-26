import React, { PropTypes } from 'react'
import Radium from 'radium'
import { List } from 'immutable'
import Select from 'react-select'
import ProjectActions from '../../Actions/ProjectActions'
import Base from '../../Common/BaseComponent'
import FilePicker from '../../Common/FilePicker'
import ProjectStore from '../../Stores/ProjectStore';
import DialogLayout from './DialogLayout'
import { getAllFolders } from './utils'

class FileUploadDialog extends Base {
  constructor(props) {
    super(props);
    this.state = {
      itemName: 'Unnamed',
      isLoading: false,
      file: null,
      chooseFolder: 'Choose...',
      folderSelected: null,
    }
  }

  handleFileCallback = file => this.setState({ file });

  handleButtonSubmit = () => {
    const globalState = ProjectStore.getState();
    const { admin } = this.props;
    const { file } = this.state;
    const { name, fileType, url } = file;
    const folderSelected = admin
      ? this.state.folderSelected
      : globalState.folders
        .filter(folder => folder.get('typeable') === 'from_clients')
        .first().get('id');

    if (file && folderSelected) {
      this.setState({ isLoading: true });
      const params = {
        url,
        name,
        folderID: folderSelected,
        fileType,
      };

      ProjectActions.addFileToFolder(params);
      this.setState({ isLoading: false });
    }
  };

  handleButtonCancel = () => {
    ProjectActions.setStore({ key: 'dialogVisible', value: 'none' });
  };

  handleFolderChoose = (folderID) => {
    const allFolders = getAllFolders(this.props.folders)
    const selectedFolder = allFolders.find(f => f.get('id') === folderID);
    const folderName = selectedFolder ? selectedFolder.get('name') : this.state.chooseFolder;
    this.setState({ folderSelected: folderID, chooseFolder: folderName });
  }

  render() {
    const { admin, closeCallback, folders, narrowMode } = this.props;
    const { chooseFolder, file, folderSelected, isLoading } = this.state;
    const disableAddButton = admin ? !file || !folderSelected : !file;
    const allFolders = getAllFolders(folders);
    const FOLDERS = [
      { label: 'Choose...', value: 'default', disabled: true },
      ...allFolders.map(folder => ({
        label: folder.get('name'),
        value: folder.get('id'),
      })),
    ];

    const filePickerSection = (
      <FilePicker
        admin={admin}
        fileExists={!!file}
        filePath={file ? file.url : null}
        file={file || null}
        fileAddedCallback={this.handleFileCallback}
        width={narrowMode ? '100%' : 300}
        height={100}
        customClass={'upholstery_filepicker_add_file'}
        buttonText={'Upload a file'}
      />);
    const selectSection = admin && (
      <Select
        name='select-folder'
        value={chooseFolder}
        options={FOLDERS}
        clearable={false}
        onChange={this.handleFolderChoose}>
      </Select>
    );

    return (
      <DialogLayout
        isLoading={isLoading}
        loaderText="creating file..."
        narrowMode={narrowMode}
        closeCallback={closeCallback}
        title="Add File"
        filePickerSection={filePickerSection}
        selectSection={selectSection}
        disableSuccessButton={disableAddButton}
        submitButtonColor='green'
        submitButtonText='Add File'
        handleButtonCancel={this.handleButtonCancel}
        handleButtonSubmit={this.handleButtonSubmit}
      />
    )
  }
}

FileUploadDialog.propTypes = {
  specs: PropTypes.instanceOf(List).isRequired,
  types: PropTypes.instanceOf(List).isRequired,
  narrowMode: PropTypes.bool,
  closeCallback: PropTypes.func,
};

export default Radium(FileUploadDialog)
