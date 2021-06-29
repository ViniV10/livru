import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
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
  //   const alerta = () => {
  //     Alert.alert('Confirmação', 'Deseja remover o livro da biblioteca?', [
  //       {text: 'CANCELAR', onPress: ''},
  //       {text: 'SIM', onPress: () => removeData()},
  //     ]);
  //   };

  //   const removeData = async () => {
  //     try {
  //       db.transaction(tx => {
  //         tx.executeSql(
  //           'DELETE FROM Livros WHERE id = ?',
  //           [item.id],
  //           onDelete(),
  //           error => {
  //             console.log(error);
  //           },
  //         );
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <View>
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
    </View>
  );
}

export default renderizarLivros;
