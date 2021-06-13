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
    <View style={estilos.container}>
      <TextInput
        style={estilos.textInput}
        placeholder="Digite o nome do livro"
        value={nome}
        onChangeText={text => pesquisar(text)}
      />
      <TouchableHighlight onPress={() => setPesquisa(true)}>
        <View style={estilos.btn}>
          <Text style={estilos.txtBtn}>Pesquisar</Text>
        </View>
      </TouchableHighlight>
      <View style={estilos.livros}>
        {pesquisa ? <Livros nome={nome} /> : <Text> </Text>}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    color: '#033E8C',
    borderColor: '#033E8C',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  btn: {
    backgroundColor: '#033E8C',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 15,
  },
  txtBtn: {
    color: '#fff',
  },
  container: {
    backgroundColor: '#BF9F78',
    flex: 1,
  },
  livros: {
    marginBottom: 130,
  },
});
