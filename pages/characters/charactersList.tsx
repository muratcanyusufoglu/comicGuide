/**
 * Sample React Native ComicsList
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
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
  Dimensions,
} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import Config from 'react-native-config';
import {useNavigation} from '@react-navigation/native';

const window = Dimensions.get('window');
const CharactersList = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const ADRESS = Config.API_URL_COMICS;
  const ADR =
    'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=f0e95c14605f9caac51e3a81b601c147&hash=ce2d8f9113df06238f662b13066281ba';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [characterList, setcharacterList] = useState();
  const [pagination, setPagination] = useState<number>(20);
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(ADR, {
          params: {
            // ts: 1,
            // apikey: 'f0e95c14605f9caac51e3a81b601c147',
            // hash: 'ce2d8f9113df06238f662b13066281ba',
            limit: pagination,
          },
        })
        .then(item => {
          setcharacterList(item.data.data.results);

          //setFollowers(item.data);
        })
        .catch(error => console.log('error', error, ADRESS));
    };
    getData();
  }, [pagination]);

  const handleOnEndReached = () => {
    console.log('endReaced', pagination);
    setPagination(pagination + 20);
  };

  const searchFunction = (text: string) => {
    const updatedData = characterList?.filter(item => {
      const item_data = `${item.name.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setcharacterList(updatedData);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <SearchBar
        placeholder="Search Here..."
        lightTheme
        round
        value={setSearchValue}
        onChangeText={searchFunction}
        autoCorrect={false}
      />
      <FlatList
        extraData={characterList}
        data={characterList}
        numColumns={1}
        style={{}}
        onEndReached={handleOnEndReached}
        renderItem={({item}) => <InsideFlatlist item={item} />}
      />
    </SafeAreaView>
  );
};

function InsideFlatlist({item}) {
  const imageUri = item.thumbnail
    ? item.thumbnail.path.replace('http', 'https')
    : null;
  const imageUrl = item.thumbnail ? `${imageUri}.jpg` : null;
  console.log('imageUrl', item);

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(
          'CharacterDetail' as never,
          {characterDetail: item.id, imageUrl: imageUrl} as never,
        )
      }>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.comicImage}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{item.name}</Text>
        <Text numberOfLines={3} style={styles.textFonts}>
          {item.description}
        </Text>
        <Text style={styles.textFonts}>
          Toplam Çizgi Roman : {item.comics.available}
        </Text>
        <Text style={styles.textFonts}>
          Toplam Story : {item.stories.available}
        </Text>
        <Text style={styles.textFonts}>
          Toplam Series : {item.series.available}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 5,
    elevation: 5,
    borderWidth: 0.5,
    borderTopColor: '#f2f2f2',
    borderBottomColor: '#8d99ae',
  },
  textContainer: {
    flex: 2,
    margin: 10,
  },
  textFonts: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '400',
  },
  titleText: {
    fontWeight: '700',
  },
  comicImage: {
    height: window.height / 5,
    width: window.height / 7,
    flex: 1.2,
    backgroundColor: 'red',
    borderRadius: 5,
  },
});

export default CharactersList;
