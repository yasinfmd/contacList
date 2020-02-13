import axios from 'axios';
import {
  addContact,
  getContactList,
  deleteContact,
  updateContact,
} from '../../reducers/contact/index';
export const createContact = data => {
  return async dispatch => {
    return axios
      .post('https://rnativecontactlist.firebaseio.com/rehber.json', data)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  };
};

export const deleteContactUser = data => {
  debugger;
  return async dispatch => {
    return axios
      .delete(
        'https://rnativecontactlist.firebaseio.com/rehber/' + data.id + '.json',
      )
      .then(res => {
        dispatch({
          type: deleteContact,
          payload: data,
        });
        return res;
      })
      .catch(err => {
        return err;
      });
  };
};
export const updateContactUser = data => {
  debugger;
  return async dispatch => {
    return axios
      .put(
        'https://rnativecontactlist.firebaseio.com/rehber/' + data.id + '.json',
        data,
      )
      .then(res => {
        dispatch({
          type: updateContact,
          payload: data,
        });
        return res;
      })
      .catch(err => {
        return err;
      });
  };
};

export const fetchContact = () => {
  debugger;
  return async dispatch => {
    axios
      .get('https://rnativecontactlist.firebaseio.com/rehber.json')
      .then(res => {
        let contacs = [];
        for (var key in res.data) {
          if (!res.data.hasOwnProperty(key)) continue;
          var obj = res.data[key];
          for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) continue;
          }
          contacs.push({
            name: obj.name,
            phone: obj.phone,
            surname: obj.surname,
            id: key,
          });
        }
        contacs.sort(function(a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        dispatch({
          type: getContactList,
          payload: contacs,
        });
        return res;
      })
      .catch(err => {});
  };
};
