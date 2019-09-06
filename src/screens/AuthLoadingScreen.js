import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Container, Spinner, Content } from 'native-base';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    this.props.navigation.navigate('Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <Container>
        {/*<StatusBar barStyle="default" />*/}
        <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
          <Spinner color="blue" />
        </Content>
      </Container>
    );
  }
}

export default AuthLoadingScreen;
