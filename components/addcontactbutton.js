import React from 'react';
import {Content, Button, Text} from 'native-base';
const addContactButton = props => {
  return (
    <Content style={{marginTop: 20, padding: 50}}>
      <Button block success onPress={props.onClick}>
        <Text>{props.text}</Text>
      </Button>
    </Content>
  );
};
export default addContactButton;
