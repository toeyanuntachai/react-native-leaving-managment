import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';

class ProfileScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  _openDrawer = () => {
    const { navigation } = this.props;
    navigation.openDrawer();
  };

  render() {
    const { user, navigation } = this.props;

    return (
      <View style={styles.container}>
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: this._openDrawer,
          }}
          centerComponent={{ text: 'Profile', style: { color: '#fff' } }}
          // rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <Image
          style={styles.imageProfile}
          source={require('../assets/images/user.png')}
        />
        <Text> {user.displayName ? user.displayName : 'test'} </Text>
        <Text> {user.email} </Text>
        <Text> </Text>
        <Button
          style={styles.editBtn}
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
        />
      </View>
    );
  }
}

// export default ProfileScreen;

const mapStateToProps = state => {
  console.log('State:', state);
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    alignItems: 'center',
  },
  imageProfile: {
    width: 100,
    height: 100,
    margin: 20,
  },
  editBtn: {
    padding: 10,
  },
});
