import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const window = Dimensions.get('window');

export default function CharacterDetail(prop) {
  const [characterDetail, setCharacterDetail] = useState();
  const [comicList, setComicList] = useState();

  const navigation = useNavigation();
  const characterId = prop.route.params.characterDetail;
  const imageUrl = prop.route.params.imageUrl;
  const ADR = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=f0e95c14605f9caac51e3a81b601c147&hash=ce2d8f9113df06238f662b13066281ba`;
  const ADRCOMICS = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=1&apikey=f0e95c14605f9caac51e3a81b601c147&hash=ce2d8f9113df06238f662b13066281ba`;

  console.log('url ', prop.route.params.characterDetail);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(ADR)
        .then(async item => {
          setCharacterDetail(item.data.data.results[0]);
        })
        .catch(error => console.log('error', error));
      await axios
        .get(ADRCOMICS)
        .then(resp => {
          console.log('adress', resp.data.data.results);
          setComicList(resp.data.data.results);
          console.log('characterDetail', comicList[0].title);
        })
        .catch(error => console.log('error', error));
    };
    getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bottomContainer}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>{characterDetail?.name}</Text>
        </View>
        <View style={styles.textSection}>
          <View style={styles.imageBody}>
            <Image
              source={{
                uri: imageUrl,
              }}
              style={styles.comicImage}
              resizeMode="cover"
            />
            <Text
              style={styles.linkingText}
              onPress={() => Linking.openURL(characterDetail?.urls[0].url)}>
              Marvel Karakter Profili İçin Tıklayınız
            </Text>
          </View>
          <View style={styles.tableStyle}>
            <Text style={styles.header}>Açıklama :</Text>
            <Text style={styles.description}>
              {characterDetail?.description
                ? characterDetail?.description
                : 'Açıklama Bilgisi Yok'}{' '}
            </Text>
          </View>
          <View style={styles.line} />
          <View style={styles.tableStyle}>
            <Text style={styles.header}>Comic Sayısı :</Text>
            <Text style={styles.description}>
              {characterDetail?.comics.available
                ? characterDetail?.comics.available
                : 'Comic Sayı Bilgisi Yok'}{' '}
            </Text>
          </View>
          <View style={styles.line} />
          <View style={styles.tableStyle}>
            <Text style={styles.header}>Story Sayısı :</Text>
            <Text style={styles.description}>
              {characterDetail?.stories.available
                ? characterDetail?.stories.available
                : 'Story Sayı Bilgisi Yok'}{' '}
            </Text>
          </View>
          <View style={styles.line} />
          <View style={styles.tableStyle}>
            <Text style={styles.header}>Series Sayısı :</Text>
            <Text style={styles.description}>
              {characterDetail?.series.available
                ? characterDetail?.series.available
                : 'Series Sayı Bilgisi Yok'}{' '}
            </Text>
          </View>
          <View style={styles.line} />
          <View style={styles.tableStyle}>
            <Text style={styles.header}>Event Sayısı :</Text>
            <Text style={styles.description}>
              {characterDetail?.events.available
                ? characterDetail?.events.available
                : 'Event Sayı Bilgisi Yok'}{' '}
            </Text>
          </View>
          {comicList ? (
            <Text style={{fontSize: 20, marginVertical: 10, fontWeight: '600'}}>
              Oynanan Çizgi Roman Listesi
            </Text>
          ) : null}
          {comicList
            ? comicList.map(item => (
                <TouchableOpacity
                  style={styles.tableStyle}
                  onPress={() =>
                    navigation.navigate(
                      'ComicDetail' as never,
                      {
                        comicDetail: item,
                        imageUrl: item.images[0].path
                          ? `${item.images[0].path.replace(
                              'http',
                              'https',
                            )}.jpg`
                          : null,
                      } as never,
                    )
                  }>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                      }}>
                      {item.images[0].path ? (
                        <Image
                          source={{
                            uri: `${item.images[0].path.replace(
                              'http',
                              'https',
                            )}.jpg`,
                          }}
                          style={styles.characterImage}
                          resizeMode="cover"
                        />
                      ) : null}
                      <View style={{flexDirection: 'column', flex: 1}}>
                        <Text style={styles.characterTitle} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <Text style={styles.characterTitle}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            : null}
          <View style={styles.line} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    alignItems: 'center',
  },
  comicImage: {
    marginTop: 20,
    marginBottom: 20,
    height: window.height / 1.8,
    width: window.width / 1.2,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  characterImage: {
    height: window.height / 8,
    width: window.height / 8,
    borderRadius: 5,
    alignItems: 'center',
    margin: 5,
  },
  imageBody: {
    alignItems: 'center',
  },
  textSection: {
    flex: 2,
  },
  tableStyle: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 15,
    fontWeight: '700',
    flex: 0.8,
  },
  description: {
    fontSize: 15,
    fontWeight: '400',
    flex: 1.2,
    alignItems: 'center',
  },
  line: {
    borderWidth: 0.5,
    borderTopColor: '#f2f2f2',
    borderBottomColor: '#8d99ae',
  },
  linkingText: {
    fontSize: 15,
    color: 'blue',
    marginBottom: 10,
  },
  characterTitle: {
    fontSize: 15,
    margin: 5,
  },
});
