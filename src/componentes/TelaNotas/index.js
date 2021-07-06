import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableHighlight,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import estilos from './style';
import RenderizarLivros from './assets/RenderItem';

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
      setLoading(true);
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
        setLoading(false);
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

  function ParteImagem() {
    return (
      <TouchableHighlight style={{flex: 1}}>
        <View style={{flex: 1}}>
          {livro.thumbnail ? (
            <ImageBackground
              source={{uri: livro.thumbnail}}
              style={estilos.background}
              blurRadius={5}></ImageBackground>
          ) : (
            <ImageBackground
              style={({flex: 1}, estilos.background)}
              source={require('../TelaPesquisaLivros/assets/images/semImagem.png')}
              blurRadius={10}></ImageBackground>
          )}

          <View style={{flex: 5, paddingTop: 10, alignItems: 'center'}}>
            {livro.thumbnail ? (
              <Image source={{uri: livro.thumbnail}} style={estilos.imagem} />
            ) : (
              <Image
                style={estilos.imagem}
                source={require('../TelaPesquisaLivros/assets/images/semImagem.png')}
              />
            )}
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  function ParteInfo() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={estilos.totalNotas}>Total de notas: {dados.length}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AdicionarNotas', {livro})}
            style={{
              alignItems: 'center',
              backgroundColor: '#023E8A',
              height: 40,
              width: '35%',
              alignSelf: 'flex-end',
              padding: 10,
              borderRadius: 10,
              margin: 10,
              marginLeft: '27%',
            }}>
            <Text style={{color: '#E5E5E5'}}>Adicionar nota</Text>
          </TouchableOpacity>
        </View>
        {/* Linha divisória */}
        <View
          style={{
            borderBottomColor: '#023E8A',
            borderBottomWidth: 2,
          }}
        />
        <View style={{marginBottom: 60}}>
          {vazio ? (
            <Text style={{margin: 15}}> Adicione notas!</Text>
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
                  onItemClick={navigate.bind(this, 'EditarNota', {item})}
                  onDelete={onRefresh.bind()}
                />
              )}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 3}}>{ParteImagem()}</View>
      <View
        style={{
          flex: 5,
          borderColor: '#023E8A',
          borderWidth: 3,
          borderBottomWidth: 0,
        }}>
        {loading ? (
          <ActivityIndicator size="large" color="#023E8A" />
        ) : (
          ParteInfo()
        )}
      </View>
    </SafeAreaView>
  );
}

export default NotaLivro;
