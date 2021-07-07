import React, {useState, useEffect} from 'react';
import {View, TouchableWithoutFeedback, Animated, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import style from './style';

export default function FabButton(props) {
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    var toValue = open ? 0 : 1;
    Animated.spring(animation, {
      toValue: toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setOpen(!open);
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  const bookSearch = {
    transform: [
      {scale: animation},
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
  };

  const bookPlus = {
    transform: [
      {scale: animation},
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -25],
        }),
      },
    ],
  };

  function navegarTelaBuscarLivros() {
    navigation.navigate('BuscarLivros');
    toggleMenu();
  }

  function navegarTelaAdicionarLivros() {
    navigation.navigate('AdicionarLivros');
    toggleMenu();
  }

  return (
    <View style={[style.container, props.style]}>
      {open ? (
        <View>
          <TouchableWithoutFeedback onPress={navegarTelaAdicionarLivros}>
            <Animated.View style={[style.containerButton, bookPlus]}>
              <Text style={style.text}>Adicionar livros manualmente</Text>
              <View style={[style.button, style.submenu]}>
                <MaterialCommunityIcons
                  name="book-plus"
                  size={24}
                  color="#90E0EF"
                />
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={navegarTelaBuscarLivros}>
            <Animated.View style={[style.containerButton, bookSearch]}>
              <Text style={[style.text, {marginLeft: 60}]}>
                Pesquisar por livros
              </Text>

              <View style={[style.button, style.submenu]}>
                <MaterialCommunityIcons
                  name="book-search"
                  size={24}
                  color="#90E0EF"
                />
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <View />
      )}

      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[style.button, style.menu, rotation]}>
          <MaterialCommunityIcons name="plus" size={33} color="#E5E5E5" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}
