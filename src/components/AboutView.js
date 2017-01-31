import React from 'react';
import {
  View,
  Text,
  Linking,
  Platform,
  StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import I18n from 'react-native-i18n';

const androidVersionRegex = new RegExp(
  '^([0-9]+)\\.([0-9]+)\\.([0-9]+)\\.([0-9]+)_' +
  '([0-9]{4})\\-([0-9]{2})\\-([0-9]{2})\\-([0-9]{2})\\-([0-9]{2})_([a-z0-9]+)\\.([0-9]+)$');

function openUrl(url) {
  Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      console.log(`Can't handle url: ${url}`);
      return null;
    }

    return Linking.openURL(url);
  }).catch(err => console.error('An error occurred', err));
}

function parseVersion(versionString) {
  if (Platform.OS === 'android') {
    const match = androidVersionRegex.exec(versionString);
    return {
      majorVersion: match[1],
      minorVersion: match[2],
      patchVersion: match[3],
      buildNumber: match[4],
      displayVersion: `${match[1]}.${match[2]}.${match[3]}`,
      buildDate: new Date(match[5], match[6] - 1, match[7], match[8], match[9]),
      gitCommit: match[10],
    };
  }

  return {
    displayVersion: versionString,
  };
}

const styles = StyleSheet.create({
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    fontSize: 14,
  },
  imprintHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

class AboutView extends React.Component {

  static propTypes = {
    // from mapStateToProps:
    debug: React.PropTypes.bool.isRequired,
    // from mapDispatchToProps
  };

  constructor(props) {
    super(props);
    this.state = {
      debugModeCountdown: 12,
    };
    this.countdown = this.countdown.bind(this);
  }

  countdown() {
    if (this.state.debugModeCountdown === 1) {
      // this.props.setDebug(true);
    }

    if (this.state.debugModeCountdown > 0) {
      this.setState({
        debugModeCountdown: this.state.debugModeCountdown - 1,
      });
    }
  }

  render() {
    const { debug } = this.props;
    const version = parseVersion(DeviceInfo.getReadableVersion());
    return (
      <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
          {I18n.t('AboutView_label_app_name')}
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }} onPress={this.countdown}>
          {I18n.t('AboutView_label_version', { version: version.displayVersion })}
        </Text>
        { debug && version.buildNumber ?
          <Text style={{ marginTop: 10 }}>
            {I18n.t('AboutView_label_buildNumber', { buildNumber: version.buildNumber })}
          </Text> :
          null
        }
        { debug && version.buildDate ?
          <Text>
            {I18n.t('AboutView_label_buildDate', { buildDate: version.buildDate.toUTCString() })}
          </Text> :
          null
        }
        { debug && version.gitCommit ?
          <Text>
            {I18n.t('AboutView_label_gitCommit', { gitCommit: version.gitCommit })}
          </Text> :
          null
        }
        <Text style={{ marginTop: 10 }}>
          {I18n.t('AboutView_label_copyright')}
        </Text>
        <Text
          style={styles.link}
          onPress={() => openUrl(I18n.t('AboutView_license_url'))}
        >
          { I18n.t('AboutView_license_label') }
        </Text>
        <View style={styles.section}>
          <Text style={styles.imprintHeader}>{ I18n.t('AboutView_imprint_header')}</Text>
          <Text>{ I18n.t('AboutView_imprint_text')}</Text>
        </View>
        <View style={styles.section}>
          <Text
            style={styles.link}
            onPress={() => openUrl(I18n.t('AboutView_github_url'))}
          >
            {I18n.t('AboutView_github_label')}
          </Text>
        </View>
        <View style={styles.section}>
          <Text
            style={styles.link}
            onPress={() => openUrl(I18n.t('AboutView_terms_url'))}
          >
            {I18n.t('AboutView_button_terms')}
          </Text>
        </View>
        <View style={styles.section}>
          <Text
            style={styles.link}
            onPress={() => openUrl(I18n.t('AboutView_privacy_url'))}
          >
            {I18n.t('AboutView_button_privacy')}
          </Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    debug: true, // state.settings.debug,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(
      // Object.assign({}, SettingsActions), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutView);
