import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  textInput: {
    flex: 1,
    backgroundColor: '#90E0EF',
    borderRadius: 10,
    margin: 10,
    padding: 15,
  },
  buttonAdicionar: {
    backgroundColor: '#023E8A',
    display: 'flex',
    height: 40,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    marginBottom: 20,
  },

  //
  botãoSemFoto: {
    backgroundColor: '#023E8A',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    width: 45,
    height: 45,
    marginRight: 5,
    marginTop: 0,
  },
  botãoComFoto: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    marginRight: 5,
    marginTop: 10,
  },
  foto: {
    width: 55,
    height: 50,
    resizeMode: 'contain',
  },
  buttonView: {
    flexDirection: 'row',
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: '#E5E5E5',
    borderRadius: 20,
    padding: 35,
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
    alignItems: 'center',
    margin: 5,
    color: '#E5E5E5',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: '#023E8A',
    marginBottom: 15,
    textAlign: 'center',
  },
});
