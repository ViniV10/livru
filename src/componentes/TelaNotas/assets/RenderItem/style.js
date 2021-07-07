import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 10,
  },
  titulo: {
    width: 290,
    fontSize: 17,
    color: '#023E8A',
  },
  descrição: {
    width: 290,
  },
  botão: {
    position: 'absolute',
    margin: 20,
    marginLeft: 320,
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

  //
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 5,
    backgroundColor: '#E5E5E5',
    borderRadius: 20,
    marginTop: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    margin: 10,
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#023E8A',
  },
  textStyle: {
    fontSize: 15,
  },
  modalText: {
    color: '#023E8A',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  closeCircle: {
    alignSelf: 'center',
  },
});
