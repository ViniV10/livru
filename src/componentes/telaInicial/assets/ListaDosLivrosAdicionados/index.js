import React, {useEffect, useState} from 'react';
import {
  Switch,
  View,
  FlatList,
  Text,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

export default function LivrosTelaInicial({navigation, SearchBar}) {
  //dados = dados dos livros adicionados à biblioteca
  const [dados, setDados] = useState([]);

  const [dadosFiltrados, setDadosFiltrados] = useState([]);

  const [pesquisa, setPesquisa] = useState('');

  const [vazio, setVazio] = useState([]);

  const isFocused = useIsFocused();

  const {navigate} = useNavigation();

  const [loading, setLoading] = useState(false);

  const [margem, setMargem] = useState(38);
  useEffect(() => {
    SearchBar ? setMargem(158) : setMargem(38);
  }, [SearchBar]);

  const [isSwitch, setIsSwitch] = useState(false);
  const [ordem, setOrdem] = useState('title');
  const [textoTextInput, setTextoTextInput] = useState(
    'Pesquisar (por título)',
  );

  const toggleSwitch = () => {
    isSwitch == true ? setOrdem('authors') : setOrdem('title');
    setIsSwitch(previousState => !previousState);
    isSwitch == true
      ? setTextoTextInput('Pesquisar (por autor)')
      : setTextoTextInput('Pesquisar (por título)');
    pesquisar();
    console.warn(isSwitch);
  };

  useEffect(() => {
    setIsSwitch(!isSwitch);
    onRefresh();
  }, [isFocused]);

  useEffect(() => {
    onRefresh();
  }, [isSwitch]);

  const onRefresh = () => {
    fetchData();
  };

  const fetchData = () => {
    getData();
  };

  const getData = () => {
    try {
      setLoading(true);
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM Livros ORDER BY ${ordem} COLLATE NOCASE ASC `,
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
            setLoading(false);
            navigation.navigate('Home');
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const pesquisar = text => {
    if (text && !isSwitch) {
      const newData = dados.filter(item => {
        const itemData = item.authors
          ? item.authors.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setDadosFiltrados(newData);
      setPesquisa(text);
    } else if (text && isSwitch) {
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
    <SafeAreaView>
      {SearchBar ? (
        <View>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            {isSwitch ? (
              <View />
            ) : (
              <MaterialCommunityIcons
                style={{marginLeft: '70%'}}
                name="account"
                size={24}
                color="#023E8A"
              />
            )}

            <Switch
              style={{marginLeft: '60%', position: 'absolute'}}
              trackColor={{false: '#767577', true: '#767577'}}
              thumbColor={isSwitch ? '#023E8A' : '#90E0EF'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isSwitch}
            />

            {isSwitch ? (
              <MaterialCommunityIcons
                style={{marginLeft: '89%'}}
                name="format-title"
                size={24}
                color="#023E8A"
              />
            ) : (
              <View />
            )}
          </View>
          <TextInput
            autoFocus={true}
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
            placeholder={textoTextInput}
            placeholderTextColor="#7286A0"
            value={pesquisa}
            onChangeText={text => pesquisar(text)}
          />
        </View>
      ) : (
        <Text />
      )}
      <View style={{marginBottom: margem}}>
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
