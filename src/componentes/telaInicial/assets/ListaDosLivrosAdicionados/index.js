import React, {useEffect, useState} from 'react';
import {Alert, View, FlatList, Text, SafeAreaView} from 'react-native';
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
  const [vazio, setVazio] = useState([])

  useEffect(() => {
    getData();
  }, []);

  // const getData = () => {
  //   try {
  //     db.transaction(tx => {
  //       tx.executeSql(
  //         'SELECT * FROM Livros',
  //         [],
  //         (tx, results) => {
  //           setDados(results.rows);
  //           navigation.navigate('Home');
  //         },
  //       );
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Livros',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setDados(temp);
            
            if (results.rows.length >= 1) {
              setVazio(false);
            } else {
              setVazio(true)
            }
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
    <SafeAreaView style={{flex: 1}}>
      <View>
      {vazio ? <Text> Adicione livros a sua biblioteca!</Text> :
        <FlatList
        data={dados}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => <Text> {item.title} </Text>}
        />
      }
      </View>
    </SafeAreaView>
  );
}
