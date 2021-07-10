import React, {useState} from 'react';
import {
  ScrollView,
  Text,
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
        ToastAndroid.show('Nota adicionada', ToastAndroid.SHORT);
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#E5E5E5', padding: 10}}>
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
      <TouchableOpacity
        onPress={setData}
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

export default AdicionarNotas;
