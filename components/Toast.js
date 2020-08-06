// TODO: when GPS data is not available, this toast will be displayed and when the action
// is triggered the item must be updated with current GPS data
import * as React, {useState} from 'react';
import {Snackbar} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';

const Toast = ({item}) => {
  const [visible, setVisible] = useState(true);

  const onDismissSnackBar = () => setVisible(false);

  const onPress = () => {
    Geolocation.getCurrentPosition((info) => console.log(info));
  };

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      action={{
        label: 'Use current location instead',
        onPress,
      }}>
      Hey there! I'm a Snackbar.
    </Snackbar>
  );
};

export default Toast;
