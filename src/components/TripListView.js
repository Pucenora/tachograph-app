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
  emptyHeaderButton: {
    margin: 10,
    fontSize: 18,
    textAlign: 'center',
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
    trips: React.PropTypes.array,
    // from mapDispatchToProps:
  };

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
    this.renderHeader = this.renderHeader.bind(this);
    this.renderTrip = this.renderTrip.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.renderTripTime = this.renderTripTime.bind(this);
    this.renderTripAddresses = this.renderTripAddresses.bind(this);
    this.renderTripType = this.renderTripType.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: createListData(this.state.dataSource, nextProps),
    });
  }

  renderHeader() {
    if (!this.props.trips || this.props.trips.length > 0) {
      return null;
    }

    return (
      <View style={styles.emptyHeaderContainer}>
        <Text style={styles.emptyHeaderTitle}>{I18n.t('TripListView_empty_list_header')}</Text>
        <Button
          style={styles.emptyHeaderButton}
          onPress={Actions.newTripTab}
        >
          { I18n.t('TripListView_empty_list_button') }
        </Button>
      </View>
    );
  }

  renderSectionHeader(sectionData) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{ sectionData.title }</Text>
      </View>
    );
  }

  renderTripTime(trip) {
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

  renderTripAddresses(trip) {
    return (
      <View style={styles.tripAddressContainer}>
        <Text
          style={styles.tripStartAddress}
          numberOfLines={1}
        >
          Engelstraße 77, Mainz
        </Text>
        <Text
          style={styles.tripEndAddress}
          numberOfLines={1}
        >
          Rheindorfer Str. 257, Langenfeld
        </Text>
      </View>
    );
  }

  renderTripType(trip) {
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

  renderTrip(trip) {
    return (
      <TouchableOpacity
        style={styles.tripItemContainer}
        onPress={() => Actions.tripEditBounds({ tripIndex: trip.tripIndex })}
      >
        {
          this.renderTripTime(trip)
        }
        {
          this.renderTripAddresses(trip)
        }
        {
          this.renderTripType(trip)
        }
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ListView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        dataSource={this.state.dataSource}
        renderHeader={this.renderHeader}
        renderRow={this.renderTrip}
        renderSectionHeader={this.renderSectionHeader}
        renderSeparator={() => <View style={{ height: 1, backgroundColor: '#CCCCCC' }} />}
        enableEmptySections={false}
      />
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips.trips.filter(trip => trip.type !== 'initialOffset').reverse().map((trip, index) => ({
    ...trip,
    tripIndex: index,
  })),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TripListView);
