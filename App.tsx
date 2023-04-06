/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import Config from 'react-native-config';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const ADRESS = Config.API_URL_COMICS;
  const ADR =
    'https://gateway.marvel.com/v1/public/comics?ts=1&apikey=f0e95c14605f9caac51e3a81b601c147&hash=ce2d8f9113df06238f662b13066281ba';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [comicList, setComicList] = useState();

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(ADR, {
          params: {
            // ts: 1,
            // apikey: 'f0e95c14605f9caac51e3a81b601c147',
            // hash: 'ce2d8f9113df06238f662b13066281ba',
          },
        })
        .then(item => {
          console.log('adress', item.data.data.results);
          setComicList(item.data.data.results);
          console.log('image', item.data.data.results[4].images[0].path);

          //setFollowers(item.data);
        })
        .catch(error => console.log('error', error, ADRESS));
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        extraData={comicList}
        data={comicList}
        numColumns={1}
        style={{}}
        renderItem={({item}) => <InsideFlatlist item={item} />}
      />
    </SafeAreaView>
  );
};

function InsideFlatlist({item}) {
  const imageUrl = item.images[0] ? `${item.images[0].path}.jpg` : null;
  console.log('imageUrl', imageUrl);

  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.comicImage}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={{}}>{item.title}</Text>
        <Text style={{}}>{item.description}</Text>
        <Text style={{}}>{item.pageCount}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  comicImage: {
    height: 100,
    width: 100,
  },
});

export default App;
