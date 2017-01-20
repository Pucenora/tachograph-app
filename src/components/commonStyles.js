import { StyleSheet } from 'react-native';

function getStyles() {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent',
    },
    headerText: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    inputs: {
      marginTop: 10,
      marginBottom: 20,
      flex: 0.8,
    },
    inputContainer: {
      padding: 10,
      borderWidth: 1,
      borderBottomColor: '#CCC',
      borderColor: 'transparent',
    },
    input: {
      position: 'absolute',
      left: 61,
      top: 12,
      right: 0,
      height: 40,
      fontSize: 14,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    inputPassword: {
      marginLeft: 15,
      width: 30,
      height: 30,
    },
    inputUsername: {
      marginLeft: 15,
      width: 33,
      height: 30,
    },
    signin: {
      backgroundColor: '#FF3366',
      padding: 20,
      alignItems: 'center',
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      flex: 0.2,
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    blackFont: {
      color: '#000',
    },
    buttonDisabled: {
      backgroundColor: '#aaaaaa',
    },
  });
}

export default getStyles();
