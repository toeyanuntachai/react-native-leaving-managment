import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _openDrawer = () => {
    const { navigation } = this.props;
    navigation.openDrawer();
  };

  render() {
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
        <Text> ProfileScreen </Text>
      </View>
    );
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
});
