export const addContact = 'ADD_CONTACT';
export const getContactList = 'GET_CONTACT_LIST';
export const deleteContact = 'DELETE_CONTACT';
export const updateContact = 'UPDATE_CONTACT';
const INITIAL_STATE = {
  contactList: [],
};
export default (state = INITIAL_STATE, action) => {
  debugger;
  if (action.type === addContact) {
    return {
      ...state,
    };
  } else if (action.type === getContactList) {
    return Object.assign({}, state, {
      contactList: [action.payload],
    });
  } else if (action.type === deleteContact) {
    let data;
    data = state.contactList[0].filter(item => {
      return item.id !== action.payload.id;
    });
    return Object.assign({}, state, {
      contactList: [data],
    });
  } else if (action.type === updateContact) {
    debugger;
    state.contactList[0].forEach(item => {
      if (item.id == action.payload.id) {
        item.name = action.payload.name;
        item.phone = action.payload.phone;
        item.surname = action.payload.surname;
      }
    });
    debugger;
    return state;
  }
  return state;
};
