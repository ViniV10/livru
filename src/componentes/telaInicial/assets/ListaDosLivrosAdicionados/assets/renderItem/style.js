import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#90E0EF',
    borderLeftWidth: 10,
    borderLeftColor: '#023E8A',
    borderRadius: 10,
    height: 80,
    marginTop: 8,
    marginBottom: 5,
    margin: 5,
    padding: 0,
    marginHorizontal: 15,
  },
  livros: {
    margin: 2,
    padding: 5,
  },
  tituloLivros: {
    fontSize: 15,
    marginBottom: 4,
    color: '#023E8A',
    justifyContent: 'center',
    width: 220,
  },
  infoLivros: {
    fontSize: 12,
    marginVertical: 2,
    width: 230,
  },
  imagens: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    flex: 1,
    margin: 5,
    marginLeft: 7,
  },
  delete: {
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#023E8A',
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 5,
    margin: 5,
  },
});
