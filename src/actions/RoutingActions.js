export function drawerOpenStateChanged(open) {
  return {
    type: 'DRAWER_OPEN_STATE_CHANGED',
    open,
  };
}

export default {
  drawerOpenStateChanged,
};
