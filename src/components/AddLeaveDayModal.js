import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

class AddLeaveDayModal extends React.Component {
  render() {
    const { isModalVisible, onLeaveDaySubmit } = this.props;

    return (
      <View style={styles.container}>
        <Modal isVisible={isModalVisible}>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>Hi 👋!</Text>
            <Button onPress={onLeaveDaySubmit} title="Close" />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});

export default AddLeaveDayModal;
