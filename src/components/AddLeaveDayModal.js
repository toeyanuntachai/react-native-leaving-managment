import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { Input, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import dayjs from 'dayjs';

class AddLeaveDayModal extends React.Component {
  state = {
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    showDatePicker: false,
  };

  showDatePicker = () => {
    this.setState({ showDatePicker: true });
  };

  onDateSelected = () => {
    this.setState({ showDatePicker: false });
  };

  onSubmit = () => {
    const { onLeaveDaySubmit } = this.props;
    const { startDate, endDate } = this.props;
    onLeaveDaySubmit(startDate, endDate);
  };

  onStartDateChange = date => this.setState({ startDate: date });

  onEndDateChange = date => this.setState({ startDate: date });

  render() {
    const { isModalVisible, onLeaveDaySubmit, onCancel } = this.props;
    const { startDate, endDate } = this.state;

    return (
      <View style={styles.container}>
        <Modal isVisible={isModalVisible}>
          <View style={styles.content}>
            <View style={styles.titleInput}>
              <Input placeholder="Title" />
            </View>
            <DatePicker
              style={{ width: 300 }}
              // date={startDate}
              mode="date"
              placeholder="Start date"
              format="YYYY-MM-DD"
              // minDate="2016-05-01"
              // maxDate="2016-06-01"
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
              onDateChange={this.onStartDateChange}
            />
            <DatePicker
              style={{ width: 300, marginTop: 15 }}
              // date={endDate}
              mode="date"
              placeholder="End date"
              format="YYYY-MM-DD"
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
              onDateChange={this.onEndDateChange}
            />
            <View style={styles.buttonAction}>
              <Button title="Cancel" type="clear" onPress={onCancel} />
              <Button onPress={this.onSubmit} title="Save" />
            </View>
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
