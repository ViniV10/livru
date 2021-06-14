import React from 'react';
import {View} from 'react-native';
import FabButton from './assets/FabButton';

export default function Home({navigation}) {
  return (
    <View>
      <View style={{alignItems: 'flex-end'}}>
        <FabButton />
      </View>
    </View>
  );
}
