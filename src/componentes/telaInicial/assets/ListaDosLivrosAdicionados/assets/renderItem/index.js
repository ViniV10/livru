import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import style from './style';

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

function renderizarLivros({item, index, onItemClick, onDelete}) {
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
    Alert.alert(
      'Confirmação',
      'Deseja remover o livro e suas respectivas notas da biblioteca?',
      [
        {text: 'CANCELAR', onPress: () => swipeableRef.current.close()},
        {text: 'SIM', onPress: () => removeData()},
      ],
    );
  };

  const rightSwipe = () => {
    return (
      <TouchableOpacity onPress={() => alerta()} style={style.delete}>
        <MaterialCommunityIcons name="delete" size={30} color="#E5E5E5" />
      </TouchableOpacity>
    );
  };

  const swipeableRef = useRef(null);

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
          removeData2(),
          swipeableRef.current.close(),
          ToastAndroid.show('Livro removido', ToastAndroid.SHORT),
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeData2 = async () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Notas WHERE bookId = ?',
          [item.id],
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
    <Swipeable
      renderRightActions={rightSwipe}
      onSwipeableRightWillOpen={alerta}
      ref={swipeableRef}>
      <TouchableOpacity onPress={() => onItemClick(index)}>
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
              {item.authors == undefined || item.authors == ''
                ? '-'
                : item.authors}
            </Text>
            <Text numberOfLines={1} style={style.infoLivros}>
              Editora:{' '}
              {item.publisher == undefined || item.publisher == ''
                ? '-'
                : item.publisher}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

export default renderizarLivros;
