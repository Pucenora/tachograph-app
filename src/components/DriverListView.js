import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import commonStyles from './commonStyles';

const styles = StyleSheet.create({

});

class DriverListView extends React.Component {

  static propTypes = {
    // from mapStateToProps:
    // from mapDispatchToProps:
  };

  render() {
    return (
      <ScrollView style={commonStyles.container} keyboardShouldPersistTaps="always">
        <Text>TODO</Text>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DriverListView);
