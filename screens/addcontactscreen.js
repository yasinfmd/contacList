import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Content} from 'native-base';
import ContactInput from '../components/input';
import Dialog from 'react-native-dialog';
import {
  createContact,
  fetchContact,
  updateContactUser,
} from '../actions/contact';
import ContactButton from '../components/addcontactbutton';
class AddContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      username: '',
      usersurname: '',
      userphone: '',
      alertText: '',
      alertTitle: '',
      editMode: false,
      editedID: null,
    };
  }
  componentDidMount() {
    let routeParam = this.props.navigation.getParam('data');
    if (routeParam) {
      this.setState({
        username: routeParam.name,
        usersurname: routeParam.surname,
        userphone: routeParam.phone,
        editMode: true,
        editedID: routeParam.id,
      });
    }
  }
  static navigationOptions = ({navigation}) => {
    let routeParam = navigation.getParam('data');
    let headerTitle;
    if (routeParam) {
      headerTitle = 'Kişi Düzenle';
    } else {
      headerTitle = 'Yeni Kişi Ekle';
    }
    return {
      headerTitle,
    };
  };
  formValidationControl = () => {
    if (this.state.username.trim() === '') {
      this.setState({
        showAlert: true,
        alertTitle: 'Uyarı',
        alertText: 'Lütfen Ad Giriniz',
      });
    } else if (this.state.usersurname.trim() === '') {
      this.setState({
        showAlert: true,
        alertTitle: 'Uyarı',
        alertText: 'Lütfen Soyad Giriniz',
      });
    } else if (this.state.userphone.trim().length < 10) {
      this.setState({
        showAlert: true,
        alertTitle: 'Uyarı',
        alertText: 'Lütfen Telefon Numarası Giriniz',
      });
    } else {
      let data = {
        name: this.state.username,
        surname: this.state.usersurname,
        phone: this.state.userphone,
      };
      if (this.state.editMode === true) {
        data.id = this.state.editedID;
        this.props
          .updateContactUser(data)
          .then(res => {
            this.props.fetchContact();
            this.props.navigation.navigate('contactList');
          })
          .catch(err => {
            alert(err);
          });
      } else {
        this.props
          .createContact(data)
          .then(res => {
            if (res.status === 200) {
              this.props.fetchContact();
              this.props.navigation.navigate('contactList');
            }
          })
          .catch(err => {
            alert(err);
          });
      }
      debugger;
    }
  };
  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };
  changeName = e => {
    this.setState({
      username: e,
    });
  };
  changeSurName = e => {
    this.setState({
      usersurname: e,
    });
  };
  changePhoneNumber = e => {
    this.setState({
      userphone: e,
    });
  };
  render() {
    return (
      <Container>
        <Dialog.Container visible={this.state.showAlert}>
          <Dialog.Title>{this.state.alertText}</Dialog.Title>
          <Dialog.Description>{this.state.alertText}</Dialog.Description>
          <Dialog.Button label="Tamam" color="#f65" onPress={this.hideAlert} />
        </Dialog.Container>
        <Content style={{padding: 20}}>
          <ContactInput
            keyType="next"
            placeholder="Ad"
            name="person"
            keyboardType="default"
            value={this.state.username}
            changeText={e => {
              this.changeName(e);
            }}
          />
          <ContactInput
            keyType="next"
            placeholder="Soyad"
            keyboardType="default"
            name="person"
            value={this.state.usersurname}
            changeText={e => {
              this.changeSurName(e);
            }}
          />
          <ContactInput
            keyType="done"
            placeholder="Telefon Numarası"
            name="call"
            maxLength={11}
            keyboardType="numeric"
            value={this.state.userphone}
            changeText={e => {
              this.changePhoneNumber(e);
            }}
          />
          <ContactButton
            text={this.state.editMode ? 'Güncelle' : 'Kaydet'}
            onClick={() => {
              this.formValidationControl();
            }}
          />
          <ContactButton text={'zzzzz'} onClick={() => {}} />
        </Content>
      </Container>
    );
  }
}

// eslint-disable-next-line prettier/prettier
export default connect(null, {createContact, fetchContact, updateContactUser})(
  AddContactScreen,
);
