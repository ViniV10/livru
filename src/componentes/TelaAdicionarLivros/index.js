import React, {useEffect, useState} from 'react';
import {
  Pressable,
  View,
  ScrollView,
  TextInput,
  Modal,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';
import SQLite from 'react-native-sqlite-storage';
import style from './style';
// import Alerta from './assets/Alerta/index';

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

export default function Home({navigation}) {
  const [id, setId] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [authors, setAuthors] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [pages, setPages] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [publisher, setPublisher] = useState('');
  const [categories, setCategories] = useState('');
  const [read, setRead] = useState(0);

  const setData = async () => {
    if (title.length == 0) {
      alert('Por favor, digite o título do livro');
    } else {
      try {
        await db.transaction(async tx => {
          await tx.executeSql(
            'INSERT INTO Livros (thumbnail, authors, publishedDate, pages, description, title, language, publisher, categories, read) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
              thumbnail,
              authors,
              publishedDate,
              pages,
              description,
              title,
              language,
              publisher,
              categories,
              read,
            ],
          );
        });
        navigation.navigate('Home');
        ToastAndroid.show('Livro adicionado', ToastAndroid.SHORT);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const Alerta = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const fotoCamera = () => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.6,
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
        compressImageQuality: 0.6,
      }).then(image => {
        setThumbnail(image.path);
        setModalVisible(!modalVisible);
      });
    };

    const CaixaDeAlerta = () => {
      return (
        <View style={style.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={style.centeredView}>
              <View style={style.modalView}>
                <Pressable
                  style={style.closeCircle}
                  onPress={() => setModalVisible(false)}>
                  <MaterialCommunityIcons
                    name="circle-outline"
                    color={'#023E8A'}
                    size={14}
                  />
                </Pressable>
                <View style={{padding: 35}}>
                  <Text style={style.modalText}>
                    Como você deseja adicionar a foto?
                  </Text>
                  <View style={style.buttonView}>
                    <Pressable
                      style={[style.button, style.buttonClose]}
                      onPress={() => fotoCamera()}>
                      <Text style={style.textStyle}>Câmera</Text>
                      <MaterialCommunityIcons
                        name="camera"
                        color={'#90E0EF'}
                        size={27}
                      />
                    </Pressable>

                    <Pressable
                      style={[style.button, style.buttonClose]}
                      onPress={() => fotoGaleria()}>
                      <Text style={style.textStyle}>Galeria</Text>
                      <MaterialCommunityIcons
                        name="image-multiple"
                        color={'#90E0EF'}
                        size={27}
                      />
                    </Pressable>
                  </View>
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
              style={style.botãoSemFoto}
              onPress={() => setModalVisible(true)}>
              <MaterialCommunityIcons
                name="image"
                color={'#90E0EF'}
                size={27}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={style.botãoComFoto}>
              <Image source={{uri: thumbnail}} style={style.foto} />
            </TouchableOpacity>
          )}
        </View>
      );
    };

    return (
      <View style={{marginTop: 10}}>
        <BotãoImagem />
        <CaixaDeAlerta />
      </View>
    );
  };
  // const removeTable = async () => {
  //   try {
  //     db.transaction(tx => {
  //       tx.executeSql(
  //         'DROP TABLE Livros',
  //         [],
  //         () => {
  //           navigation.navigate('Home');
  //         },
  //         error => {
  //           console.log(error);
  //         },
  //       );
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#E5E5E5'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TextInput
          style={style.textInput}
          placeholder="nome do livro"
          onChangeText={value => setTitle(value)}
        />

        <View style={{marginTop: 10}}>
          <Alerta />
        </View>
      </View>

      <TextInput
        style={style.textInput}
        placeholder="autoria"
        onChangeText={value => setAuthors(value)}
      />
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={style.textInput}
          value={publishedDate}
          placeholder="data de publicação"
          maxLength={7}
          keyboardType="numeric"
          onChangeText={text => {
            setPublishedDate(
              text.length === 3 && !text.includes('/')
                ? `${text.substring(0, 2)}/${text.substring(2)}`
                : text,
            );
          }}
        />
        <TextInput
          style={style.textInput}
          keyboardType="numeric"
          placeholder="número de páginas"
          onChangeText={value => setPages(value)}
        />
      </View>
      <TextInput
        style={style.textInput}
        placeholder="editora"
        onChangeText={value => setPublisher(value)}
      />
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={style.textInput}
          placeholder="categoria(s)"
          onChangeText={value => setCategories(value)}
        />
        <TextInput
          style={style.textInput}
          placeholder="linguagem"
          onChangeText={value => setLanguage(value)}
        />
      </View>

      <View style={{height: 200}}>
        <TextInput
          style={style.textInput}
          placeholder="descrição"
          onChangeText={value => setDescription(value)}
        />
      </View>

      <TouchableOpacity onPress={setData} style={style.buttonAdicionar}>
        <Text style={{color: '#E5E5E5'}}>Adicionar livro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
