import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SignInScreen from '../screens/SignInScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const AppStack = createDrawerNavigator({
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
    screen: ProfileScreen,
    navigationOptions: {
      title: 'Profile',
      drawerIcon: ({ tintColor }) => (
        <EntypoIcon name="user" color={tintColor} size={25} />
      ),
    },
  },
});

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
