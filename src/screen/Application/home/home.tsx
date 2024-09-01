import React, {FC} from 'react';
import {Button, Container, Text} from '../../../components';
import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';
import KeychainServices, {keyChainKey} from '../../../utils/keychain';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {routeName} from '../../../navigation/routes';
import {signOut} from '../../../firebase/auth';

const Home: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const onClicklogout = async () => {
    await signOut();
    const result = await KeychainServices.resetUserCredentials(keyChainKey);
    if (result?.status) {
      navigation.replace(routeName.auth);
    }
  };

  return (
    <Container style={styles.container}>
      <Text style={styles.welcomMag} isCenter>
        Welcome to User Management System
      </Text>
      <Button
        childrenContainerStyle={styles.btn}
        isTransparent
        buttonBorderWidth={0}
        buttonWidth={'30%'}
        onPress={onClicklogout}>
        <Text isDanger fontLarge isCenter style={styles.btnText}>
          Logout
        </Text>
      </Button>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 240,
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 32,
  },
  welcomMag: {
    fontSize: 24,
    color: colors.primary,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  btnText: {
    fontWeight: '700',
  },
});
