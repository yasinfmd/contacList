import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ContactListScreen from '../screens/contaclistscreen';
import AddContactScreen from '../screens/addcontactscreen';
const navigation = createStackNavigator(
  {
    contactList: {
      screen: ContactListScreen,
      navigationOptions: {
        title: 'Rehberim',
      },
    },
    addContact: {
      screen: AddContactScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerTintColor: 'black',
    },
  },
);
export default createAppContainer(navigation);
