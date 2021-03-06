import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { setLoggedin } from '../actions/authentication';
import firebase from 'react-native-firebase';
import {setProfile} from '../actions/user';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../assets/images/bg_sign_in_screen.jpg');

class SignInScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      email_valid: true,
      password: '',
      login_failed: false,
      showLoading: false,
      error: '',
    };
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  async submitLoginCredentials() {
    const { showLoading, email, password } = this.state;
    const isEmpty = email === '' || password === '';

    this.setState({
      showLoading: !showLoading,
    });

    if (isEmpty) {
      this.setState({
        error: 'Please fill your information completely.',
        showLoading: false,
      });
    } else {
      try {
        await this._loginwithEmailAndPassword(email, password);
      } catch (error) {
        console.log('error', error);
      }
    }
  }

  _loginwithEmailAndPassword = async (email, password) => {
    try {
      const { navigation, dispatch } = this.props;
      const respone = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const { displayName, uid } = respone.user._user;
      dispatch(setLoggedin(true));
      dispatch(setProfile({ displayName, email, uid }));
      navigation.navigate('App');
      console.log('loggin complete', respone.user._user);
    } catch (error) {
      this.setState({
        error: error.message,
        showLoading: false,
      });
      console.log('error', error);
    }
  };

  _setEmailRef = () => input => (this.emailInput = input);

  _setPasswordRef = input => (this.passwordInput = input);

  _onEmailChanged = email => this.setState({ email });

  _onEmailSubmit = () => {
    const { email } = this.state;
    this.setState({ email_valid: this.validateEmail(email) });
    this.passwordInput.focus();
  };

  _onPasswordChange = password => this.setState({ password });

  _toRegister = () => {
    const { navigation } = this.props;
    navigation.navigate('Register');
  };

  render() {
    const { email, password, email_valid, showLoading, error } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark" />
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View style={styles.loginView}>
            <View style={styles.loginTitle}>
              <View style={{ marginTop: -10 }}>
                <Text style={styles.travelText}>Igetweb HR</Text>
              </View>
            </View>
            <View style={styles.loginInput}>
              <Text style={styles.errorText}>{error}</Text>
              <Input
                leftIcon={
                  <Icon
                    name="user-o"
                    type="font-awesome"
                    color="rgba(171, 189, 219, 1)"
                    size={25}
                  />
                }
                containerStyle={{ marginVertical: 10 }}
                onChangeText={this._onEmailChanged}
                value={email}
                inputStyle={{ marginLeft: 10, color: 'white' }}
                keyboardAppearance="light"
                placeholder="Username"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                ref={this._setEmailRef}
                onSubmitEditing={this._onEmailSubmit}
                blurOnSubmit={false}
                placeholderTextColor="white"
                errorStyle={{ textAlign: 'center', fontSize: 12 }}
                errorMessage={
                  email_valid ? null : 'Please enter a valid email address'
                }
              />
              <Input
                leftIcon={
                  <Icon
                    name="lock"
                    type="font-awesome"
                    color="rgba(171, 189, 219, 1)"
                    size={25}
                  />
                }
                containerStyle={{ marginVertical: 10 }}
                onChangeText={this._onPasswordChange}
                value={password}
                inputStyle={{ marginLeft: 10, color: 'white' }}
                secureTextEntry={true}
                keyboardAppearance="light"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                ref={this._setPasswordRef}
                blurOnSubmit={true}
                placeholderTextColor="white"
              />
            </View>
            <Button
              title="LOG IN"
              activeOpacity={1}
              underlayColor="transparent"
              onPress={this.submitLoginCredentials.bind(this)}
              loading={showLoading}
              loadingProps={{ size: 'small', color: 'white' }}
              disabled={!email_valid && password.length < 8}
              buttonStyle={{
                height: 50,
                width: 250,
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{ marginVertical: 10 }}
              titleStyle={{ fontWeight: 'bold', color: 'white' }}
            />
            <View style={styles.footerView}>
              {/* <Button
                title="Create an Account"
                type="clear"
                activeOpacity={0.5}
                titleStyle={{ color: 'white', fontSize: 15 }}
                containerStyle={{ marginTop: -10 }}
                onPress={this._toRegister}
              /> */}
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginView: {
    // marginTop: 100,
    backgroundColor: 'transparent',
    width: 250,
    height: 400,
  },
  loginTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  travelText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'regular',
    textAlign: 'center',
  },
  plusText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular',
  },
  loginInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerView: {
    marginTop: 20,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect()(SignInScreen);
