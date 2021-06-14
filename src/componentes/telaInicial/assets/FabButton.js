import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

export default function FabButton({BuscarLivros}) {
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <View style={style.botões}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('BuscarLivros')}>
          <Animated.View style={[style.botão, style.menu]}>
            <MaterialCommunityIcons name="book" size={30} color="#f00" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
  },
  botões: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
    top: 415,
    right: 25,
  },
  botão: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 10,
    shadowColor: '#023E8A',
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 10,
    },
  },
  menu: {
    backgroundColor: '#90E0EF',
  },
});
