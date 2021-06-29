import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
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

function AdicionarNotas({navigation, route}) {
  const bookId = route.params.livro.id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const setData = async () => {
    if (title.length == 0) {
      alert('Por favor, digite o título da nota');
    } else {
      try {
        await db.transaction(async tx => {
          await tx.executeSql(
            'INSERT INTO Notas (bookId, title , description , priority ) VALUES (?, ?, ?, ?)',
            [bookId, title, description, priority],
          );
        });
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View>
      <TextInput
        style={{
          backgroundColor: '#90E0EF',
          fontSize: 15,
          borderRadius: 10,
          margin: 10,
          padding: 10,
          height: 100,
        }}
        multiline
        placeholder="título"
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        style={{
          backgroundColor: '#90E0EF',
          fontSize: 15,
          borderRadius: 10,
          margin: 10,
          padding: 10,
          height: 200,
        }}
        multiline
        placeholder="texto"
        onChangeText={value => setDescription(value)}
      />
      <Button title="Adicionar nota" color="#023E8A" onPress={setData} />
    </View>
  );
}

export default AdicionarNotas;
