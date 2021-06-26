import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  Alert,
} from 'react-native';
import estilos from './style';
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

function LivroExpandido({route, item, navigation}) {
  const dados = route.params.item;
  const [autores, setAutores] = useState('');

  useEffect(() => {
    setAuthors();
  }, []);

  const setAuthors = () => {
    var temp = [];
    if (
      dados.volumeInfo.authors != undefined &&
      dados.volumeInfo.authors.length > 0
    ) {
      for (let i = 0; i < dados.volumeInfo.authors.length; ++i) {
        temp += dados.volumeInfo.authors[i];
        if (i < dados.volumeInfo.authors.length - 1) {
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
            dados.volumeInfo.imageLinks
              ? dados.volumeInfo.imageLinks.thumbnail
              : '',

            autores,

            dados.volumeInfo.publishedDate !== undefined
              ? dados.volumeInfo.publishedDate
              : '',

            dados.volumeInfo.pageCount ? dados.volumeInfo.pageCount : '',

            dados.volumeInfo.description !== undefined
              ? dados.volumeInfo.description
              : '',

            dados.volumeInfo.title,

            dados.id,

            dados.volumeInfo.language !== undefined
              ? dados.volumeInfo.language
              : '',

            dados.volumeInfo.publisher !== undefined
              ? dados.volumeInfo.publisher
              : '',

            dados.volumeInfo.categories !== undefined
              ? dados.volumeInfo.categories[0]
              : '',
          ],
        );
      });
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  function ParteImagem() {
    return (
      <TouchableHighlight style={{flex: 1}} onLongPress={() => alerta()}>
        <View style={{flex: 1}}>
          {dados.volumeInfo.imageLinks ? (
            <ImageBackground
              source={{uri: dados.volumeInfo.imageLinks.thumbnail}}
              style={estilos.background}
              blurRadius={5}>
              <Text numberOfLines={1} style={estilos.titulo}>
                {dados.volumeInfo.title}
              </Text>
            </ImageBackground>
          ) : (
            <ImageBackground
              style={({flex: 1}, estilos.background)}
              source={require('../TelaPesquisaLivros/assets/images/semImagem.png')}
              blurRadius={10}>
              <Text numberOfLines={1} style={estilos.titulo}>
                {dados.volumeInfo.title}
              </Text>
            </ImageBackground>
          )}
          <View style={{flex: 5, paddingTop: 10, alignItems: 'center'}}>
            {dados.volumeInfo.imageLinks ? (
              <Image
                source={{uri: dados.volumeInfo.imageLinks.thumbnail}}
                style={estilos.imagem}
              />
            ) : (
              <Image
                style={estilos.imagem}
                source={require('../TelaPesquisaLivros/assets/images/semImagem.png')}
              />
            )}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  function ParteInfo() {
    return (
      <ScrollView>
        <View style={estilos.containerInfo}>
          <View style={estilos.texto}>
            <Text style={{color: '#023E8A'}}> Autoria </Text>
            <Text
              numberOfLines={1}
              style={({width: 80}, estilos.textoPrincipal)}>
              {dados.volumeInfo.authors !== undefined ||
              dados.volumeInfo.authors > 0
                ? dados.volumeInfo.authors[0]
                : '        -'}
              {dados.volumeInfo.authors > 0 ? '...' : ''}
            </Text>
          </View>

          <View style={estilos.texto}>
            <Text style={{color: '#023E8A'}}>Páginas </Text>
            <Text numberOfLines={1} style={estilos.textoPrincipal}>
              {dados.volumeInfo.pageCount !== undefined
                ? `     ${dados.volumeInfo.pageCount}`
                : '        -'}
            </Text>
          </View>

          <View style={estilos.texto}>
            <Text style={{color: '#023E8A'}}>Linguagem </Text>
            <Text numberOfLines={1} style={estilos.textoPrincipal}>
              {dados.volumeInfo.language !== 'un'
                ? `      ${dados.volumeInfo.language}`
                : '        -'}
            </Text>
          </View>
        </View>

        {/* Linha divisória */}
        <View
          style={{
            borderBottomColor: '#023E8A',
            borderBottomWidth: 2,
          }}
        />

        {/* Descrição do livro */}
        <View>
          <Text style={estilos.descrição}>
            {dados.volumeInfo.description !== undefined
              ? dados.volumeInfo.description
              : ''}
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 2}}>{ParteImagem()}</View>
      <View style={{flex: 2}}>{ParteInfo()}</View>
    </View>
  );
}

export default LivroExpandido;
