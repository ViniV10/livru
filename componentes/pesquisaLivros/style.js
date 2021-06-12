import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#999',
    borderWidth: 2,
    borderColor: '#000',
    height: 150,
    marginTop: 5,
  },
  livros: {
    margin: 15,
    padding: 10,
    flex: 1,
  },
  imagens: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    flex: 1,
    margin: 5,
  },
});
