import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import Livros from './assets/BuscarLivros';
import style from './style';

export default function pesquisaLivros() {
  const [nome, setNome] = useState('');
  const [pesquisa, setPesquisa] = useState(false);

  function pesquisar(text) {
    setNome(text);
    setPesquisa(false);
  }

  return (
    <View style={style.containerGeral}>
      <View style={style.containerPesquisa}>
        <TextInput
          style={style.textInput}
          placeholder="Pesquise por livros!"
          placeholderTextColor="#7286A0"
          value={nome}
          onKeyPress={() => setPesquisa(true)}
          onChangeText={text => pesquisar(text)}
        />
      </View>
      <View style={style.livros}>
        {pesquisa ? <Livros nome={nome} /> : <Text> </Text>}
      </View>
    </View>
  );
}
