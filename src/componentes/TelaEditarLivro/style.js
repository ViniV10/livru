import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  textInput: {
    flex: 1,
    backgroundColor: '#90E0EF',
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  botãoSemFoto: {
    backgroundColor: '#023E8A',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 45,
    height: 45,
    marginRight: 5,
  },
  botãoComFoto: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    marginRight: 5,
  },
  foto: {
    width: 55,
    height: 50,
    resizeMode: 'contain',
  },
});
