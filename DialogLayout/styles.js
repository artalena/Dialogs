import GlobalStyles from '../../../Styles/globalStyle';

const getStyles = (narrowMode) => {
  const { baseColors: { lightestGray, lighterGray }, baseBorderRadius: { large } } = GlobalStyles;
  return ({

    buttonSubmit: {
      margin: '0px 0px 0px 5px',
      width: '165',
    },

    buttonCancel: {
      margin: '0px 5px 0px 0px',
      width: '165',
    },

    select: {
      marginTop: 10,
      marginBottom: 10,
    },

    leftCol: {
      float: 'left',
      width: narrowMode ? '100%' : 310,
      marginRight: 40,
      marginBottom: 28,
    },

    rightCol: {
      float: 'left',
      width: narrowMode ? '100%' : 340,
      paddingTop: narrowMode ? 0 : 30,
    },

    imageArea: {
      width: narrowMode ? '100%' : 188,
      height: narrowMode ? 100 : 188,
      marginTop: 15,
      marginBottom: narrowMode ? 10 : 28,
      backgroundColor: lightestGray,
      border: `1px solid ${lighterGray}`,
      borderRadius: large,
    },

    image: {
      width: narrowMode ? '100%' : 188,
      borderRadius: large,
      overflow: 'hidden',
    },

    button: {
      marginTop: 30,
    },
    leftColText: {
      float: 'left',
      width: '100%',
      paddingRight: 7,
    },
    fileIcon: {
      textAlign: 'center',
    },
    loader: {
      width: '100%',
      textAlign: 'center',
      marginTop: 170,
    },
  })
}

export { getStyles }
