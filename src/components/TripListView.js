import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import I18n from 'react-native-i18n';
import ActionButton from 'react-native-action-button';
import { bindActionCreators } from 'redux';
import Permissions from 'react-native-permissions';
import { startTracking } from '../actions/TrackingActions';

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {

  },
  sectionHeader: {
    marginTop: 5,
    marginLeft: 10,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
  },
  tripItemContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    // borderBottomWidth: 1,
    // borderColor: '#e4e4e4',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tripTimeContainer: {
    flexDirection: 'column',
    flex: 0.2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  tripAddressContainer: {
    flexDirection: 'column',
    flex: 0.6,
    marginLeft: 10,
    marginRight: 5,
    justifyContent: 'center',
  },
  tripTypeContainer: {
    flexDirection: 'column',
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripStartTime: {
    fontSize: 23,
    height: 35,
    textAlignVertical: 'bottom',
  },
  tripEndTime: {
    fontSize: 23,
    height: 35,
    textAlignVertical: 'bottom',
  },
  tripStartAddress: {
    fontSize: 18,
    height: 35,
    textAlignVertical: 'bottom',
  },
  tripEndAddress: {
    fontSize: 18,
    height: 35,
    textAlignVertical: 'bottom',
  },
  tripButtonLabel: {
    fontSize: 10,
  },
  emptyHeaderContainer: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyHeaderTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  emptyHeaderSubtitle: {
    margin: 10,
    fontSize: 18,
  },
});

function createListData(dataSource, props) {
  const sectionIds = [];
  const rowIds = [];
  const listData = {};

  let currentDateString = null;
  let currentRowIds = null;

  props.trips.forEach((trip) => {
    const tripDateString = moment(trip.startTimestamp).format('YYYY-MM-DD');

    if (currentDateString == null || currentDateString !== tripDateString) {
      sectionIds.push(tripDateString);
      currentRowIds = [];
      rowIds.push(currentRowIds);
      const formattedDate = moment(trip.startTimestamp).format('LL');
      // const dateFromNow = ''; // TODO
      listData[tripDateString] = {
        title: `${formattedDate}`,
      };
    }

    currentRowIds.push(trip.tripIndex);
    listData[`${tripDateString}:${trip.tripIndex}`] = trip;
    currentDateString = tripDateString;
  });

  return dataSource.cloneWithRowsAndSections(listData, sectionIds, rowIds);
}

function getSectionData(listData, sectionId) {
  return listData[sectionId];
}

function getRowData(listData, sectionId, rowId) {
  return listData[`${sectionId}:${rowId}`];
}

class TripListView extends React.Component {

  static propTypes = {
    // from mapStateToProps:
    trips: React.PropTypes.array.isRequired,
    currentOdometerValue: React.PropTypes.number.isRequired,
    // from mapDispatchToProps:
    startTracking: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    trips: [],
  }

  static renderSectionHeader(sectionData) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{ sectionData.title }</Text>
      </View>
    );
  }

  static renderTripTime(trip) {
    return (
      <View style={styles.tripTimeContainer}>
        <Text style={styles.tripStartTime}>
          { moment(trip.startTimestamp).format('HH:mm') }
        </Text>
        <Text style={styles.tripEndTime}>
          { moment(trip.endTimestamp).format('HH:mm') }
        </Text>
      </View>
    );
  }

  static renderTripAddresses(trip) {
    return (
      <View style={styles.tripAddressContainer}>
        <Text
          style={styles.tripStartAddress}
          numberOfLines={1}
        >
          Musterstraße 21, Musterstadt
        </Text>
        <Text
          style={styles.tripEndAddress}
          numberOfLines={1}
        >
          Musterfraustraße 311, Musterstadt
        </Text>
      </View>
    );
  }

  static renderTripType(trip) {
    return (
      <View style={styles.tripTypeContainer}>
        <Icon name="home" style={styles.tripButtonIcon} size={30} />
        <Text
          style={styles.tripDistance}
          numberOfLines={1}
        >
          { trip.endOdometerValue - trip.startOdometerValue } km
        </Text>
      </View>
    );
  }

  static renderTrip(trip) {
    return (
      <TouchableOpacity
        style={styles.tripItemContainer}
        onPress={() => Actions.tripBounds({ tripIndex: trip.tripIndex })}
      >
        {
          TripListView.renderTripTime(trip)
        }
        {
          TripListView.renderTripAddresses(trip)
        }
        {
          TripListView.renderTripType(trip)
        }
      </TouchableOpacity>
    );
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      getSectionData,
      getRowData,
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      dataSource: createListData(ds, props),
    };
    this.startTracking = this.startTracking.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderActionButtons = this.renderActionButtons.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: createListData(this.state.dataSource, nextProps),
    });
  }

  startTracking() {
    const self = this;
    Permissions.requestPermission('location')
    .then((response) => {
      self.setState({ locationPermission: response });

      if (response === 'authorized') {
        this.props.startTracking();
        Actions.tripRecording();
      }
    });
  }

  renderHeader() {
    if (!this.props.trips || this.props.trips.length > 0) {
      return null;
    }

    return (
      <View style={styles.emptyHeaderContainer}>
        <Text style={styles.emptyHeaderTitle}>{I18n.t('TripListView_empty_list_header_title')}</Text>
        <Text
          style={styles.emptyHeaderSubtitle}
        >
          { I18n.t('TripListView_empty_list_header_subtitle') }
        </Text>
      </View>
    );
  }

  renderActionButtons() {
    const currentOdometerValue = this.props.currentOdometerValue;
    return (
      <ActionButton buttonColor="#22CCDD" bgColor="rgba(0, 0, 0, 0.6)">
        <ActionButton.Item
          buttonColor="#3498db"
          title={I18n.t('TripListView_action_button_add_record_trip')}
          onPress={this.startTracking}
        >
          <Icon name="cogs" size={30} color="#fff" />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title={I18n.t('TripListView_action_button_add_trip')}
          onPress={() => Actions.tripBounds({
            trip: {
              startOdometerValue: currentOdometerValue,
            },
          })}
        >
          <Icon name="pencil" size={30} color="#fff" />
        </ActionButton.Item>
      </ActionButton>
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
          renderRow={TripListView.renderTrip}
          renderSectionHeader={TripListView.renderSectionHeader}
          renderSeparator={() => <View style={{ height: 1, backgroundColor: '#CCCCCC' }} />}
          enableEmptySections={false}
        />
        { this.renderActionButtons() }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips.trips.default.filter(trip => trip.type !== 'initialOffset').reverse().map((trip, index) => ({
    ...trip,
    tripIndex: index,
  })),
  currentOdometerValue:
    state.trips.trips.default[state.trips.trips.default.length - 1].endOdometerValue,
});

const mapDispatchToProps = dispatch => ({
  startTracking: bindActionCreators(startTracking, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListView);
