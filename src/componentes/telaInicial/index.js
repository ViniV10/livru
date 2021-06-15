import React from 'react';
import {View} from 'react-native';
import FabButton from './assets/FabButton';

export default function Home({navigation}) {
  return (
    <View style={{flex: 1}}>
      <FabButton style={{bottom: 40, right: 30}} />
    </View>
  );
}
