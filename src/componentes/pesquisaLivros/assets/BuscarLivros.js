import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import * as APIConfig from './API/api';
import RenderizarLivros from './informaçõesDosLivros/informaçõesDosLivros';
import {useNavigation} from '@react-navigation/native';

export default function (props, {item}) {
  const [carregando, setCarregando] = useState(true);
  const [dados, setDados] = useState([]);

  useEffect(() => {
    fetch(
      APIConfig.googleBooksURL +
        props.nome +
        APIConfig.keyParaPesquisa +
        '&maxResults=5',
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
