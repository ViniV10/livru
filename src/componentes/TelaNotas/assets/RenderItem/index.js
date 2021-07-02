import React, {useEffect, useRef} from 'react';
import {View, Text, ToastAndroid, TouchableOpacity, Alert} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
  const swipeableRef = useRef(null);
  const rightSwipe = () => {
    return (
      <View style={style.delete}>
        <MaterialCommunityIcons name="delete" size={27} color="#E5E5E5" />
      </View>
    );
  };

  const alerta = () => {
    Alert.alert('Confirmação', 'Deseja remover esta nota?', [
      {text: 'CANCELAR', onPress: () => swipeableRef.current.close()},
      {text: 'SIM', onPress: () => removeData()},
    ]);
  };

  const removeData = async () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Notas WHERE id = ?',
          [item.id],
          onDelete(),
          error => {
            console.log(error);
          },
          ToastAndroid.show('Nota removida', ToastAndroid.SHORT),
          swipeableRef.current.close(),
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Swipeable
      renderRightActions={rightSwipe}
      ref={swipeableRef}
      onSwipeableRightWillOpen={alerta}>
      <View style={{flexDirection: 'row'}}>
        <View style={style.container}>
          <Text style={style.titulo}>{item.title}</Text>
          <Text style={style.descrição}>{item.description}</Text>
        </View>
        <TouchableOpacity style={style.botão} onPress={() => onItemClick(_id)}>
          <MaterialCommunityIcons name="pencil" color={'#023E8A'} size={21} />
        </TouchableOpacity>
      </View>
      {/* Linha divisória */}
      <View
        style={{
          borderBottomColor: '#023E8A',
          borderBottomWidth: 2,
        }}
      />
    </Swipeable>
  );
}

export default renderizarLivros;
