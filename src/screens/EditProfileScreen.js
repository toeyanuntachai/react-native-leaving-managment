import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageProfile: null,
      displayName: '',
    };
  }

  _ondisplayNameChanged = displayName => this.setState({ displayName });

  render() {
    const { displayName } = this.state;
    return (
      <View style={styles.container}>
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
          onChangeText={this._ondisplayNameChanged}
          value={displayName}
          inputStyle={{ marginLeft: 10, color: 'black' }}
          keyboardAppearance="light"
          placeholder="DisplayName"
          autoFocus={false}
          autoCapitalize="none"
          autoCorrect={false}
          //   keyboardType=""
          returnKeyType="next"
          //   ref={this._setEmailRef}
          //   onSubmitEditing={this._onEmailSubmit}
          blurOnSubmit={false}
          placeholderTextColor="white"
          errorStyle={{ textAlign: 'center', fontSize: 12 }}
          //   errorMessage={
          //     email_valid ? null : 'Please enter a valid email address'
          //   }
        />
      </View>
    );
  }
}

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

export default EditProfileScreen;
