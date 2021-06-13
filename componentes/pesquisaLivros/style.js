import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#035AA6',
    borderWidth: 2,
    borderColor: '#565855',
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
    color: '#919A79',
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
