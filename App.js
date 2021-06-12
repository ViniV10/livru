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
  const [nome, setNome] = useState('otelo shakespeare');
  const [pesquisa, setPesquisa] = useState(true);

  return (
    <View style={estilos.container}>
      <TextInput
        style={estilos.textInput}
        placeholder="Digite o nome do livro"
        value={nome}
        onChangeText={text => setNome(text)}
      />
      {pesquisa ? <Livros nome={nome} /> : <Text>Nada por aqui :/</Text>}
    </View>
  );
}

const estilos = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  btn: {
    backgroundColor: '#f22',
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
    backgroundColor: '#fff',
    margin: 5,
  },
});
