import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import Livros from './assets/BuscarLivros';
import estilos from './style';

export default function ({navigation}) {
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
