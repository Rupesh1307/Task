import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routeName} from './routes';
import Auth from './Auth/Auth';
import Application from './Application/Application';
import SplashScreen from '../screen/Splash/spalsh';

const stack = createNativeStackNavigator();

const RootNavigation: FC = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={routeName.splash}>
        <stack.Screen name={routeName.splash} component={SplashScreen} />
        <stack.Screen name={routeName.auth} component={Auth} />
        <stack.Screen name={routeName.application} component={Application} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
