import React from 'react';
import {View, Text, Image} from 'react-native';
import style from './style';

const renderizarLivros = ({item}) => {
  return (
    <View style={style.livros}>
      <Text>iae</Text>
      <Text>Título: {item.volumeInfo.title}</Text>
      <Text>
        Autoria:{' '}
        {item.volumeInfo.authors !== undefined || item.volumeInfo.authors > 0
          ? item.volumeInfo.authors
          : '*sem informações*'}
      </Text>
      <Text>
        Páginas:{' '}
        {item.volumeInfo.pageCount !== undefined
          ? item.volumeInfo.pageCount
          : '*sem informações*'}
      </Text>
    </View>
  );
};

export default renderizarLivros;
