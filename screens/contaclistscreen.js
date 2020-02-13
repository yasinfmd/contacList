import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator, RefreshControl} from 'react-native';
import {Container, View, List, Content, Text, Icon} from 'native-base';
import ActionButton from 'react-native-action-button';
import {fetchContact, deleteContactUser} from '../actions/contact/index';
import {connect} from 'react-redux';
import ContactItem from '../components/contactitem';
import {callNumber} from '../provider/index';
import Toast from 'react-native-root-toast';
class ContactListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoad: false,
      refreshing: false,
    };
  }
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <View>
          <Icon name="add" />
        </View>
      ),
    };
  };
  fetchData = () => {
    this.props
      .fetchContact()
      .then(res => {
        this.setState({
          dataLoad: false,
        });
      })
      .catch(err => {});
  };
  componentDidMount() {
    this.setState({
      dataLoad: true,
    });
    this.fetchData();
    this.props.navigation.addListener('didFocus', payload => {});
  }
  onRefresh = () => {
    this.fetchData();
  };
  selectItem = (item, i) => {
    alert(item + ' ' + i);
  };
  deleteItem = (item, i) => {
    this.props.deleteContactUser(item).then(res => {
      Toast.show(item.name + ' ' + item.surname + ' ' + 'Silindi', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {},
        onShown: () => {},
        onHide: () => {},
        onHidden: () => {},
      });
    });
  };
  callNumber = item => {
    callNumber(item.phone);
  };
  routeEditPage = item => {
    this.props.navigation.navigate('addContact', {data: item});
  };
  renderContact = () => {
    let item;
    if (
      this.props.contactData.contactList[0] &&
      this.props.contactData.contactList[0].length > 0
    ) {
      item = this.props.contactData.contactList[0].map((item, i) => (
        <ContactItem
          editPress={() => this.routeEditPage(item)}
          call={() => this.callNumber(item)}
          deletePress={() => this.deleteItem(item, i)}
          longpress={() => this.selectItem(item, i)}
          key={item.id}
          username={item.name}
          userSurName={item.surname}
          number={item.phone}
        />
      ));
    } else {
    }
    return item;
  };
  routePage = () => {
    this.props.navigation.navigate('addContact');
  };
  render() {
    if (this.props.contactData.contactList[0] === undefined) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={50} />
        </View>
      );
    } else {
      return (
        <Container>
          <Container>
            <Content
              refreshControl={
                <RefreshControl
                  onRefresh={this.onRefresh}
                  refreshing={this.state.refreshing}
                  title="Yükleniyor"
                  progressBackgroundColor={'#fff'}
                />
              }
              scrollEventThrottle={500}>
              <List itemHeader={true}>{this.renderContact()}</List>
              <Text style={{textAlign: 'center', margin: 20}}>
                Toplam
                {this.props.contactData.contactList[0]
                  ? ' ' + this.props.contactData.contactList[0].length + ' '
                  : 0 + ' '}
                Kişi
              </Text>
            </Content>
          </Container>
          <ActionButton
            buttonColor="#8d0bb5"
            onPress={this.routePage}></ActionButton>
        </Container>
      );
    }
  }
}
const mapStateToProps = state => {
  debugger;
  return {
    contactData: state.contact,
  };
};
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default connect(mapStateToProps, {fetchContact, deleteContactUser})(
  ContactListScreen,
);
