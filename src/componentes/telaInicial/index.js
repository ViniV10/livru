import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import FabButton from './assets/FabButton/index';
import SQLite from 'react-native-sqlite-storage';
import ListaLivros from '../TelaInicial/assets/ListaDosLivrosAdicionados/index';

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

export default function Home() {
  return (
    <View style={{flex: 1, backgroundColor: '#E5E5E5'}}>
      <ListaLivros />
      <FabButton style={{bottom: 40, right: 30}} />
    </View>
  );
}
