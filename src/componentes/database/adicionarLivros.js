import React, {useEffect, useState} from 'react';
import {Alert, View, TextInput, Button} from 'react-native';
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

export default function Home({navigation}) {
  const [id, setId] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [authors, setAuthors] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [pages, setPages] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    getData();
    createTable();
  }, []);

  // const createTable = () => {
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       'CREATE TABLE IF NOT EXISTS Livros (id TEXT PRIMARY KEY, thumbnail	BLOB, authors TEXT, publishedDate NUMERIC, pages	INTEGER, description TEXT, title TEXT )',
  //       [],
  //     );
  //   });
  // };

  const createTable = async () => {
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Livros (id TEXT PRIMARY KEY, thumbnail	BLOB, authors TEXT, publishedDate NUMERIC, pages	INTEGER, description TEXT, title TEXT )',
          [],
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT id, thumbnail, authors, publishedDate, pages, description, title FROM Livros',
          [],
          (tx, results) => {
            var len = results.row.length;
            if (len > 0) {
              var bookTitle = results.row.item(0).title;
              setTitle(bookTitle);
            }
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    if (title.length == 0) {
      alert('Por favor, digite o título do livro');
    } else {
      try {
        await db.transaction(async tx => {
          await tx.executeSql(
            'INSERT INTO Livros (id, thumbnail, authors, publishedDate, pages, description, title) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
              title,
              thumbnail,
              authors,
              publishedDate,
              pages,
              description,
              title,
            ],
          );
        });
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateData = async () => {
    if (title.length == 0 || id.length == 0) {
      Alert.alert('Warning!', 'Please write the data.');
    } else {
      try {
        db.transaction(async tx => {
          tx.executeSql(
            'UPDATE Livros SET title=?',
            [title],
            () => {
              Alert.alert('Success!', 'O título foi alterado');
            },
            error => {
              console.log(error);
            },
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeData = async () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Livros',
          [],
          () => {
            navigation.navigate('Home');
          },
          error => {
            console.log(error);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const removeTable = async () => {
  //   try {
  //     db.transaction(tx => {
  //       tx.executeSql(
  //         'DROP TABLE Livros',
  //         [],
  //         () => {
  //           navigation.navigate('Home');
  //         },
  //         error => {
  //           console.log(error);
  //         },
  //       );
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View style={{flex: 1, backgroundColor: '#E5E5E5', padding: 10}}>
      <TextInput
        style={{
          flex: 1,
          backgroundColor: '#90E0EF',
          borderRadius: 10,
          margin: 5,
          padding: 5,
        }}
        placeholder="nome do livro"
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        style={{
          flex: 1,
          backgroundColor: '#90E0EF',
          borderRadius: 10,
          margin: 5,
          padding: 5,
        }}
        placeholder="autoria"
        onChangeText={value => setAuthors(value)}
      />
      <TextInput
        style={{
          flex: 1,
          backgroundColor: '#90E0EF',
          borderRadius: 10,
          margin: 5,
          padding: 5,
        }}
        placeholder="data de publicação"
        onChangeText={value => setPublishedDate(value)}
      />
      <TextInput
        style={{
          flex: 1,
          backgroundColor: '#90E0EF',
          borderRadius: 10,
          margin: 5,
          padding: 5,
        }}
        placeholder="número de páginas"
        onChangeText={value => setPages(value)}
      />
      <TextInput
        style={{
          flex: 1,
          backgroundColor: '#90E0EF',
          borderRadius: 10,
          margin: 5,
          padding: 5,
        }}
        placeholder="descrição"
        onChangeText={value => setDescription(value)}
      />
      <Button title="Executar" color="#1eb900" onPress={setData} />
    </View>
  );
}
