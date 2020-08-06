import React, {useEffect, useState} from 'react';
import {FAB, Divider, ActivityIndicator} from 'react-native-paper';
import {SafeAreaView, FlatList, StyleSheet, Text} from 'react-native';
import {requestGeoPermission, triggerCameraAndTakePhoto} from '../../utils';
import {useSelector, useDispatch} from 'react-redux';
import {
  pictureAdded,
  picturesLoaded,
  picturesSaved,
} from '../pictures/PicturesSlice';
import ListItem from './ListItem';

const renderItem = ({item, pressHandler}) => (
  <ListItem pressHandler={pressHandler} item={item} />
);

function Home({navigation}) {
  const {navigate} = navigation;
  const [gpsGranted, setGpsGranted] = useState(false);
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.picture.isFetching);
  const data = useSelector((state) => state.picture.data);

  useEffect(() => {
    if (!gpsGranted) {
      requestGeoPermission().then(setGpsGranted);
    }
    dispatch(picturesLoaded());
  }, []);

  const pressHandler = (item) => {
    navigate('Details', {...item});
  };

  const savePicture = (picture) => {
    dispatch(pictureAdded(picture));
    dispatch(picturesSaved([...data, picture]));
  };

  const ListEmptyComponent = () => (
    <Text style={styles.emptyMessage}>No tienes ninguna muestra todavía</Text>
  );
  const ItemSeparatorComponent = () => <Divider />;

  const FABOnClick = () => {
    // To ensure include coordinates
    if (!gpsGranted) {
      requestGeoPermission();
    } else {
      try {
        triggerCameraAndTakePhoto().then(savePicture);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isFetching)
    return <ActivityIndicator animating={true} style={styles.emptyMessage} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshing={isFetching}
        progressViewOffset={16}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
        data={data}
        renderItem={({item}) => renderItem({item, pressHandler})}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <FAB
        color="#FFF"
        icon="plus"
        label="Agregar muestra"
        style={styles.fab}
        onPress={FABOnClick}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    tintColor: 'white',
    alignSelf: 'center',
    maxWidth: 200,
    margin: 16,
  },
  emptyMessage: {
    alignSelf: 'center',
    marginTop: 24,
    fontSize: 18,
    color: '#828282',
  },
});

export default Home;
