import React, {useState} from 'react';
import {
  Alert,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

import styles from './style';

const Alerta = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [thumbnail, setThumbnail] = useState(props.thumbnail);

  const fotoCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setThumbnail(image.path);
      setModalVisible(!modalVisible);
    });
  };

  const fotoGaleria = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setThumbnail(image.path);
      setModalVisible(!modalVisible);
    });
  };

  const Alerta = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Como você deseja adicionar a foto?
              </Text>
              <View style={styles.buttonView}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => fotoCamera()}>
                  <Text style={styles.textStyle}>Câmera</Text>
                  <MaterialCommunityIcons
                    name="camera"
                    color={'#90E0EF'}
                    size={27}
                  />
                </Pressable>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => fotoGaleria()}>
                  <Text style={styles.textStyle}>Galeria</Text>
                  <MaterialCommunityIcons
                    name="image-multiple"
                    color={'#90E0EF'}
                    size={27}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const BotãoImagem = () => {
    return (
      <View style={{marginTop: 0}}>
        {thumbnail == undefined || thumbnail == '' ? (
          <TouchableOpacity
            style={styles.botãoSemFoto}
            onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons name="image" color={'#90E0EF'} size={27} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.botãoComFoto}>
            <Image source={{uri: thumbnail}} style={styles.foto} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={{marginTop: 10}}>
      <BotãoImagem />
      <Alerta />
    </View>
  );
};

export default Alerta;
