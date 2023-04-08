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

export default function ComicDetail(prop) {
  const [comicDetail, setComicDetail] = useState();
  const [characters, setCharacters] = useState();

  const navigation = useNavigation();
  const comicId = prop.route.params.comicDetail.id;
  const imageUrl = prop.route.params.imageUrl;
  const ADR = `https://gateway.marvel.com/v1/public/comics/${comicId}/characters?ts=1&apikey=f0e95c14605f9caac51e3a81b601c147&hash=ce2d8f9113df06238f662b13066281ba`;
  const ADRCOMIC = `https://gateway.marvel.com/v1/public/comics/${comicId}?ts=1&apikey=f0e95c14605f9caac51e3a81b601c147&hash=ce2d8f9113df06238f662b13066281ba`;

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(ADRCOMIC)
        .then(item => {
          console.log('adress', item.data.data.results);
          setComicDetail(item.data.data.results[0]);
          console.log('comicDetail', characters[0].name);

          //setFollowers(item.data);
        })
        .catch(error => console.log('error', error));
      await axios
        .get(ADR)
        .then(item => {
          console.log('adress', item.data.data.results);
          setCharacters(item.data.data.results);
          console.log('comicDetail', characters[0].name);

          //setFollowers(item.data);
        })
        .catch(error => console.log('error', error));
    };
    getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bottomContainer}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>{comicDetail?.title}</Text>
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
              onPress={() => Linking.openURL(comicDetail?.urls[0].url)}>
              Marvel Profili İçin Tıklayınız
            </Text>
          </View>
          <View style={styles.tableStyle}>
            <Text style={styles.header}>Açıklama :</Text>
            <Text style={styles.description}>
              {comicDetail?.description
                ? comicDetail?.description
                : 'Açıklama Bilgisi Yok'}{' '}
            </Text>
          </View>
          <View style={styles.line} />
          <View style={styles.tableStyle}>
            <Text style={styles.header}>Sayfa Sayısı :</Text>
            <Text style={styles.description}>
              {comicDetail?.pageCount
                ? comicDetail?.pageCount
                : 'Sayfa Sayısı Bilgisi Yok'}{' '}
            </Text>
          </View>
          <View style={styles.line} />
          {comicDetail?.creators.items.map(item => (
            <View style={styles.tableStyle}>
              <Text style={styles.header}>Yazar :</Text>

              <Text style={styles.description} numberOfLines={1}>
                {item.name} - {item.role}
              </Text>
            </View>
          ))}
          {characters ? (
            <Text style={{fontSize: 20, marginVertical: 10, fontWeight: '600'}}>
              Karakter Listesi
            </Text>
          ) : null}
          {characters
            ? characters.map(item => (
                <TouchableOpacity
                  style={styles.tableStyle}
                  onPress={() =>
                    navigation.navigate(
                      'CharacterDetail' as never,
                      {
                        characterDetail: item.id,
                        imageUrl: `${item.thumbnail.path.replace(
                          'http',
                          'https',
                        )}.jpg`,
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
                      {item.thumbnail.path ? (
                        <Image
                          source={{
                            uri: `${item.thumbnail.path.replace(
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
                          {item.name}
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
