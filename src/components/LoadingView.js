import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const LoadingView = () => (
  <View style={styles.indicatorContainer}>
    <ActivityIndicator animating size="large" />
  </View>
);

export default LoadingView;
