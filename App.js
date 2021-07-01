import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BuscarLivros from './src/componentes/TelaPesquisaLivros/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './src/componentes/TelaInicial/index';
import LivroExpandido from './src/componentes/TelaLivroExpandido/index';
import AdicionarLivros from './src/componentes/TelaAdicionarLivros/index';
import LivroBiblioteca from './src/componentes/TelaLivroBiblioteca/index';
import NotaLivro from './src/componentes/TelaNotas';
import AdicionarNotas from './src/componentes/TelaAdicionarNotas/index';
import EditarNota from './src/componentes/TelaEditarNota';
import EditarLivro from './src/componentes/TelaEditarLivro';

const Pilha = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs({route}) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#023E8A',
        inactiveTintColor: '#000',
        activeBackgroundColor: '#aaa',
        inactiveBackgroundColor: '#E5E5E5',
      }}>
      <Tab.Screen
        name="Detalhes do livro"
        component={LivroBiblioteca}
        initialParams={route.params}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color={'#023E8A'} size={27} />
          ),
        }}
      />

      <Tab.Screen
        name="Notas"
        component={NotaLivro}
        initialParams={route.params}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="book" color={'#023E8A'} size={27} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function () {
  return (
    <NavigationContainer>
      <Pilha.Navigator initialRouteName="Home">
        <Pilha.Screen
          name="AdicionarLivros"
          component={AdicionarLivros}
          options={{
            title: 'Adicionar livro',
            headerTintColor: '#023E8A',
            headerStyle: {
              backgroundColor: '#E5E5E5',
            },
          }}
        />
        <Pilha.Screen
          name="Home"
          component={Home}
          options={{
            title: <Text style={{fontSize: 24}}> l i v r u </Text>,
            headerTintColor: '#023E8A',
            headerStyle: {
              backgroundColor: '#E5E5E5',
            },
          }}
        />
        <Pilha.Screen
          name="BuscarLivros"
          component={BuscarLivros}
          options={{
            title: 'Pesquisar livros',
            headerTintColor: '#023E8A',
            headerStyle: {
              backgroundColor: '#E5E5E5',
            },
          }}
        />
        <Pilha.Screen
          name="LivroBiblioteca"
          component={Tabs}
          options={({route}) => ({
            title: route.params.item.title,
            headerTintColor: '#023E8A',
            headerStyle: {
              backgroundColor: '#E5E5E5',
            },
          })}
        />
        <Pilha.Screen
          name="AdicionarNotas"
          component={AdicionarNotas}
          options={() => ({
            title: 'Adicionar nota',
            headerTintColor: '#023E8A',
            headerStyle: {
              backgroundColor: '#E5E5E5',
            },
          })}
        />
        <Pilha.Screen
          name="EditarNota"
          component={EditarNota}
          options={() => ({
            title: 'Editar nota',
            headerTintColor: '#023E8A',
            headerStyle: {
              backgroundColor: '#E5E5E5',
            },
          })}
        />
        <Pilha.Screen
          name="EditarLivro"
          component={EditarLivro}
          options={() => ({
            title: 'Editar livro',
            headerTintColor: '#023E8A',
            headerStyle: {
              backgroundColor: '#E5E5E5',
            },
          })}
        />
        <Pilha.Screen
          name="LivroExpandido"
          component={LivroExpandido}
          options={{
            title: 'Detalhes do livro',
            headerTintColor: '#023E8A',
            headerStyle: {
              backgroundColor: '#E5E5E5',
            },
          }}
        />
      </Pilha.Navigator>
    </NavigationContainer>
  );
}
