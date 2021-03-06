import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { setProfile } from '../actions/user';
import { setLoggedin } from '../actions/authentication';

const LogoutScreen = props => {
  // console.log('props', props);
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerNavigatorItems {...props} />
        <Button
          title="Logout"
          type="clear"
          onPress={async () => {
            await firebase.auth().signOut();
            props.dispatch(setLoggedin(false));
            props.dispatch(setProfile({}));
            props.navigation.navigate('Auth');
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default connect()(LogoutScreen);
