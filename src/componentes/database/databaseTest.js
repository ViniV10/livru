import React, {useEffect, useState} from 'react';
import {Alert, View, FlatList, Text} from 'react-native';
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

export default function teste({navigation}) {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS' +
          'Livros' +
          '(id TEXT PRIMARY KEY AUTOINCREMENT, thumbnail	BLOB, authors TEXT, publishedDate NUMERIC, pages	INTEGER, description TEXT, title TEXT ',
      );
    });
  };

  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT id, thumbnail, authors, publishedDate, pages, description, title FROM Livros',
          [],
          (tx, results) => {
            setDados(results.rows);
            navigation.navigate('Home');
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    if (title.length == 0 || id.length == 0) {
      Alert.alert('Warning!', 'Please write the data.');
    } else {
      try {
        await db.transaction(async tx => {
          await tx.executeSql(
            'INSERT INTO Livros (id, thumbnail, authors, publishedDate, pages, description, title) VALUES (?, ?, ?, ?, ?, ?, ?)'[
              (id, thumbnail, authors, publishedDate, pages, description, title)
            ],
          );
        });
        navigate.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View>
      {console.log(dados)}
      {console.log('')}
      <FlatList
        data={dados}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => <Text> {index} </Text>}
      />
    </View>
  );
}
