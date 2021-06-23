import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BuscarLivros from './src/componentes/TelaPesquisaLivros/index';
import Home from './src/componentes/TelaInicial/index';
import LivroExpandido from './src/componentes/TelaLivroExpandido/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AdicionarLivros from './src/componentes/TelaAdicionarLivros/index';

const Pilha = createStackNavigator();

export default function () {
  return (
    <NavigationContainer>
      <Pilha.Navigator initialRouteName="Home">
        <Pilha.Screen
          name="AdicionarLivros"
          component={AdicionarLivros}
          options={{
            title: 'Adicionar livros manualmente',
            headerTintColor: '#E5E5E5',
            headerStyle: {
              backgroundColor: '#023E8A',
            },
          }}
        />
        <Pilha.Screen
          name="Home"
          component={Home}
          options={{
            title: 'livru',
            headerTintColor: '#E5E5E5',
            headerStyle: {
              backgroundColor: '#023E8A',
            },
          }}
        />
        <Pilha.Screen
          name="BuscarLivros"
          component={BuscarLivros}
          options={{
            title: 'Pesquisar livros',
            headerTintColor: '#E5E5E5',
            headerStyle: {
              backgroundColor: '#023E8A',
            },
          }}
        />
        <Pilha.Screen
          name="LivroExpandido"
          component={LivroExpandido}
          options={{
            title: 'Detalhes do livro',
            headerTintColor: '#E5E5E5',
            headerStyle: {
              backgroundColor: '#023E8A',
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => alert('This is a button!')}>
                <View
                  style={{
                    backgroundColor: '#90E0EF',
                    padding: 16,
                    borderRadius: 5,
                  }}>
                  <MaterialCommunityIcons
                    name="plus"
                    size={28}
                    color="#023E8A"
                  />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
      </Pilha.Navigator>
    </NavigationContainer>
  );
}
