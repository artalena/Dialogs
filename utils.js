export const getAllFolders = folders => folders.filter(folder => folder.get('typeable') === 'folder');
export const getNotSelectedFolders = (folders, propsFolderSelected) => getAllFolders(folders)
  .filter(folder => folder.get('id') !== propsFolderSelected);
