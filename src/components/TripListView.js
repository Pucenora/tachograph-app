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
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import TimeAgo from 'react-native-timeago';

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

  },
  itemContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#e4e4e4',
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

  renderItem(trip, sectionID, rowId) {
    console.log(trip);
    if (trip.type === 'initialOffset') {
      return (
        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => {
              Vibration.vibrate([0, 50]);
            }}
          >
            <View>
              <TimeAgo time={trip.endTimestamp} />
              <Text style={{ fontStyle: 'italic' }}>Übertrag</Text>
              <Text style={{ fontStyle: 'italic' }}>{ trip.endOdometerValue } km</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => Actions.tripEditBounds({ tripIndex: parseInt(rowId, 10) })}
      >
        <View>
          <TimeAgo time={trip.startTimestamp} />
          <Text>{ trip.endOdometerValue - trip.startOdometerValue } km</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ListView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
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
