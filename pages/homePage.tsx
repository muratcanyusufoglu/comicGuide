import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function HomePage() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
      }}>
      <TouchableOpacity
        style={{
          height: 110,
          width: 110,
          backgroundColor: '#03071e',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('ComicsList' as never)}>
        <Text style={{color: 'white'}}>Comics</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 110,
          width: 110,
          backgroundColor: '#780000',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('CharactersList' as never)}>
        <Text style={{color: 'white'}}>Characters</Text>
      </TouchableOpacity>
    </View>
  );
}
