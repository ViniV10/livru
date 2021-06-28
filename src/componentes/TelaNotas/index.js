import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, SafeAreaView, Button} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
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

function NotaLivro({route, navigation}) {
  const livro = route.params.item;

  const [dados, setDados] = useState([]);

  const [vazio, setVazio] = useState([]);

  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);

  const onRefresh = () => {
    setLoading(true);
    fetchData();
  };

  const fetchData = () => {
    getData();
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Notas WHERE bookId = ? ORDER BY priority',
          [livro.id],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setDados(temp);

            if (results.rows.length >= 1) {
              setVazio(false);
            } else {
              setVazio(true);
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
      alert('Por favor, digite o título da nota');
    } else {
      try {
        await db.transaction(async tx => {
          await tx.executeSql(
            'INSERT INTO Notas (bookId, title , description , priority ) VALUES (?, ?, ?, ?)',
            [bookId, description, title, priority],
          );
        });
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        {vazio ? (
          <Text> Adicione notas!</Text>
        ) : (
          <FlatList
            extraData={dados}
            data={dados}
            onRefresh={onRefresh}
            refreshing={loading}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <View>
                <Text>{item.title}</Text>
              </View>
            )}
          />
        )}
      </View>
      <Button
        title="Adicionar nota"
        color="#023E8A"
        onPress={() => navigation.navigate('AdicionarNotas', {livro})}
      />
    </SafeAreaView>
  );
}

export default NotaLivro;
