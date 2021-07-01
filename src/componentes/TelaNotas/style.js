import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  imagem: {
    flex: 1,
    width: 130,
    marginBottom: 10,
    height: 'auto',
    resizeMode: 'contain',
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalNotas: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    margin: 10,
  },
});
