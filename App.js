import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BuscarLivros from './src/componentes/pesquisaLivros/index';

const Pilha = createStackNavigator();

function Home({navigation}) {
  return (
    <View>
      <Text style={{padding: 30}}> Tela inicial </Text>
      <Button
        title="Livros"
        onPress={() => navigation.navigate('BuscarLivros')}
      />
    </View>
  );
}

export default function () {
  return (
    <NavigationContainer>
      <Pilha.Navigator initialRouteName="Home">
        <Pilha.Screen name="Home" component={Home} options={{title: 'Home'}} />
        <Pilha.Screen
          name="BuscarLivros"
          component={BuscarLivros}
          options={{title: 'Pesquisar livros'}}
        />
      </Pilha.Navigator>
    </NavigationContainer>
  );
}
