/* eslint-disable react/no-unstable-nested-components */
import React, {FC} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Home from '../../screen/Application/home/home';
import Dashboard from '../../screen/Application/dashboard/dshboard';
import {routeName} from '../routes';
import Form from '../../screen/Application/form/form';
import Users from '../../screen/Application/users/Users';
import Profile from '../../screen/Application/profile/profile';
import {colors} from '../../utils/colors';
import Icon from '../../components/Icon/Icon';

const Tab = createMaterialBottomTabNavigator();
const Application: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={routeName.home}
      activeColor={colors.primary}
      barStyle={{backgroundColor: colors.white}}>
      <Tab.Screen
        name={routeName.home}
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <Icon
              origin="MaterialIcons"
              name="home"
              color={focused ? colors.primary : colors.text}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routeName.dashboard}
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({focused}) => (
            <Icon
              origin="MaterialIcons"
              name="dashboard"
              color={focused ? colors.primary : colors.text}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routeName.form}
        component={Form}
        options={{
          tabBarLabel: 'Contact Form',
          tabBarIcon: ({focused}) => (
            <Icon
              origin="AntDesign"
              name="form"
              color={focused ? colors.primary : colors.text}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routeName.users}
        component={Users}
        options={{
          tabBarLabel: 'User Signup List',
          tabBarIcon: ({focused}) => (
            <Icon
              origin="FontAwesome"
              name="user"
              color={focused ? colors.primary : colors.text}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routeName.profile}
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <Icon
              origin="AntDesign"
              name="profile"
              color={focused ? colors.primary : colors.text}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Application;
