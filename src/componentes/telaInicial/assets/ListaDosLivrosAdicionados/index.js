import React, {useEffect, useState} from 'react';
import {
  Alert,
  View,
  FlatList,
  Text,
  SafeAreaView,
  TextInput,
} from 'react-native';
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

  const [dadosFiltrados, setDadosFiltrados] = useState([]);

  const [pesquisa, setPesquisa] = useState('');

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
          'SELECT * FROM Livros ORDER BY title COLLATE NOCASE ASC ',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setDados(temp);
            setDadosFiltrados(temp);

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

  const pesquisar = text => {
    if (text) {
      const newData = dados.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setDadosFiltrados(newData);
      setPesquisa(text);
    } else {
      setDadosFiltrados(dados);
      setPesquisa(text);
    }
  };

  return (
    <SafeAreaView style={{marginBottom: 108}}>
      <TextInput
        style={{
          alignSelf: 'center',
          display: 'flex',
          margin: '2%',
          width: '90%',
          height: 40,
          backgroundColor: '#ccc',
          borderRadius: 10,
          padding: 10,
        }}
        placeholder="Pesquisar"
        placeholderTextColor="#7286A0"
        value={pesquisa}
        // onKeyPress={() => setPesquisa(true)}
        onChangeText={text => pesquisar(text)}
      />
      <View>
        {vazio ? (
          <Text> Adicione livros a sua biblioteca!</Text>
        ) : (
          <FlatList
            data={dadosFiltrados}
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
