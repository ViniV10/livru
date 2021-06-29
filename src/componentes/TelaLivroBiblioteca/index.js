import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  Alert,
  SafeAreaView,
} from 'react-native';
import estilos from './style';
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

function LivroBiblioteca({route, item}) {
  const dados = route.params.item;

  const id = dados.id;
  const thumbnail = dados.thumbnail ? dados.thumbnail : undefined;
  const authors = dados.authors ? [dados.authors] : undefined;
  const publishedDate = dados.publishedDate ? dados.publishedDate : undefined;
  const pages = dados.pages ? dados.pages : undefined;
  const description = dados.description ? dados.description : undefined;
  const title = dados.title ? dados.title : undefined;
  const googleId = dados.googleId ? dados.googleId : undefined;
  const language = dados.language ? dados.language : undefined;
  const publisher = dados.publisher ? dados.publisher : undefined;
  const categories = dados.categories ? dados.categories : undefined;
  const read = dados.read ? dados.read : undefined;

  //   const alerta = () => {
  //     Alert.alert('Confirmação', 'Deseja adicionar o livro à biblioteca?', [
  //       {text: 'CANCELAR', onPress: ''},
  //       {text: 'SIM', onPress: () => setData()},
  //     ]);
  //   };

  //   const setData = async () => {
  //     try {
  //       await db.transaction(async tx => {
  //         await tx.executeSql(
  //           'INSERT INTO Livros (id, thumbnail, authors, publishedDate, pages, description, title) VALUES (?, ?, ?, ?, ?, ?, ?)',
  //           [
  //             dados.id,
  //             dados.volumeInfo.imageLinks
  //               ? dados.volumeInfo.imageLinks.thumbnail
  //               : '',
  //             autores,
  //             dados.volumeInfo.publishedDate !== undefined
  //               ? dados.volumeInfo.publishedDate
  //               : '',
  //             dados.volumeInfo.pageCount,
  //             dados.volumeInfo.description !== undefined
  //               ? dados.volumeInfo.description
  //               : '',
  //             dados.volumeInfo.title,
  //           ],
  //         );
  //       });
  //       navigation.navigate('Home');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  function ParteImagem() {
    return (
      <TouchableHighlight style={{flex: 1}}>
        <View style={{flex: 1}}>
          {thumbnail ? (
            <ImageBackground
              source={{uri: thumbnail}}
              style={estilos.background}
              blurRadius={5}></ImageBackground>
          ) : (
            <ImageBackground
              style={({flex: 1}, estilos.background)}
              source={require('../TelaPesquisaLivros/assets/images/semImagem.png')}
              blurRadius={10}></ImageBackground>
          )}

          <View style={{flex: 5, paddingTop: 10, alignItems: 'center'}}>
            {thumbnail ? (
              <Image source={{uri: thumbnail}} style={estilos.imagem} />
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
            <Text style={estilos.titulo}>
              {title !== undefined ? title : '        -'}
              {title > 0 ? '...' : ''}
            </Text>
          </View>
          <View style={estilos.texto}>
            <Text style={{color: '#023E8A'}}> Autoria: </Text>
            <Text numberOfLines={1} style={estilos.textoPrincipal}>
              {authors !== undefined ? authors : '-'}
              {authors > 0 ? '...' : ''}
            </Text>
          </View>
          <View style={estilos.texto}>
            <Text style={{color: '#023E8A'}}> Editora: </Text>
            <Text numberOfLines={1} style={estilos.textoPrincipal}>
              {publisher !== undefined ? publisher : '-'}
              {publisher > 0 ? '...' : ''}
            </Text>
          </View>

          <View style={{flexDirection: 'row', marginLeft: 3}}>
            <View style={estilos.texto}>
              <Text style={{color: '#023E8A'}}>Páginas: </Text>
              <Text numberOfLines={1} style={estilos.textoPrincipal}>
                {pages !== undefined ? `${pages}          ` : '-'}
              </Text>
            </View>

            <View style={estilos.texto}>
              <Text style={{color: '#023E8A'}}>Linguagem: </Text>
              <Text numberOfLines={1} style={estilos.textoPrincipal}>
                {language !== 'un' ? `${language}` : '-'}
              </Text>
            </View>
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
            {description !== undefined ? description : ''}
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 3}}>{ParteImagem()}</View>
      <View
        style={{
          flex: 5,
          borderColor: '#023E8A',
          borderWidth: 3,
          borderBottomWidth: 0,
        }}>
        {ParteInfo()}
      </View>
    </SafeAreaView>
  );
}

export default LivroBiblioteca;
