import React from 'react';
import {View, Text, Image, TouchableOpacity, Keyboard} from 'react-native';
import style from './style';

function renderizarLivros({item, _id, onItemClick}) {
  return (
    // <TouchableOpacity
    //   onPress={() => onItemClick(_id)}
    //   // onPressIn={Keyboard.dismiss}
    // >
    //   <View>
    //     <View style={{flexDirection: 'row'}}>
    //       {item.thumbnail ? (
    //         <Image
    //           source={{uri: item.thumbnail}}
    //           style={{width: 50, height: 50, resizeMode: 'contain'}}
    //         />
    //       ) : (
    //         <Image
    //           source={require('../../../../../TelaPesquisaLivros/assets/images/semImagem.png')}
    //           style={{width: 50, height: 50, resizeMode: 'contain'}}
    //         />
    //       )}
    //       <Text style={{margin: 15, marginBottom: 5}} numberOfLines={1}>
    //         {' '}
    //         {item.title}{' '}
    //       </Text>
    //       <Text style={{margin: 15, marginBottom: 5}}> {item.authors} </Text>
    //       <Text style={{margin: 15, marginBottom: 5}}> {item.pages} </Text>
    //     </View>

    //     {/* Linha divisória */}
    //     <View
    //       style={{
    //         borderBottomColor: '#023E8A',
    //         borderBottomWidth: 2,
    //       }}
    //     />
    //   </View>
    // </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onItemClick(_id)}
      // onPressIn={Keyboard.dismiss}
    >
      <View style={style.container}>
        <View>
          {item.thumbnail ? (
            <Image style={style.imagens} source={{uri: item.thumbnail}} />
          ) : (
            <Image
              style={style.imagens}
              source={require('../../../../../TelaPesquisaLivros/assets/images/semImagem.png')}
            />
          )}
        </View>

        <View style={style.livros}>
          <Text numberOfLines={1} style={style.tituloLivros}>
            {item.title}
            {/* {item.title.length < 15
              ? `${item.title}`
              : `${item.title.substring(0, 12)}...`} */}
          </Text>
          <Text numberOfLines={1} style={style.infoLivros}>
            Autoria:{' '}
            {item.authors !== undefined || item.authors > 0
              ? item.authors
              : '*sem informações*'}
            {item.authors > 0 ? '...' : ''}
          </Text>
          {/* <Text numberOfLines={1} style={style.infoLivros}>
            Páginas:{' '}
            {item.pageCount !== undefined
              ? item.pageCount
              : '*sem informações*'}
          </Text> */}
          <Text numberOfLines={1} style={style.infoLivros}>
            Editora:{' '}
            {item.publisher !== undefined
              ? item.publisher
              : '*sem informações*'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default renderizarLivros;
