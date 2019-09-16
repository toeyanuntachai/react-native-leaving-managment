import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SignInScreen from '../screens/SignInScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AddLeaveScreen from '../screens/AddLeaveScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  AddLeave: AddLeaveScreen,
});
const AppStack = createDrawerNavigator({
  Home: HomeStack,
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
