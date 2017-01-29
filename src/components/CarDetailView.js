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
import { addCar } from '../actions/CarActions';

const styles = StyleSheet.create({
  sectionHeader: {
    marginLeft: 20,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
  },
  carImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carImage: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').width) * 0.5,
    alignSelf: 'center',
  },
  changePhotoButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 13,
    backgroundColor: '#3498db',
    borderRadius: 50,
  },
});

class CarDetailView extends React.Component {

  static propTypes = {
    // from mapStateToProps:
    carName: React.PropTypes.string.isRequired,
    // from mapDispatchToProps:
    addCar: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      carName: props.carName,
    };
    this.render = this.render.bind(this);
    this.changePhoto = this.changePhoto.bind(this);
    this.showCamera = this.showCamera.bind(this);
    this.showGalleryPicker = this.showGalleryPicker.bind(this);
    this.addCar = this.addCar.bind(this);
  }

  showGalleryPicker() {
    ImagePicker.openPicker({
      width: 400,
      height: 200,
      cropping: true,
      includeBase64: true,
    })
    .then(image => this.setState({ carImage: `data:${image.mime};base64,${image.data}` }))
    .catch((err) => {
      if (err.code !== 'E_PICKER_CANCELLED') {
        Alert.alert(`Es ist ein Fehler aufgetreten:\n${err.message}`);
      }
    });
  }

  showCamera() {
    ImagePicker.openCamera({
      width: 400,
      height: 200,
      cropping: true,
      includeBase64: true,
    })
    .then(image => this.setState({ carImage: `data:${image.mime};base64,${image.data}` }))
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

  addCar() {
    dismissKeyboard();
    this.props.addCar({
      name: this.state.carName,
      image: this.state.carImage,
    });
  }

  render() {
    const buttonState = 'ready';
    return (
      <ScrollView style={commonStyles.container} keyboardShouldPersistTaps="always">
        <View style={styles.carImageContainer}>
          {
            this.state.carImage ?
              <Image
                style={styles.carImage}
                source={{ uri: this.state.carImage }}
              /> :
              <Image
                style={styles.carImage}
                source={require('../assets/images/suv.png')}
              />
          }
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={this.changePhoto}
          >
            <Icon name="camera" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <View style={commonStyles.inputs}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Fahrzeugname</Text>
          </View>
          <View style={commonStyles.inputContainer}>
            <Icon name="tag" style={commonStyles.inputUsername} size={30} />
            <TextInput
              value={this.state.carName}
              editable
              placeholder="Eindeutiger Fahrzeugname (z.B. Kennzeichen)"
              onChangeText={newCarName => this.setState({
                carName: newCarName,
              })}
              underlineColorAndroid="transparent"
              style={[commonStyles.input, commonStyles.blackFont]}
            />
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
                onPress: this.addCar,
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
  if (ownProps.carId) {
    return {

    };
  }
  return {
    carId: 'default',
    carName: '',
    carImage: null,
  };
};

const mapDispatchToProps = dispatch => ({
  addCar: bindActionCreators(addCar, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarDetailView);
