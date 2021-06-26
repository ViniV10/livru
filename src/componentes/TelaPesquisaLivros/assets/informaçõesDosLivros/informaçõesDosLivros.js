import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import style from './style';
import SQLite from 'react-native-sqlite-storage';
import {useNavigation} from '@react-navigation/native';

const db = SQLite.openDatabase(
  {
    name: 'Principal',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

function renderizarLivros({item, _id, onItemClick}) {
  const [autores, setAutores] = useState('');

  useEffect(() => {
    setAuthors();
  }, []);

  const setAuthors = () => {
    var temp = [];
    if (
      item.volumeInfo.authors != undefined &&
      item.volumeInfo.authors.length > 0
    ) {
      for (let i = 0; i < item.volumeInfo.authors.length; ++i) {
        temp += item.volumeInfo.authors[i];
        if (i < item.volumeInfo.authors.length - 1) {
          temp += ', ';
        }
      }
      setAutores(temp);
    }
  };

  const alerta = () => {
    Alert.alert('Confirmação', 'Deseja adicionar o livro à biblioteca?', [
      {text: 'CANCELAR', onPress: ''},
      {text: 'SIM', onPress: () => setData()},
    ]);
  };

  const setData = async () => {
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          'INSERT INTO Livros (thumbnail, authors, publishedDate, pages, description, title, googleId, language, publisher, categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            item.volumeInfo.imageLinks
              ? item.volumeInfo.imageLinks.thumbnail
              : '',

            autores,

            item.volumeInfo.publishedDate !== undefined
              ? item.volumeInfo.publishedDate
              : '',

            item.volumeInfo.pageCount ? item.volumeInfo.pageCount : '',

            item.volumeInfo.description !== undefined
              ? item.volumeInfo.description
              : '',

            item.volumeInfo.title,

            item.id,

            item.volumeInfo.language !== undefined
              ? item.volumeInfo.language
              : '',

            item.volumeInfo.publisher !== undefined
              ? item.volumeInfo.publisher
              : '',

            item.volumeInfo.categories !== undefined
              ? item.volumeInfo.categories[0]
              : '',
          ],
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => onItemClick(_id)}
      onLongPress={() => alerta()}
      // onPressIn={Keyboard.dismiss}
    >
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
            {item.volumeInfo.authors !== undefined ||
            item.volumeInfo.authors > 0
              ? item.volumeInfo.authors[0]
              : '*sem informações*'}
            {item.volumeInfo.authors > 0 ? '...' : ''}
          </Text>
          <Text numberOfLines={1} style={style.infoLivros}>
            Páginas:{' '}
            {item.volumeInfo.pageCount !== undefined
              ? item.volumeInfo.pageCount
              : '*sem informações*'}
          </Text>
          <Text numberOfLines={1} style={style.infoLivros}>
            Editora:{' '}
            {item.volumeInfo.publisher !== undefined
              ? item.volumeInfo.publisher
              : '*sem informações*'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default renderizarLivros;

// for (i = 0; i <= item.volumeInfo.authors.length ; i++) {
//   {i===item.volumeInfo.authors.length? `${item.volumeInfo.authors[i]}` : `${item.volumeInfo.authors[i]}, `}
// }
