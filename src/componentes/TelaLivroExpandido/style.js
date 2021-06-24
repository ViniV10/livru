import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    flex: 1,
  },
  containerImagem: {
    alignItems: 'center',
  },
  imagem: {
    flex: 1,
    width: 130,
    marginBottom: 50,
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
  containerInfo: {
    margin: 1,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  texto: {
    flexDirection: 'column',
    margin: 0,
    padding: 10,
    alignItems: 'center',
  },
  textoPrincipal: {
    fontSize: 16,
    margin: 5,
    width: 75,
    alignSelf: 'center',
    color: '#023E8A',
  },
  titulo: {
    fontSize: 20,
    margin: 5,
    padding: 5,
    backgroundColor: '#E5E5E5',
    borderRadius: 5,
    color: '#023E8A',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  descrição: {
    fontSize: 16,
    margin: 10,
    marginBottom: 10,
  },
});
