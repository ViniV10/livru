import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
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
          error => {
            console.log(error);
          },
          ToastAndroid.show('Nota removida', ToastAndroid.SHORT),
          swipeableRef.current.close(),
          onDelete(),
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const NotaExpandida = () => {
    return (
      <View style={style.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <ScrollView>
            <View style={style.centeredView}>
              <View style={style.modalView}>
                <Text style={style.modalText}>{item.title}</Text>
                <Text style={style.textStyle}> {item.description}</Text>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={rightSwipe}
      ref={swipeableRef}
      onSwipeableRightWillOpen={alerta}>
      <View style={{flexDirection: 'row'}}>
        <View style={style.container}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text numberOfLines={2} style={style.titulo}>
              {item.title}
            </Text>
            <Text numberOfLines={5} style={style.descrição}>
              {item.description}
            </Text>
          </TouchableOpacity>
        </View>
        {modalVisible ? <NotaExpandida /> : <View />}
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
