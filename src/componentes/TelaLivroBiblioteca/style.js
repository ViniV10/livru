import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  containerImagem: {
    alignItems: 'center',
  },
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
  containerInfo: {
    margin: 2,
    alignSelf: 'flex-start',
    flexDirection: 'column',
    borderBottomLeftRadius: 5,
  },
  texto: {
    flexDirection: 'row',
    margin: 0,
    padding: 3,
    alignItems: 'center',
  },
  textoPrincipal: {
    fontSize: 15,
    margin: 5,
    marginRight: 50,
    // width: 75,
    alignSelf: 'center',
    color: '#023E8A',
  },
  titulo: {
    fontSize: 18,
    width: 320,
    margin: 5,
    padding: 0,
    borderRadius: 5,
    color: '#023E8A',
  },
  descrição: {
    fontSize: 16,
    margin: 12,
    marginBottom: 10,
  },
  botão: {
    position: 'absolute',
    margin: 20,
    marginLeft: 320,
  },
});
