import React, {useEffect, useState} from 'react';
import {List, FAB, Divider, ActivityIndicator} from 'react-native-paper';
import {SafeAreaView, FlatList, StyleSheet, Text} from 'react-native';
import {requestGeoPermission, triggerCameraAndTakePhoto} from '../../utils';
import {dispatch, useSelector, useDispatch} from 'react-redux';
import {pictureAdded} from '../pictures/PicturesSlice';
// import {pictureAdded} from '../pictures/PicturesSlice';

const renderItem = ({item, pressHandler}) => {
  const {id, title, timestamp} = item;
  const ago = require('s-ago');
  const time = ago(new Date(timestamp));
  console.log('rendering item...' + time);
  return (
    <>
      <List.Item
        onPress={() => {
          pressHandler(item);
        }}
        title={title}
        description={time}
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
      />
    </>
  );
};

function Home({navigation}) {
  const {navigate} = navigation;
  const [gpsGranted, setGpsGranted] = useState(false);
  const dispatch = useDispatch();
  let data = useSelector((state) => state.picture);
  // TODO: Add firestore and use this
  const [isRefreshing, setIsRefreshing] = useState(false);

  // useEffect(() => {
  //   // setIsRefreshing(!isRefreshing);
  // }, [data]);

  useEffect(() => {
    requestGeoPermission().then(setGpsGranted);
  }, []);

  const pressHandler = (item) => {
    navigate('Details', {...item});
  };

  const savePicture = (picture) => {
    dispatch(pictureAdded(picture));
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

  if (isRefreshing)
    return <ActivityIndicator animating={true} style={styles.emptyMessage} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshing={isRefreshing}
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
