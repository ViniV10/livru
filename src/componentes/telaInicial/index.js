import React from 'react';
import {View} from 'react-native';
import FabButton from './assets/FabButton';

export default function Home() {
  return (
    <View style={{flex: 1, backgroundColor: '#E5E5E5'}}>
      <FabButton style={{bottom: 40, right: 30}} />
    </View>
  );
}
