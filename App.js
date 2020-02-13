import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';
import Navigator from './router/index';
import 'react-native-gesture-handler';
import thunk from 'redux-thunk';
import NetInfo from '@react-native-community/netinfo';
import {View, Text, RefreshControl} from 'react-native';
import {Content} from 'native-base';
const store = createStore(reducers, applyMiddleware(thunk));
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connection: true,
      refreshing: false,
    };
  }
  checkConnection = () => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === false) {
        this.setState({
          connection: false,
        });
      } else {
        this.setState({
          connection: true,
        });
      }
    });
  };
  componentWillMount(nextProps) {
    this.checkConnection();
  }
  onRefresh = () => {
    this.checkConnection();
  };
  componentDidMount() {}
  render() {
    if (this.state.connection === false) {
      return (
        <Content
          refreshControl={
            <RefreshControl
              onRefresh={this.onRefresh}
              refreshing={this.state.refreshing}
              title="Yükleniyor"
              progressBackgroundColor={'#fff'}
            />
          }
          scrollEventThrottle={500}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            padding: 30,
          }}>
          <Text>
            {'Uygulamayı Kullanabilmek İçin\n' +
              'İnternet Bağlantısı Gerekmektedir'}
          </Text>
        </Content>
      );
    }
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
export default App;
