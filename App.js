import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BuscarLivros from './src/componentes/pesquisaLivros/index';
import Home from './src/componentes/telaInicial/index';
import LivroExpandido from './src/componentes/TelaLivroExpandido/index';

const Pilha = createStackNavigator();

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
        <Pilha.Screen
          name="LivroExpandido"
          component={LivroExpandido}
          options={{title: 'Livro expandido'}}
        />
      </Pilha.Navigator>
    </NavigationContainer>
  );
}
