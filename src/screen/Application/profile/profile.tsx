import React, {FC, useEffect, useState} from 'react';
import {Container, Text, TextInput, Button, Loader} from '../../../components';
import {StyleSheet} from 'react-native';
import {refenece, updateUser} from '../../../firebase/database';
import useApp from '../../../hooks/apphook';
import {errorMessage} from '../../../utils/errormessage';
import {alphabate, numeric} from '../../../utils/validation';

export interface errorState {
  firstNameError: null | string;
  lastNameError: null | string;
  contactError: null | string;
}

export const initialErrorState: errorState = {
  firstNameError: null,
  lastNameError: null,
  contactError: null,
};

const Profile: FC = () => {
  const {userInfo} = useApp();
  const [loading, setLoading] = useState<boolean>(false);
  const [isEdit, setEdit] = useState<boolean>(false);
  const [user, setUser] = useState<any>({
    firstname: '',
    lastname: '',
    email: '',
    contactNumber: '',
  });

  const [error, setError] = useState<errorState>(initialErrorState);
  const hide = user?.contactNumber || isEdit;

  const getUserInfo = () => {
    setLoading(true);
    refenece(userInfo.data.user.uid).on('value', snapshot => {
      setUser(snapshot.val());
      setLoading(false);
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleOnChange = (filed: string, value: string) => {
    switch (filed) {
      case 'firstName':
        setUser((prev: any) => ({
          ...prev,
          firstname: value,
        }));
        setError((prev: any) => ({
          ...prev,
          firstNameError: alphabate(
            value,
            errorMessage.invalidName,
            errorMessage.requestfirstName,
          ),
        }));
        break;
      case 'lastName':
        setUser((prev: any) => ({
          ...prev,
          lastname: value,
        }));
        setError((prev: any) => ({
          ...prev,
          lastNameError: alphabate(
            value,
            errorMessage.invalidName,
            errorMessage.requestlastName,
          ),
        }));
        break;
      case 'contact':
        setUser((prev: any) => ({
          ...prev,
          contactNumber: value,
        }));
        setError((prev: any) => ({
          ...prev,
          contactError: numeric(
            value,
            errorMessage.invalidNumber,
            errorMessage.requestNumber,
          ),
        }));
        break;
      default:
        setUser({
          firstname: '',
          lastname: '',
          email: '',
          contactNumber: '',
        });
        setError(initialErrorState);
    }
  };

  const onClickSave = () => {
    setEdit(false);
    let fError = alphabate(
      user.firstname,
      errorMessage.invalidName,
      errorMessage.requestfirstName,
    );
    let lError = alphabate(
      user.lastname,
      errorMessage.invalidName,
      errorMessage.requestlastName,
    );
    let cError = numeric(
      user.contactNumber,
      errorMessage.invalidNumber,
      errorMessage.requestNumber,
    );
    if (fError || lError || cError) {
      setError(prev => ({
        ...prev,
        firstNameError: fError,
        lastNameError: lError,
        contactError: cError,
      }));

      return;
    }
    setError(initialErrorState);
    updateUser(userInfo.data.user.uid, user);
    getUserInfo();
  };

  return (
    <Container style={styles.container}>
      <Loader visible={loading} />
      <Text isCenter isHeadingTitle isPrimary style={styles.header}>
        Profile
      </Text>
      <Container>
        <TextInput
          lable="FirstName"
          placeholder="Enter your First Name"
          value={user?.firstname}
          onChangeText={text => handleOnChange('firstName', text)}
        />
        {error.firstNameError && <Text isDanger>{error.firstNameError}</Text>}
      </Container>
      <Container>
        <TextInput
          lable="LastName"
          placeholder="Enter your Last Name"
          value={user?.lastname}
          onChangeText={text => handleOnChange('lastName', text)}
        />
        {error.lastNameError && <Text isDanger>{error.lastNameError}</Text>}
      </Container>
      <TextInput
        lable="Email"
        placeholder="Enter your email address"
        value={user?.email}
        editable={false}
      />
      {hide && (
        <Container>
          <TextInput
            lable="Contact No."
            placeholder="Enter your Last Name"
            value={user?.contactNumber}
            keyboardType="number-pad"
            onChangeText={text => {
              handleOnChange('contact', text);
              setEdit(true);
            }}
          />
          {error.contactError && <Text isDanger>{error.contactError}</Text>}
        </Container>
      )}

      <Button childrenContainerStyle={styles.btn} onPress={onClickSave}>
        <Text isWhite fontLarge isCenter style={styles.btnText}>
          Save
        </Text>
      </Button>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 24,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    width: 100,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 8,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '700',
  },
});
