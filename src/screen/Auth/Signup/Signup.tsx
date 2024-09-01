import React, {FC, useState} from 'react';
import {Container, Text, TextInput, Button} from '../../../components';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {routeName} from '../../../navigation/routes';
import {SignupwithEmail} from '../../../firebase/auth';
import {showMessage} from 'react-native-flash-message';
import KeychainServices, {keyChainKey} from '../../../utils/keychain';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useApp from '../../../hooks/apphook';
import {
  alphabate,
  passwordValidation,
  validateEmail,
} from '../../../utils/validation';
import {errorMessage} from '../../../utils/errormessage';

interface signupErrorState {
  firstNameError: string | null;
  lastNameError: string | null;
  emailError: string | null;
  passwordError: string | null;
}

const signupErrorInitialState: signupErrorState = {
  firstNameError: null,
  lastNameError: null,
  emailError: null,
  passwordError: null,
};

const Signup: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {setUserInfo} = useApp();

  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<signupErrorState>(signupErrorInitialState);

  const onClickSignin = () => {
    navigation.navigate(routeName.signin as never);
  };

  const handleOnChange = (filed: string, value: string) => {
    switch (filed) {
      case 'firstName':
        setFirstName(value);
        setError(prev => ({
          ...prev,
          firstNameError: alphabate(
            value,
            errorMessage.invalidName,
            errorMessage.requestfirstName,
          ),
        }));

        break;

      case 'lastName':
        setLastName(value);
        setError(prev => ({
          ...prev,
          lastNameError: alphabate(
            value,
            errorMessage.invalidName,
            errorMessage.requestlastName,
          ),
        }));
        break;

      case 'email':
        setEmail(value);

        setError(prev => ({
          ...prev,
          emailError: validateEmail(value),
        }));
        break;
      case 'password':
        setPassword(value);
        setError(prev => ({
          ...prev,
          passwordError: passwordValidation(value),
        }));
        break;

      default:
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setError(signupErrorInitialState);
    }
  };

  const onClickSignup = async () => {
    const fError = alphabate(
      firstName,
      errorMessage.invalidName,
      errorMessage.requestfirstName,
    );
    const lError = alphabate(
      lastName,
      errorMessage.invalidName,
      errorMessage.requestlastName,
    );

    const eError = validateEmail(email);

    const pError = passwordValidation(password);

    if (fError || lError || eError || pError) {
      setError(prev => ({
        ...prev,
        firstNameError: fError,
        lastNameError: lError,
        emailError: eError,
        passwordError: pError,
      }));

      return;
    }

    setError(signupErrorInitialState);

    try {
      setLoading(true);
      const result = await SignupwithEmail(
        email,
        password,
        firstName,
        lastName,
      );
      if (result?.status) {
        const response = await KeychainServices.setUserCredentials(
          email,
          JSON.stringify(result),
          keyChainKey,
        );
        setUserInfo(result);
        setLoading(false);
        if (response.status) {
          navigation.replace(routeName.application);
        }
      } else {
        setLoading(false);
        showMessage({
          message: 'Signup Error',
          description: result?.error,
          duration: 3000,
          type: 'danger',
          icon: 'danger',
        });
      }
    } catch (err) {
      setLoading(false);
      showMessage({
        message: 'Signup Error',
        description: err as string,
        duration: 3000,
        type: 'danger',
        icon: 'danger',
      });
    }
  };

  return (
    <Container style={styles.container}>
      <Text style={styles.welcomeMsg}>Register</Text>
      <Container>
        <TextInput
          lable="FirstName"
          placeholder="Enter your First Name"
          value={firstName}
          onChangeText={text => handleOnChange('firstName', text)}
        />
        {error.firstNameError && <Text isDanger>{error.firstNameError}</Text>}
      </Container>
      <Container>
        <TextInput
          lable="LastName"
          placeholder="Enter your Last Name"
          value={lastName}
          onChangeText={text => handleOnChange('lastName', text)}
        />
        {error.lastNameError && <Text isDanger>{error.lastNameError}</Text>}
      </Container>
      <Container>
        <TextInput
          lable="Email"
          placeholder="Enter your email address"
          value={email}
          onChangeText={text => handleOnChange('email', text)}
        />
        {error.emailError && <Text isDanger>{error.emailError}</Text>}
      </Container>
      <Container>
        <TextInput
          lable="Password"
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={text => handleOnChange('password', text)}
        />
        {error.passwordError && <Text isDanger>{error.passwordError}</Text>}
      </Container>
      <Button
        childrenContainerStyle={styles.btn}
        onPress={onClickSignup}
        isLoading={loading}>
        <Text isWhite fontLarge isCenter style={styles.btnText}>
          Signup
        </Text>
      </Button>

      <Button
        childrenContainerStyle={styles.btn}
        isTransparent
        onPress={onClickSignin}>
        <Text isPrimary fontLarge isCenter style={styles.btnText}>
          Signin
        </Text>
      </Button>
    </Container>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 120,
    gap: 16,
  },
  welcomeMsg: {
    fontSize: 24,
    fontWeight: '700',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '700',
  },
});
