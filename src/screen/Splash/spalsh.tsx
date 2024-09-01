import React, {useEffect, FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Container, Text} from '../../components';
import {StyleSheet} from 'react-native';
import KeychainServices, {keyChainKey} from '../../utils/keychain';
import {routeName} from '../../navigation/routes';
import useApp from '../../hooks/apphook';

const SplashScreen: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {setUserInfo} = useApp();

  useEffect(() => {
    (async () => {
      let isUserSignIn = await KeychainServices.getUserCredentials(keyChainKey);

      setTimeout(() => {
        if (isUserSignIn) {
          setUserInfo(JSON.parse(isUserSignIn?.password));
          navigation.replace(routeName.application);
        } else {
          navigation.replace(routeName.auth);
        }
      }, 3000);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container style={styles.container}>
      <Text style={styles.text}>Splash Screen</Text>
    </Container>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
