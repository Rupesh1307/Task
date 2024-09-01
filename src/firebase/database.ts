import {firebase} from '@react-native-firebase/database';

interface user {
  firstname: string;
  lastname: string;
  contactNumber: string;
  email: string;
}

export const refenece = (id: string) =>
  firebase
    .app()
    .database('https://task-668f8-default-rtdb.firebaseio.com/')
    .ref(`user/${id}`);

export const addEmail = (
  id: string,
  email: string,
  firstname: string,
  lastname: string,
) => {
  refenece(id).set({email: email, firstname: firstname, lastname: lastname});
};

export const addContact = (id: string, contactNumber: string) => {
  refenece(id).update({contactNumber: contactNumber});
}; //

export const getUser = async () => {
  let result: any = [];
  const data = await firebase
    .app()
    .database('https://task-668f8-default-rtdb.firebaseio.com/')
    .ref('user')
    .once('value');
  data.forEach(user => {
    result.push({id: user.key, email: user.val().email});
  });

  return result;
};

export const updateUser = (id: string, details: user) => {
  refenece(id).update(details);
};
