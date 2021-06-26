import React, {useEffect, useState} from 'react';
import {Alert, View, FlatList, Text, SafeAreaView, Image} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import RenderizarLivros from './assets/renderItem/index';

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
  //dados = dados dos livros adicionados à biblioteca
  const [dados, setDados] = useState([]);

  const [vazio, setVazio] = useState([]);

  const isFocused = useIsFocused();

  const {navigate} = useNavigation();

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
          'SELECT * FROM Livros ORDER BY title ASC ',
          [],
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
            navigation.navigate('Home');
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        {vazio ? (
          <Text> Adicione livros a sua biblioteca!</Text>
        ) : (
          <FlatList
            extraData={dados}
            data={dados}
            onRefresh={onRefresh}
            refreshing={loading}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <RenderizarLivros
                item={item}
                onItemClick={navigate.bind(this, 'LivroBiblioteca', {item})}
                onDelete={onRefresh.bind()}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
