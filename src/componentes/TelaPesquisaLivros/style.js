import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  containerPesquisa: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5%',
    width: '90%',
    height: 45,
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 1,
  },
  textInput: {
    flex: 3,
  },
  btn: {
    backgroundColor: '#7286A0',
    padding: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  txtBtn: {
    color: '#A3BFA8',
  },
  containerGeral: {
    backgroundColor: '#E5E5E5',
    flex: 1,
  },
  livros: {
    marginBottom: 80,
  },
});
