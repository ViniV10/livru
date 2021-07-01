import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Alerta from '../TelaAdicionarLivros/assets/Alerta';
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
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fotoCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setThumbnail(image.path);
    });
  };

  const fotoGaleria = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setThumbnail(image.path);
    });
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

      <TouchableOpacity onPress={updateData} style={style.button}>
        <Text style={{color: '#E5E5E5'}}>Editar livro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
