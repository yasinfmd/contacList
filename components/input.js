import React from 'react';
import {Item, Input, Icon} from 'native-base';
export default class MyInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Item fixedLabel>
        <Input
          returnKeyType="next"
          style={{margin: 10, marginTop: 20}}
          onChangeText={this.props.changeText}
          value={this.props.value}
          {...this.props}
          placeholder={this.props.placeholder}
          keyboardType={this.props.keyboardType}
        />
        <Icon active name={this.props.name} />
      </Item>
    );
  }
}
