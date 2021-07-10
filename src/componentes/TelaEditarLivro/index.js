import React, {useEffect, useState} from 'react';
import {
  Modal,
  Image,
  Pressable,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
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

export default function EditarLivro({route, navigation}) {
  const dados = route.params.dados;

  const [id, setId] = useState(dados.id);
  const [thumbnail, setThumbnail] = useState(dados.thumbnail);
  const [authors, setAuthors] = useState(dados.authors);
  const [publishedDate, setPublishedDate] = useState(dados.publishedDate);
  const [pages, setPages] = useState(dados.pages);
  const [description, setDescription] = useState(dados.description);
  const [title, setTitle] = useState(dados.title);
  const [language, setLanguage] = useState(dados.language);
  const [publisher, setPublisher] = useState(dados.publisher);
  const [categories, setCategories] = useState(dados.categories);
  const [read, setRead] = useState(dados.read);

  const updateData = async () => {
    if (title.length == 0) {
      alert('Por favor, digite o título do livro');
    } else {
      try {
        await db.transaction(async tx => {
          await tx.executeSql(
            'Update Livros SET thumbnail = ?, authors = ?, publishedDate = ?, pages = ?, description = ?, title = ?, language = ? , publisher = ?, categories = ?, read = ? WHERE id = ?',
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
              id,
            ],
          );
        });
        ToastAndroid.show('Livro editado', ToastAndroid.SHORT);
        navigation.goBack();
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

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#E5E5E5',
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TextInput
          style={style.textInput}
          placeholder="nome do livro"
          value={title}
          onChangeText={value => setTitle(value)}
        />
        <View style={{marginTop: 10}}>
          <Alerta thumbnail={thumbnail} />
        </View>
      </View>
      <TextInput
        style={style.textInput}
        placeholder="autoria"
        value={authors}
        onChangeText={value => setAuthors(value)}
      />
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={style.textInput}
          value={publishedDate.toString()}
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
          value={pages.toString()}
          keyboardType="numeric"
          placeholder="número de páginas"
          onChangeText={value => setPages(value)}
        />
      </View>
      <TextInput
        style={style.textInput}
        value={publisher}
        placeholder="editora"
        onChangeText={value => setPublisher(value)}
      />
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={style.textInput}
          value={categories}
          placeholder="categoria(s)"
          onChangeText={value => setCategories(value)}
        />
        <TextInput
          style={style.textInput}
          value={language}
          placeholder="linguagem"
          onChangeText={value => setLanguage(value)}
        />
      </View>
      <View style={{height: 200}}>
        <TextInput
          multiline
          style={style.textInput}
          value={description}
          placeholder="descrição"
          onChangeText={value => setDescription(value)}
        />
      </View>

      <TouchableOpacity onPress={updateData} style={style.buttonAdicionar}>
        <Text style={{color: '#E5E5E5'}}>Editar livro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
