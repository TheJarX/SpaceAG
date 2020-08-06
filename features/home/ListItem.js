import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {List} from 'react-native-paper';

function ListItem({item, pressHandler}) {
  const ago = require('s-ago');
  const {title, timestamp} = item;
  const [time, setTime] = useState(ago(new Date(timestamp)));

  useEffect(() => {
    setInterval(() => {
      setTime(ago(new Date(timestamp)));
    }, 60000); // every minute
  }, [time]);

  return (
    <List.Item
      onPress={() => {
        pressHandler(item);
      }}
      title={title}
      description={() => <Text>{time}</Text>}
      right={(props) => <List.Icon {...props} icon="arrow-right" />}
    />
  );
}

export default ListItem;
