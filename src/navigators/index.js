import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import SignInScreen from '../screens/SignInScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AddLeaveScreen from '../screens/AddLeaveScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DemoScreen from '../screens/DemoScreen';
import LogoutScreen from '../screens/LogoutScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  AddLeave: AddLeaveScreen,
});

const ProileStack = createStackNavigator({
  Profile: ProfileScreen,
  EditProfile: EditProfileScreen,
});

const AppStack = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
        drawerIcon: ({ tintColor }) => (
          <EntypoIcon name="home" color={tintColor} size={25} />
        ),
      },
    },
    Profile: {
      screen: ProileStack,
      navigationOptions: {
        title: 'Profile',
        drawerIcon: ({ tintColor }) => (
          <EntypoIcon name="user" color={tintColor} size={25} />
        ),
      },
    },
    Demo: DemoScreen,
  },
  {
    contentComponent: props => <LogoutScreen {...props} />,
  },
);

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  Register: RegisterScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
