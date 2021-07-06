import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
  },
  button: {
    //position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 70 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 10,
    shadowColor: '#023E8A',
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 10,
    },
  },
  menu: {
    backgroundColor: '#023E8A',
    marginLeft: 210,
  },
  submenu: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: '#023E8A',
  },
  text: {
    color: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#023E8A',
    borderRadius: 10,
    marginRight: 10,
    height: 35,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
