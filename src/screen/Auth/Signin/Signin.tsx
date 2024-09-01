import React, {FC, useState} from 'react';
import {Container, Text, TextInput, Button} from '../../../components';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {routeName} from '../../../navigation/routes';
import {signinWithEmail} from '../../../firebase/auth';
import {showMessage} from 'react-native-flash-message';
import KeychainServices, {keyChainKey} from '../../../utils/keychain';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useApp from '../../../hooks/apphook';
import {validateEmail, passwordValidation} from '../../../utils/validation';

const Signin: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {setUserInfo} = useApp();

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const onClickSignup = () => {
    navigation.navigate(routeName.signup as never);
  };
  const onClickSignin = async () => {
    const eError = validateEmail(email);
    const pError = passwordValidation(password);
    if (pError || eError) {
      setEmailError(eError);
      setPasswordError(pError);
      return;
    }
    setEmailError(null);
    setPasswordError(null);
    try {
      setLoading(true);
      const result = await signinWithEmail(email, password);
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
          message: 'Signin Error',
          description: result?.error,
          duration: 3000,
          type: 'danger',
          icon: 'danger',
        });
      }
    } catch (err) {
      setLoading(false);
      showMessage({
        message: 'Signin Error',
        description: err as string,
        duration: 3000,
        type: 'danger',
        icon: 'danger',
      });
    }
  };
  return (
    <Container style={styles.container}>
      <Text style={styles.welcomeMsg}>SignIn to Continue</Text>
      <Container>
        <TextInput
          lable="Email"
          placeholder="Enter your email address"
          keyboardType="email-address"
          value={email}
          onChangeText={text => {
            setEmail(text);
            setEmailError(validateEmail(text));
          }}
        />
        {emailError && <Text isDanger> {emailError}</Text>}
      </Container>
      <Container>
        <TextInput
          lable="Password"
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={text => {
            setPassword(text);
            setPasswordError(passwordValidation(text));
          }}
        />
        {passwordError && <Text isDanger> {passwordError}</Text>}
      </Container>
      <Button
        childrenContainerStyle={styles.btn}
        onPress={onClickSignin}
        isLoading={loading}>
        <Text isWhite fontLarge isCenter style={styles.btnText}>
          Signin
        </Text>
      </Button>

      <Button
        childrenContainerStyle={styles.btn}
        isTransparent
        onPress={onClickSignup}>
        <Text isPrimary fontLarge isCenter style={styles.btnText}>
          Signup
        </Text>
      </Button>
    </Container>
  );
};

export default Signin;

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
