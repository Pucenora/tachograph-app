import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeButton from 'react-native-awesome-button';
import ImagePicker from 'react-native-image-crop-picker';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import { bindActionCreators } from 'redux';
import commonStyles from './commonStyles';
import { addDriver } from '../actions/DriverActions';

const styles = StyleSheet.create({
  sectionHeader: {
    marginLeft: 20,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
  },
  usernamePictureContainer: {
    marginBottom: 40,
  },
  driverImageContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 150,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  driverImage: {
    width: 120,
    height: 150,
  },
  changePhotoButton: {
    padding: 13,
    backgroundColor: '#3498db',
    borderRadius: 50,
  },
  inputs: {
    width: 200,
  },
});

class DriverDetailView extends React.Component {

  static propTypes = {
    // from mapStateToProps:
    driverName: React.PropTypes.string.isRequired,
    // from mapDispatchToProps:
    addDriver: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      driverName: props.driverName,
    };
    this.render = this.render.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.changePhoto = this.changePhoto.bind(this);
    this.showCamera = this.showCamera.bind(this);
    this.showGalleryPicker = this.showGalleryPicker.bind(this);
    this.addDriver = this.addDriver.bind(this);
  }

  showGalleryPicker() {
    ImagePicker.openPicker({
      width: 120,
      height: 150,
      cropping: true,
      includeBase64: true,
    })
    .then(image => this.setState({ driverImage: `data:${image.mime};base64,${image.data}` }))
    .catch((err) => {
      if (err.code !== 'E_PICKER_CANCELLED') {
        Alert.alert(`Es ist ein Fehler aufgetreten:\n${err.message}`);
      }
    });
  }

  showCamera() {
    ImagePicker.openCamera({
      width: 120,
      height: 150,
      cropping: true,
      includeBase64: true,
    })
    .then(image => this.setState({ driverImage: `data:${image.mime};base64,${image.data}` }))
    .catch((err) => {
      if (err.code !== 'E_PICKER_CANCELLED') {
        Alert.alert(`Es ist ein Fehler aufgetreten:\n${err.message}`);
      }
    });
  }

  changePhoto() {
    Alert.alert(
      null,
      'Bitte wählen Sie die Bildquelle:',
      [
        { text: 'Aus der Galerie auswählen', onPress: this.showGalleryPicker },
        { text: 'Neues Photo aufnehmen', onPress: this.showCamera },
      ],
    );
  }

  addDriver() {
    dismissKeyboard();
    this.props.addDriver({
      name: this.state.driverName,
      image: this.state.driverImage,
    });
  }

  renderImage() {
    if (this.state.driverImage) {
      return (
        <Image
          style={styles.driverImage}
          source={{ uri: this.state.driverImage }}
        />
      );
    }

    return (
      <Icon name="camera" size={25} color="white" />
    );
  }

  render() {
    const buttonState = 'ready';
    return (
      <ScrollView style={commonStyles.container} keyboardShouldPersistTaps="always">
        <View style={styles.usernamePictureContainer}>
          <View style={styles.driverImageContainer}>
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={this.changePhoto}
            >
              {
                this.renderImage()
              }
            </TouchableOpacity>
          </View>
          <View style={commonStyles.inputs}>
            <View style={commonStyles.inputContainer}>
              <Icon name="user" style={commonStyles.inputUsername} size={30} />
              <TextInput
                value={this.state.driverName}
                editable
                placeholder="Name des Fahrers"
                onChangeText={newDriverName => this.setState({
                  driverName: newDriverName,
                })}
                underlineColorAndroid="transparent"
                style={[commonStyles.input, commonStyles.blackFont]}
              />
            </View>
          </View>
        </View>
        <View>
          <AwesomeButton
            backgroundStyle={commonStyles.signin}
            labelStyle={styles.buttonLabel}
            transitionDuration={200}
            states={{
              invalid: {
                text: 'Weiter',
                backgroundColor: '#B69099',
              },
              ready: {
                text: 'Weiter',
                onPress: this.addDriver,
                backgroundColor: '#FF3366',
              },
            }}
            buttonState={buttonState}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (ownProps.driverId) {
    return {

    };
  }
  return {
    driverId: 'default',
    driverName: '',
    driverImage: null,
  };
};

const mapDispatchToProps = dispatch => ({
  addDriver: bindActionCreators(addDriver, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DriverDetailView);
