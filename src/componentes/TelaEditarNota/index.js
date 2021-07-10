import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
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

export default function EditarNota({route, navigation}) {
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
        ToastAndroid.show('Nota editada', ToastAndroid.SHORT);

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
        placeholder="título"
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        multiline
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
      <TouchableOpacity
        onPress={updateData}
        style={{
          backgroundColor: '#023E8A',
          height: 40,
          width: '90%',
          alignItems: 'center',
          alignSelf: 'center',
          padding: 10,
          borderRadius: 10,
          margin: 10,
          marginBottom: 20,
        }}>
        <Text style={{color: '#E5E5E5'}}>Pronto!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
