import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#90E0EF',
    borderLeftWidth: 15,
    borderLeftColor: '#023E8A',
    borderRadius: 10,
    height: 150,
    marginTop: 5,
    marginBottom: 5,
    margin: 5,
  },
  livros: {
    margin: 5,
    padding: 10,
    flex: 1,
  },
  tituloLivros: {
    fontSize: 16,
    marginBottom: 15,
    color: '#023E8A',
    justifyContent: 'center',
  },
  infoLivros: {
    fontSize: 12,
    marginVertical: 5,
  },
  imagens: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    flex: 1,
    margin: 5,
  },
});
