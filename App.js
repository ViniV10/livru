import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import Livros from './componentes/pesquisaLivros/BuscarLivros';

export default function () {
  const [nome, setNome] = useState('');
  const [pesquisa, setPesquisa] = useState(false);

  function pesquisar(text) {
    setNome(text);
    setPesquisa(false);
  }

  return (
    <View style={estilos.containerGeral}>
      <View style={estilos.containerPesquisa}>
        <TextInput
          style={estilos.textInput}
          placeholder="Digite o nome do livro"
          placeholderTextColor="#7286A0"
          value={nome}
          onKeyPress={() => setPesquisa(true)}
          onChangeText={text => pesquisar(text)}
        />
      </View>
      <View style={estilos.livros}>
        {pesquisa ? <Livros nome={nome} /> : <Text> </Text>}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  containerPesquisa: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5%',
    width: '90%',
    height: 50,
    backgroundColor: '#90E0EF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#023E8A',
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
    marginBottom: 100,
  },
});

{
  /* <TouchableHighlight onPress={() => setPesquisa(true)}>
        <View style={estilos.btn}>
          <Text style={estilos.txtBtn}>Pesquisar</Text>
        </View>
      </TouchableHighlight> */
}
