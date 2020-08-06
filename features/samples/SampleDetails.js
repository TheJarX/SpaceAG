import React, {useEffect} from 'react';
import {Text, Image, StyleSheet, ScrollView} from 'react-native';
import {Card} from 'react-native-paper';
import {APP_THEME} from '../../utils';
import MapComponent from '../map/Map';

const ago = require('s-ago');

const Header = ({title, subtitle}) => (
  <>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </>
);

const PictureCard = ({uri}) => (
  <Card elevation={5} style={styles.card}>
    <Card.Title title="Foto" />
    <Card.Cover source={{uri}} style={styles.picture} />
  </Card>
);

function SampleDetails(navigator) {
  const {
    route: {params},
  } = navigator;

  const {navigation} = navigator;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => (
        <Header
          title={params.title}
          subtitle={ago(new Date(params.timestamp))}
        />
      ),
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <MapComponent latitude={params.latitude} longitude={params.longitude} />
      <PictureCard uri={params.uri} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: APP_THEME.colors.accent,
  },
  title: {
    fontSize: 20,
    color: APP_THEME.colors.background,
  },
  subtitle: {
    fontSize: 12,
    color: APP_THEME.colors.background,
  },

  card: {
    width: '90%',
    maxHeight: 400,
    alignSelf: 'center',
    margin: 16,
    justifyContent: 'center',
  },
  picture: {
    // alignSelf: 'center',
    height: 300,
  },
});

export default SampleDetails;
