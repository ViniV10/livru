import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
  },
  button: {
    //position: 'absolute',
    width: 55,
    height: 55,
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
    width: 45,
    height: 45,
    borderRadius: 48 / 2,
    backgroundColor: '#023E8A',
  },
  text: {
    color: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    backgroundColor: '#023E8A',
    borderRadius: 15,
    marginRight: 5,
    height: 35,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
