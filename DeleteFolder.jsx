import React, { PropTypes } from 'react'
import Radium from 'radium'
import { List } from 'immutable'
import Select from 'react-select'
import Base from '../../Common/BaseComponent'
import ProjectActions from '../../Actions/ProjectActions'
import RadioItemsGroup from '../../Common/RadioItemsGroup'
import DialogLayout from './DialogLayout'
import { getNotSelectedFolders } from './utils'

const DEFAULT_ITEM = 'deleteAll';

class DeleteFolderDialog extends Base {
  constructor(props) {
    super(props);
    this.state = {
      itemName: 'Unnamed',
      isLoading: false,
      file: null,
      chooseFolder: 'Choose...',
      folderSelected: null,
      itemSelected: DEFAULT_ITEM,
    }
  }

  handleButtonSubmit = () => {

    const { folderSelected: stateFolderSelected, itemSelected } = this.state;
    const { folderSelected, folders } = this.props;

    if (itemSelected === 'deleteAll') {
      ProjectActions.deleteFolder(folderSelected);
    } else {
      const files = [];
      folders.find(folder => folder.get('id') === folderSelected).get('files').map(file => files.push(file.get('id')));
      if (files && folderSelected) {
        this.setState({ isLoading: true });
        ProjectActions.moveFiles({ folderID: stateFolderSelected, files, deleteFolder: folderSelected });
        this.setState({ isLoading: false });
      }
    }
    this.handleButtonCancel();
  }

  handleButtonCancel = () => {
    ProjectActions.setStore({ key: 'dialogVisible', value: 'none' });
  }

  handleFolderChoose = (folderID) => {
    this.setState({ folderSelected: folderID });
  };

  handleCheckByChange = (e) => {
    this.setState({ itemSelected: e.checked.value });
  };

  render() {
    const { closeCallback, folderSelected: propsFolderSelected, folders, narrowMode } = this.props
    const { folderSelected, itemSelected, isLoading } = this.state;
    const disableSelectFolders = itemSelected === 'deleteAll';
    const disableButtonDelete = itemSelected === 'moveToFolder' && !folderSelected;


    const radioItems = [
      { text: 'Delete All Files in this folder', value: DEFAULT_ITEM },
      { text: 'Move to another folder', value: 'moveToFolder' },
    ];

    const notSelectedFolders = getNotSelectedFolders(folders, propsFolderSelected);

    const FOLDERS = [
      { label: 'Choose...', value: 'default', disabled: true },
      ...notSelectedFolders.map(folder => ({
        label: folder.get('name'),
        value: folder.get('id'),
      })),
    ];

    const radioSection = (
      <RadioItemsGroup
        name='deleteFolder'
        checked={itemSelected}
        items={radioItems}
        color={'green'}
        textStyle={{ top: 0 }}
        iconClass={'sort-attr'}
        handleChange={this.handleCheckByChange}
      />
    );
    const selectSection = (
      <Select
        name='select-folder'
        value={folderSelected}
        options={FOLDERS}
        clearable={false}
        onChange={this.handleFolderChoose}
        disabled={disableSelectFolders}
      />
    )
    return (
      <DialogLayout
        isLoading={isLoading}
        loaderText="deleting folder..."
        narrowMode={narrowMode}
        closeCallback={closeCallback}
        title="Delete Folder"
        disableSuccessButton={disableButtonDelete}
        radioSection={radioSection}
        selectSection={selectSection}
        submitButtonText='Delete'
        handleButtonCancel={this.handleButtonCancel}
        handleButtonSubmit={this.handleButtonSubmit}
      />
    )
  }
}

DeleteFolderDialog.propTypes = {
  specs: PropTypes.instanceOf(List).isRequired,
  types: PropTypes.instanceOf(List).isRequired,
  narrowMode: PropTypes.bool,
  closeCallback: PropTypes.func,
  folders: PropTypes.object,
  folderSelected: PropTypes.number.isRequired,
};


export default Radium(DeleteFolderDialog)
