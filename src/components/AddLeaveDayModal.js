import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';

class AddLeaveDayModal extends React.Component {
  state = {
    // date: new Date('2020-06-12T14:42:42'),
    date: '2019-09-16',
    showDatePicker: false,
  };

  showDatePicker = () => {
    this.setState({ showDatePicker: true });
  };

  onDateSelected = () => {
    this.setState({ showDatePicker: false });
  };

  render() {
    const { isModalVisible, onLeaveDaySubmit } = this.props;
    const { showDatePicker, date } = this.state;

    return (
      <View style={styles.container}>
        <Modal isVisible={isModalVisible}>
          <View style={styles.content}>
            <View style={styles.titleInput}>
              <Input placeholder="Title" />
            </View>
            {/*<TouchableNativeFeedback onPress={() => console.log('press')}>*/}
            {/*  <Input*/}
            {/*    placeholder="Start"*/}
            {/*    disabled*/}
            {/*    rightIcon={*/}
            {/*      <Icon*/}
            {/*        name="calendar"*/}
            {/*        type="font-awesome"*/}
            {/*        size={24}*/}
            {/*        color="black"*/}
            {/*      />*/}
            {/*    }*/}
            {/*  />*/}
            {/*</TouchableNativeFeedback>*/}
            <DatePicker
              style={{ width: 300 }}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2016-05-01"
              maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  top: 4,
                  marginLeft: 0,
                },
                // dateInput: {
                //   marginLeft: 36
                // }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                this.setState({ date: date });
              }}
            />
            <DatePicker
              style={{ width: 300, marginTop: 15 }}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2016-05-01"
              maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  top: 4,
                  marginLeft: 0,
                },
                // dateInput: {
                //   marginLeft: 36
                // }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                this.setState({ date: date });
              }}
            />
            {/*<Input*/}
            {/*  placeholder="End"*/}
            {/*  disabled*/}
            {/*  rightIcon={*/}
            {/*    <Icon*/}
            {/*      name="calendar"*/}
            {/*      type="font-awesome"*/}
            {/*      size={24}*/}
            {/*      color="black"*/}
            {/*    />*/}
            {/*  }*/}
            {/*/>*/}
            <View style={styles.buttonAction}>
              <Button title="Cancel" type="clear" />
              <Button onPress={onLeaveDaySubmit} title="Save" />
            </View>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={this.onDateSelected}
            />
          )}
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
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  titleInput: {
    height: 50,
    marginBottom: 15,
  },
  description: {},
  buttonAction: {
    marginTop: 30,
  },
  datePickerContainer: {
    // marginTop: 15,
  },
});

export default AddLeaveDayModal;
