import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import style from './style';
import SQLite from 'react-native-sqlite-storage';

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

function renderizarLivros({item, _id, onItemClick, onDelete}) {
  useEffect(() => {
    createTable();
  }, []);

  const createTable = async () => {
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Notas (id INTEGER PRIMARY KEY AUTOINCREMENT, bookId	INTEGER, title TEXT, description TEXT, priority INTEGER)',
          [],
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const alerta = () => {
    Alert.alert('Confirmação', 'Deseja remover o livro da biblioteca?', [
      {text: 'CANCELAR', onPress: ''},
      {text: 'SIM', onPress: () => removeData()},
    ]);
  };

  const removeData = async () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Livros WHERE id = ?',
          [item.id],
          onDelete(),
          error => {
            console.log(error);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => onItemClick(_id)}
      onLongPress={() => alerta()}>
      <View style={style.container}>
        <View>
          {item.thumbnail ? (
            <Image style={style.imagens} source={{uri: item.thumbnail}} />
          ) : (
            <Image
              style={style.imagens}
              source={require('../../../../../TelaPesquisaLivros/assets/images/semImagem.png')}
            />
          )}
        </View>

        <View style={style.livros}>
          <Text numberOfLines={1} style={style.tituloLivros}>
            {item.title}
            {/* {item.title.length < 15
              ? `${item.title}`
              : `${item.title.substring(0, 12)}...`} */}
          </Text>
          <Text numberOfLines={1} style={style.infoLivros}>
            Autoria:{' '}
            {item.authors !== undefined || item.authors > 0
              ? item.authors
              : '*sem informações*'}
            {item.authors > 0 ? '...' : ''}
          </Text>
          {/* <Text numberOfLines={1} style={style.infoLivros}>
            Páginas:{' '}
            {item.pageCount !== undefined
              ? item.pageCount
              : '*sem informações*'}
          </Text> */}
          <Text numberOfLines={1} style={style.infoLivros}>
            Editora:{' '}
            {item.publisher !== undefined
              ? item.publisher
              : '*sem informações*'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default renderizarLivros;
