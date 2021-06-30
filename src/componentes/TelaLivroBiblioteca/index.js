import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useIsFocused} from '@react-navigation/native';
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

function LivroBiblioteca({route, navigation}) {
  const [dados, setDados] = useState(route.params.item);
  const id = route.params.item.id;

  const [loading, setLoading] = useState(false);

  const onRefresh = () => {
    setLoading(true);
    fetchData();
  };

  const fetchData = () => {
    getData();
    setLoading(false);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Livros WHERE id = ? ',
          [id],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setDados(temp[0]);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  function ParteImagem() {
    return (
      <TouchableHighlight style={{flex: 1}}>
        <View style={{flex: 1}}>
          {dados.thumbnail ? (
            <ImageBackground
              source={{uri: dados.thumbnail}}
              style={estilos.background}
              blurRadius={5}></ImageBackground>
          ) : (
            <ImageBackground
              style={({flex: 1}, estilos.background)}
              source={require('../TelaPesquisaLivros/assets/images/semImagem.png')}
              blurRadius={10}></ImageBackground>
          )}

          <View style={{flex: 5, paddingTop: 10, alignItems: 'center'}}>
            {dados.thumbnail ? (
              <Image source={{uri: dados.thumbnail}} style={estilos.imagem} />
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        <View style={estilos.containerInfo}>
          <View style={estilos.texto}>
            <Text style={estilos.titulo}>
              {dados.title !== undefined ? dados.title : '        -'}
            </Text>

            <TouchableOpacity
              style={estilos.botão}
              onPress={() => navigation.navigate('EditarLivro', {dados})}>
              <Image source={require('./assets/images/book-edit.png')} />
            </TouchableOpacity>
          </View>
          <View style={estilos.texto}>
            <Text style={{color: '#023E8A'}}> Autoria: </Text>
            <Text numberOfLines={1} style={estilos.textoPrincipal}>
              {dados.authors !== undefined ? dados.authors : '-'}
              {dados.authors > 0 ? '...' : ''}
            </Text>
          </View>
          <View style={estilos.texto}>
            <Text style={{color: '#023E8A'}}> Editora: </Text>
            <Text numberOfLines={1} style={estilos.textoPrincipal}>
              {dados.publisher !== undefined ? dados.publisher : '-'}
              {dados.publisher > 0 ? '...' : ''}
            </Text>
          </View>

          <View style={{flexDirection: 'row', marginLeft: 3}}>
            <View style={estilos.texto}>
              <Text style={{color: '#023E8A'}}>Páginas: </Text>
              <Text numberOfLines={1} style={estilos.textoPrincipal}>
                {dados.pages !== undefined ? `${dados.pages}          ` : '-'}
              </Text>
            </View>

            <View style={estilos.texto}>
              <Text style={{color: '#023E8A'}}>Linguagem: </Text>
              <Text numberOfLines={1} style={estilos.textoPrincipal}>
                {dados.language !== 'un' ? `${dados.language}` : '-'}
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
            {dados.description !== undefined ? dados.description : ''}
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
