import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
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
      {carregando
        ? <ActivityIndicator /> && console.warn(carregando)
        : (
            <FlatList
              data={dados}
              keyExtractor={({id}, index) => id}
              renderItem={renderizarLivros}
            />
          ) && console.warn(dados)}
    </View>
  );
}
