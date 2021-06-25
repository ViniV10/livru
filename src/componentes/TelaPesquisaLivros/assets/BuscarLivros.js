import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
} from 'react-native';
import * as APIConfig from './API/api';
import {useNavigation} from '@react-navigation/native';
import RenderizarLivros from './informaçõesDosLivros/informaçõesDosLivros';

export default function (props, {item}) {
  //dados = dados dos itens pesquisados
  const [dados, setDados] = useState([]);

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch(
      APIConfig.googleBooksURL +
        props.nome +
        APIConfig.keyParaPesquisa +
        '&maxResults=40',
    )
      .then(resp => resp.json())
      .then(json => setDados(json.items))
      .catch(() => alert('Erro ao carregar dados'))
      .finally(() => setCarregando(false));
  }, []);

  const {navigate} = useNavigation();

  return (
    <View>
      {carregando ? (
        <View style={estilos.loading}>
          <ActivityIndicator size="large" color="#29f" />
        </View>
      ) : (
        <FlatList
          onScroll={Keyboard.dismiss}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="never"
          data={dados}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <RenderizarLivros
              item={item}
              onItemClick={navigate.bind(this, 'LivroExpandido', {item})}
            />
          )}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  loading: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
});
