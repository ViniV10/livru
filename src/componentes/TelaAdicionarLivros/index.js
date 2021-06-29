import React, {useEffect, useState} from 'react';
import {
  Alert,
  View,
  ScrollView,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import style from './style';

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
  const [language, setLanguage] = useState('');
  const [publisher, setPublisher] = useState('');
  const [categories, setCategories] = useState('');
  const [read, setRead] = useState(0);

  const setData = async () => {
    if (title.length == 0) {
      alert('Por favor, digite o título do livro');
    } else {
      try {
        await db.transaction(async tx => {
          await tx.executeSql(
            'INSERT INTO Livros (thumbnail, authors, publishedDate, pages, description, title, language, publisher, categories, read) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
              thumbnail,
              authors,
              publishedDate,
              pages,
              description,
              title,
              language,
              publisher,
              categories,
              read,
            ],
          );
        });
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  //   const updateData = async () => {
  //     if (title.length == 0 || id.length == 0) {
  //       Alert.alert('Warning!', 'Please write the data.');
  //     } else {
  //       try {
  //         db.transaction(async tx => {
  //           tx.executeSql(
  //             'UPDATE Livros SET title=?',
  //             [title],
  //             () => {
  //               Alert.alert('Success!', 'O título foi alterado');
  //             },
  //             error => {
  //               console.log(error);
  //             },
  //           );
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };

  //   const removeData = async () => {
  //     try {
  //       db.transaction(tx => {
  //         tx.executeSql(
  //           'DELETE FROM Livros',
  //           [],
  //           () => {
  //             navigation.navigate('Home');
  //           },
  //           error => {
  //             console.log(error);
  //           },
  //         );
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

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
    // <KeyboardAvoidingView behavior={'position'}>
    <ScrollView style={{flex: 1, backgroundColor: '#E5E5E5', padding: 10}}>
      <TextInput
        style={style.textInput}
        placeholder="nome do livro"
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        style={style.textInput}
        placeholder="autoria"
        onChangeText={value => setAuthors(value)}
      />
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={style.textInput}
          value={publishedDate}
          placeholder="data de publicação"
          maxLength={7}
          keyboardType="numeric"
          onChangeText={text => {
            setPublishedDate(
              text.length === 3 && !text.includes('/')
                ? `${text.substring(0, 2)}/${text.substring(2)}`
                : text,
            );
          }}
        />
        <TextInput
          style={style.textInput}
          keyboardType="numeric"
          placeholder="número de páginas"
          onChangeText={value => setPages(value)}
        />
      </View>
      <TextInput
        style={style.textInput}
        placeholder="editora"
        onChangeText={value => setPublisher(value)}
      />
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={style.textInput}
          placeholder="categoria(s)"
          onChangeText={value => setCategories(value)}
        />
        <TextInput
          style={style.textInput}
          placeholder="linguagem"
          onChangeText={value => setLanguage(value)}
        />
      </View>
      <TextInput
        style={style.textInput}
        placeholder="descrição"
        onChangeText={value => setDescription(value)}
      />
      <Button title="Adicionar livro" color="#023E8A" onPress={setData} />
    </ScrollView>
    // </KeyboardAvoidingView>
  );
}
