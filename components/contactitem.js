import React from 'react';
import {ImageBackground, TouchableHighlight, StyleSheet} from 'react-native';
import {ListItem, Left, Text, Body, Icon, Right} from 'native-base';
import Swipeable from 'react-native-swipeable';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
export default class ContactItem extends React.Component {
  getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  leftButton = [
    <TouchableHighlight
      style={{
        backgroundColor: '#1bd146',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
      }}>
      <Icon name="call" style={{color: '#fefefe'}} />
    </TouchableHighlight>,
  ];
  rightButtons = [
    <TouchableHighlight
      onPress={this.props.deletePress}
      style={{
        backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
      }}>
      <Icon name="trash" style={{color: '#fefefe'}} />
    </TouchableHighlight>,
    <TouchableHighlight
      onPress={this.props.editPress}
      style={{
        backgroundColor: 'orange',
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
      }}>
      <Icon name="arrow-forward" style={{color: '#fefefe'}} />
    </TouchableHighlight>,
  ];

  render() {
    return (
      <Swipeable
        onLeftButtonsOpenRelease={this.props.call}
        rightButtons={this.rightButtons}
        leftButtonWidth={300}
        leftButtons={this.leftButton}>
        <ListItem
          avatar
          key={this.props.id}
          onLongPress={this.props.longpress}
          onPress={this.props.call}>
          <Left>
            <ImageBackground
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: this.getRandomColor(),
                width: 50,
                height: 50,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: '#fefefe',
              }}>
              <Text style={{color: '#fefefe', fontSize: 30}}>
                {this.props.username &&
                  this.props.username.split('')[0].toUpperCase()}
              </Text>
            </ImageBackground>
          </Left>
          <Body>
            <Text style={{fontWeight: 'bold'}}>
              {this.props.username + ' ' + this.props.userSurName}{' '}
            </Text>
            <Text note>{this.props.number}</Text>
          </Body>
          <Right>
            <TouchableNativeFeedback onPress={this.props.call}>
              <Icon name="call" style={{color: '#2feb5b'}} />
            </TouchableNativeFeedback>
          </Right>
        </ListItem>
      </Swipeable>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  listItem: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
});
