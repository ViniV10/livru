import React from 'react';
import {View, Text, Image} from 'react-native';
import style from './style';

const renderizarLivros = ({item}) => {
  return (
    <View style={style.container}>
      <View>
        {item.volumeInfo.imageLinks ? (
          <Image
            style={style.imagens}
            source={{uri: item.volumeInfo.imageLinks.thumbnail}}
          />
        ) : (
          <Image
            style={style.imagens}
            source={require('../images/semImagem.png')}
          />
        )}
      </View>
      <View style={style.livros}>
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
    </View>
  );
};

export default renderizarLivros;

// for (i = 0; i <= item.volumeInfo.authors.length ; i++) {
//   {i===item.volumeInfo.authors.length? `${item.volumeInfo.authors[i]}` : `${item.volumeInfo.authors[i]}, `}
// }
