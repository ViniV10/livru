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

export default function EditarNota({route, navigation, _id, onItemClick}) {
  const dados = route.params.item;

  const [id, setId] = useState(dados.id);
  const [title, setTitle] = useState(dados.title);
  const [description, setDescription] = useState(dados.description);

  const updateData = async () => {
    if (title.length == 0) {
      alert('Por favor, digite o título da nota');
    } else {
      try {
        await db.transaction(async tx => {
          await tx.executeSql(
            'UPDATE Notas SET title = ? , description = ? WHERE id = ?',
            [title, description, id],
          );
        });
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#E5E5E5', padding: 10}}>
      <TextInput
        value={title}
        style={{
          backgroundColor: '#90E0EF',
          borderRadius: 10,
          margin: 10,
          padding: 10,
          height: 100,
        }}
        placeholder="título da nota"
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        value={description}
        style={{
          backgroundColor: '#90E0EF',
          borderRadius: 10,
          margin: 10,
          padding: 10,
          height: 200,
        }}
        placeholder="texto"
        onChangeText={value => setDescription(value)}
      />
      <Button title="Pronto!" color="#023E8A" onPress={updateData} />
    </ScrollView>
  );
}
