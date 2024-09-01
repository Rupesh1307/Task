import auth from '@react-native-firebase/auth';
import {addEmail} from './database';

export const SignupwithEmail = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string,
) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    if (response.user.email) {
      addEmail(response.user.uid, response.user.email, firstname, lastname);
    }
    return {status: true, data: response};
  } catch (error: any) {
    // throw new Error('Something went wrong');
    return {status: false, error: 'Something went wrong'};
  }
};

export const signinWithEmail = async (email: string, password: string) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    return {status: true, data: response};
  } catch (error: any) {
    return {status: false, error: 'Something went wrong'};
  }
};

export const onStateChange = () => {
  let user;
  auth().onAuthStateChanged(state => {
    user = state;
  });

  console.log(user);
};

export const signOut = async () => {
  try {
    const response = await auth().signOut();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
