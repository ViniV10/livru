import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

export default function Home({navigation}) {
  const [SearchBar, setSearchBar] = useState(false);

  useEffect(() => {
    createTable();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setSearchBar(!SearchBar)}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              width: 40,
              height: 40,
              marginRight: 5,
            }}>
            <MaterialCommunityIcons name="magnify" size={28} color="#023E8A" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [SearchBar]);

  const createTable = async () => {
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Livros (id INTEGER PRIMARY KEY AUTOINCREMENT, thumbnail	BLOB, authors TEXT, publishedDate NUMERIC, pages	INTEGER, description TEXT, title TEXT, googleId TEXT, language TEXT, publisher TEXT, categories TEXT, read BOOLEAN )',
          [],
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#E5E5E5'}}>
      <ListaLivros SearchBar={SearchBar} />
      <FabButton style={{bottom: 40, right: 30}} />
    </View>
  );
}
