// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ComicsList from './pages/comics/comicsList';
import ComicDetail from './pages/comics/comicDetail';
import HomePage from './pages/homePage';
import CharactersList from './pages/characters/charactersList';
import CharacterDetail from './pages/characters/characterDetail';

const Stack = createNativeStackNavigator();

function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{title: 'Home Page'}}
        />
        <Stack.Screen
          name="ComicsList"
          component={ComicsList}
          options={{title: 'Comic List'}}
        />
        <Stack.Screen
          name="ComicDetail"
          component={ComicDetail}
          options={{title: 'Comic Detail'}}
        />
        <Stack.Screen
          name="CharactersList"
          component={CharactersList}
          options={{title: 'Character List'}}
        />
        <Stack.Screen
          name="CharacterDetail"
          component={CharacterDetail}
          options={{title: 'Character Detail'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Route;
