import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function LivroExpandido({route, item}) {
  const dados = route.params.item;
  return (
    <View style={estilos.container}>
      <Text numberOfLines={1}>{dados.volumeInfo.title}</Text>
      <Text numberOfLines={1}>
        Autoria:{' '}
        {dados.volumeInfo.authors !== undefined || dados.volumeInfo.authors > 0
          ? dados.volumeInfo.authors[0]
          : '*sem informações*'}
        {dados.volumeInfo.authors > 0 ? '...' : ''}
      </Text>
      <Text numberOfLines={1}>
        Páginas:{' '}
        {dados.volumeInfo.pageCount !== undefined
          ? dados.volumeInfo.pageCount
          : '*sem informações*'}
      </Text>
      <Text numberOfLines={1} s>
        Editora:{' '}
        {dados.volumeInfo.publisher !== undefined
          ? dados.volumeInfo.publisher
          : '*sem informações*'}
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: 15,
  },
  texto: {
    margin: 5,
  },
});
