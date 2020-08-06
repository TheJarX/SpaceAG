import {PermissionsAndroid} from 'react-native';
import {DefaultTheme} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

export const APP_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4F4F4F',
    accent: '#898989',
    background: '#FFF',
  },
};

const options = {
  title: 'Tomar muestra',
  quality: 1,
  mediaType: 'photo',
  cameraType: 'back',
  allowsEditing: true,
  noData: true,
  maxWidth: 8000,
  maxHeight: 8000,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export const triggerCameraAndTakePhoto = () =>
  new Promise((resolve, reject) => {
    ImagePicker.launchCamera(options, (response) => {
      delete response.data;

      if (response.didCancel) {
        reject('User cancelled image picker');
      } else if (response.error) {
        reject('ImagePicker Error: ', response.error);
      } else {
        resolve(response);
      }
    });
  });

export const requestGeoPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'We need Location services',
        message:
          'This app needs access to your GPS ' +
          'so you can take pictures with coordinates included.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};
