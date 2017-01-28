import React from 'react';
import RNDrawer from 'react-native-drawer';
import { DefaultRenderer } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DrawerMenuView from './DrawerMenuView';
import { drawerOpenStateChanged } from '../actions';

class Drawer extends React.Component {
  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <RNDrawer
        open={this.props.drawerOpen}
        onOpen={() => this.props.drawerOpenStateChanged(true)}
        onClose={() => this.props.drawerOpenStateChanged(false)}
        type="displace"
        content={<DrawerMenuView {...this.props} />}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={(ratio) => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </RNDrawer>
    );
  }
}

function mapStateToProps(state) {
  return {
    drawerOpen: state.drawer.drawerOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    drawerOpenStateChanged: bindActionCreators(drawerOpenStateChanged, dispatch),
  };
}

Drawer.propTypes = {
  navigationState: React.PropTypes.object,
  onNavigate: React.PropTypes.func,
  // from mapStateToProps:
  drawerOpen: React.PropTypes.bool,
  // from mapDispatchToProps:
  drawerOpenStateChanged: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
