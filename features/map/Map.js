import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: 210,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

function MapComponent({latitude, longitude}) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider="google"
        region={{
          latitude: latitude || 0.56614,
          longitude: longitude || -51.01177,
          latitudeDelta: 0.01,
          longitudeDelta: 0.001,
        }}>
        <Marker coordinate={{latitude: latitude, longitude: longitude}} />
      </MapView>
    </View>
  );
}

export default MapComponent;
