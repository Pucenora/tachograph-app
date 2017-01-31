import React from 'react';
import {
  View,
  ListView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
import ActionButton from 'react-native-action-button';

const styles = StyleSheet.create({
  driverItem: {
    flexDirection: 'row',
  },
  driverImage: {
    width: 100,
    height: 75,
    borderRadius: 10,
    margin: 10,
  },
  driverDetails: {
    padding: 5,
  },
  driverName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  emptyHeaderContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 40,
  },
  emptyHeaderTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  emptyHeaderSubtitle: {
    marginTop: 10,
    textAlign: 'center',
  },
});

class DriverListView extends React.Component {

  static propTypes = {
    // from mapStateToProps:
    drivers: React.PropTypes.array.isRequired,
    // from mapDispatchToProps:
  };

  static renderDriver(driver) {
    return (
      <TouchableOpacity
        style={styles.driverItem}
        key={driver.id}
      >
        <Image
          style={styles.driverImage}
          source={{ uri: driver.image }}
        />
        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>{ driver.name }</Text>
        </View>
      </TouchableOpacity>
    );
  }

  static renderActionButtons() {
    return (
      <ActionButton buttonColor="#22CCDD" bgColor="rgba(0, 0, 0, 0.6)">
        <ActionButton.Item
          buttonColor="#3498db"
          title={I18n.t('DriverListView_action_button_add_driver')}
          onPress={Actions.driverDetail}
        >
          <Icon name="plus" size={30} color="#fff" />
        </ActionButton.Item>
      </ActionButton>
    );
  }

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(this.props.drivers),
    };
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {
    if (this.props.drivers.length > 0) {
      return null;
    }

    return (
      <View style={styles.emptyHeaderContainer}>
        <Text style={styles.emptyHeaderTitle}>
          { I18n.t('DriverListView_empty_header_title') }
        </Text>
        <Text style={styles.emptyHeaderSubtitle}>
          { I18n.t('DriverListView_empty_header_subtitle') }
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader}
          renderRow={DriverListView.renderDriver}
          renderSeparator={() => <View style={{ height: 1, backgroundColor: '#CCCCCC' }} />}
          enableEmptySections
        />
        { DriverListView.renderActionButtons() }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  drivers: state.drivers.drivers,
});

export default connect(mapStateToProps, null)(DriverListView);
