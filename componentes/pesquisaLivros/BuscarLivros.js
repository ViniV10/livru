import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import * as APIConfig from './api';
import renderizarLivros from './informaçõesDosLivros';

export default function (props) {
  const [carregando, setCarregando] = useState(true);
  const [dados, setDados] = useState([]);

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

  return (
    <View>
      {carregando ? (
        <View style={estilos.loading}>
          <ActivityIndicator size="large" color="#29f" />
        </View>
      ) : (
        <FlatList
          data={dados}
          keyExtractor={({id}, index) => id}
          renderItem={renderizarLivros}
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
