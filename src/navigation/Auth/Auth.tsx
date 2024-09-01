import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signin from '../../screen/Auth/Signin/Signin';
import Signup from '../../screen/Auth/Signup/Signup';
import {routeName} from '../routes';

const AuthStack = createNativeStackNavigator();

const Auth: FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={routeName.signin}>
      <AuthStack.Screen name={routeName.signin} component={Signin} />
      <AuthStack.Screen name={routeName.signup} component={Signup} />
    </AuthStack.Navigator>
  );
};

export default Auth;
