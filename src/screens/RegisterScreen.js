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
import firebase from 'react-native-firebase';
import { USERS_COLLECTION } from '../constant';
import { connect } from 'react-redux';
import { setLoggedin } from '../actions/authentication';
import { setProfile } from '../actions/user';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../assets/images/register_background.jpg');

class RegisterScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
      headerStyle: { borderBottomWidth: 0 },
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      email_valid: true,
      displayName: '',
      password: '',
      login_failed: false,
      showLoading: false,
      error: '',
    };
    this.fireStoreRef = firebase.firestore().collection(USERS_COLLECTION);
    this.emailInput = React.createRef();
    this.displayNameInput = React.createRef();
    this.passwordInput = React.createRef();
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  async submitRegisterCredentials() {
    const { showLoading } = this.state;
    const { email, password, displayName } = this.state;
    const isEmpty = email === '' || password === '' || displayName === '';

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
        const uid = await this._createUser(email, password);
        await this._storeUserData(uid, displayName);
      } catch (error) {
        console.log('error', error);
      }
    }
  }

  _createUser = async (email, password) => {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      return response.user.uid;
    } catch (error) {
      this.setState({
        error: error.message,
        showLoading: false,
      });
      console.log('error create user', error);
    }
  };

  _storeUserData = async (uid, displayName) => {
    try {
      const { navigation, dispatch } = this.props;

      const userdata = { displayName: displayName, profileImage: null };
      await this.fireStoreRef.doc(uid).set(userdata);
      dispatch(setLoggedin(true));
      dispatch(setProfile(userdata));
      navigation.navigate('App');
    } catch (error) {
      console.log('error adding document: ', error);
    }
  };

  _setEmailRef = () => input => (this.emailInput = input);

  _setDisplayNameRef = input => (this.displayNameInput = input);

  _setPasswordRef = input => (this.passwordInput = input);

  _onEmailChanged = email => this.setState({ email });

  _onEmailSubmit = () => {
    const { email } = this.state;
    this.setState({ email_valid: this.validateEmail(email) });
    this.displayNameInput.focus();
  };

  _onDisplayNameChanged = displayName => this.setState({ displayName });

  _onDisplayNameSubmit = () => {
    this.passwordInput.focus();
  };

  _onPasswordChange = password => this.setState({ password });

  render() {
    const {
      email,
      password,
      displayName,
      email_valid,
      showLoading,
      error,
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark" />
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View style={styles.loginView}>
            <View style={styles.loginTitle}>
              <View style={{ marginTop: -50 }}>
                <Text style={styles.travelText}>Become a part of a</Text>
                <Text style={styles.greatTeamText}>Great team</Text>
              </View>
            </View>
            <View style={styles.loginInput}>
              <Text style={styles.errorText}>{error}</Text>
              <Input
                leftIcon={
                  <Icon
                    name="user-o"
                    type="font-awesome"
                    color="rgba(0,0,0,0.8)"
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
                    name="desktop"
                    type="font-awesome"
                    color="rgba(0,0,0,0.8)"
                    size={25}
                  />
                }
                containerStyle={{ marginVertical: 10 }}
                onChangeText={this._onDisplayNameChanged}
                value={displayName}
                inputStyle={{ marginLeft: 10, color: 'white' }}
                keyboardAppearance="light"
                placeholder="Display Name"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                // keyboardType="email-address"
                returnKeyType="next"
                ref={this._setDisplayNameRef}
                onSubmitEditing={this._onDisplayNameSubmit}
                blurOnSubmit={false}
                placeholderTextColor="white"
                errorStyle={{ textAlign: 'center', fontSize: 12 }}
                // errorMessage={
                //   email_valid ? null : 'Please enter a valid email address'
                // }
              />
              <Input
                leftIcon={
                  <Icon
                    name="lock"
                    type="font-awesome"
                    color="rgba(0,0,0,0.8)"
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
              title="Register"
              activeOpacity={1}
              underlayColor="transparent"
              onPress={this.submitRegisterCredentials.bind(this)}
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
              titleStyle={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}
            />
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
    // height: 450,
  },
  loginTitle: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
  travelText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'bold',
  },
  greatTeamText: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'bold',
  },
  plusText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'regular',
    textAlign: 'center',
  },
  loginInput: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // marginTop: -30
  },
  footerView: {
    marginTop: 20,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect()(RegisterScreen);
