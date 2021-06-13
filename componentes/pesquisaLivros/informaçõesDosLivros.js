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
        <Text numberOfLines={1} style={style.tituloLivros}>
          {item.volumeInfo.title}
        </Text>
        <Text numberOfLines={1} style={style.infoLivros}>
          Autoria:{' '}
          {item.volumeInfo.authors !== undefined || item.volumeInfo.authors > 0
            ? item.volumeInfo.authors[0]
            : '*sem informações*'}
          {item.volumeInfo.authors > 0 ? '...' : ''}
        </Text>
        <Text style={style.infoLivros}>
          Páginas:{' '}
          {item.volumeInfo.pageCount !== undefined
            ? item.volumeInfo.pageCount
            : '*sem informações*'}
        </Text>
        <Text style={style.infoLivros}>
          Editora:{' '}
          {item.volumeInfo.publisher !== undefined
            ? item.volumeInfo.publisher
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
