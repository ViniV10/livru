import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';

function LivroExpandido({route, item}) {
  const dados = route.params.item;

  function ParteImagem() {
    return (
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

const estilos = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    flex: 1,
  },
  containerImagem: {
    alignItems: 'center',
  },
  imagem: {
    flex: 1,
    width: 130,
    marginBottom: 50,
    height: 'auto',
    resizeMode: 'contain',
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInfo: {
    margin: 1,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  texto: {
    flexDirection: 'column',
    margin: 0,
    padding: 10,
    alignItems: 'center',
  },
  textoPrincipal: {
    fontSize: 16,
    margin: 5,
    width: 75,
    alignSelf: 'center',
    color: '#023E8A',
  },
  titulo: {
    fontSize: 20,
    margin: 5,
    padding: 5,
    backgroundColor: '#E5E5E5',
    borderRadius: 5,
    color: '#023E8A',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  descrição: {
    fontSize: 16,
    margin: 10,
    marginBottom: 10,
  },
});

export default LivroExpandido;
