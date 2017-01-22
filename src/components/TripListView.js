import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  Dimensions,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { bindActionCreators } from 'redux';

const { width } = Dimensions.get('window');

const unselectedItemMargin = 5;
const unselectedItemSize = (width - (4 * unselectedItemMargin) - 10) / 2;

const selectedItemMargin = 18;
const selectedItemSize = (width - (4 * selectedItemMargin) - 10) / 2;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingTop: 30,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 30,
  },
  unselectedItem: {
  //  backgroundColor: colors.appItemBackgroundColor,
    margin: unselectedItemMargin,
    width: unselectedItemSize,
    height: unselectedItemSize,
  },
  selectedItem: {
  //  backgroundColor: colors.appItemBackgroundColor,
    margin: selectedItemMargin,
    width: selectedItemSize,
    height: selectedItemSize,
  },
  appIcon: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 15,
  },
  appName: {
    textAlign: 'center',
//    color: colors.appItemTextColor,
    fontSize: 22,
    marginBottom: 5,
  },
  appStatusContainer: {
    alignItems: 'center',
  },
  appStatus: {
    flexDirection: 'row',
  },
});

class TripListView extends React.Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(props.trips),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.trips),
    });
  }

  renderItem(trip) {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            Vibration.vibrate([0, 50]);
          }}
        >
          <View>
            <TimeAgo time={trip.startTimestamp} />
            <Text>{ trip.endOdometerValue - trip.startOdometerValue }</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <ListView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        dataSource={this.state.dataSource}
        renderRow={rowData => this.renderItem(rowData)}
        enableEmptySections
      />
    );
  }
}

TripListView.propTypes = {
  // from mapStateToProps:
  trips: React.PropTypes.array,
  // from mapDispatchToProps:

};

const mapStateToProps = state => ({
  trips: state.trips.trips,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TripListView);
