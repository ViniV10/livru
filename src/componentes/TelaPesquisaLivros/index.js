import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
        <Pressable style={style.searchButton} onPress={() => setPesquisa(true)}>
          <MaterialCommunityIcons name="magnify" size={28} color="#023E8A" />
        </Pressable>
      </View>
      <View style={style.livros}>
        {pesquisa ? <Livros nome={nome} /> : <Text />}
      </View>
    </View>
  );
}
