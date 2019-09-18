import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, View, Button } from 'react-native';
import { Header } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import { SCHEDULES_COLLECTION, USERS_COLLECTION } from '../constant';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
import dayjs from 'dayjs';
import AddLeaveDayModal from '../components/AddLeaveDayModal';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      currentDateTitle: dayjs().format('YYYY MMM DD'),
      currentDate: dayjs().format('YYYY-MM-DD'),
      isModalVisible: false,
      error: '',
    };
    this.fireStoreScheduleRef = firebase
      .firestore()
      .collection(SCHEDULES_COLLECTION);
    this.fireStoreUserRef = firebase.firestore().collection(USERS_COLLECTION);
    this.onDayPress = this.onDayPress.bind(this);
  }

  _openDrawer = () => {
    const { navigation } = this.props;
    navigation.openDrawer();
  };

  _toAddLeaveScreen = () => {
    const { navigation } = this.props;
    navigation.navigate('AddLeave');
  };

  _onDayPress = calendarObject => {
    this.setState({ currentDate: calendarObject.dateString });
    console.log(calendarObject);
  };

  _onLeaveDaySubmit = async scheduleData => {
    // Do something
    const isEmpty = scheduleData.title === '';

    if (isEmpty) {
      this.setState({
        error: 'Please fill your title completely.',
        showLoading: false,
      });
    } else {
      try {
        try {
          await this._storeScheduleData(scheduleData);
          this.setState({ isModalVisible: false });
        } catch (error) {
          console.log('error ', error);
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  _storeScheduleData = async scheduleData => {
    try {
      console.log('scheduleData', scheduleData);
      const response = await this.fireStoreScheduleRef.add(scheduleData);
      // console.log('response', response);
      const scheduleID = response.id;
      await this._storeScheduleID(scheduleID);
    } catch (error) {
      console.log('error adding scheduleData: ', error);
    }
  };

  _storeScheduleID = async scheduleID => {
    try {
      const { uid } = this.props;
      console.log('uid', uid);
      await this.fireStoreUserRef.doc(uid).update({
        scheduleID: firebase.firestore.FieldValue.arrayUnion(scheduleID),
      });
    } catch (error) {
      console.log('error adding scheduleID: ', error);
    }
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    const { currentDateTitle, currentDate, error } = this.state;

    return (
      <View style={styles.container}>
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: this._openDrawer,
          }}
          centerComponent={{ text: currentDateTitle, style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <Calendar
          style={styles.calendar}
          onDayPress={this._onDayPress}
          current={currentDate}
          markingType={'multi-dot'}
          markedDates={{
            '2019-09-17': {
              dots: [
                { key: 'vacation', color: 'blue', selectedDotColor: 'white' },
                { key: 'massage', color: 'red', selectedDotColor: 'white' },
              ],
              selected: true,
            },
            '2012-05-09': {
              dots: [
                { key: 'vacation', color: 'blue', selectedDotColor: 'red' },
                { key: 'massage', color: 'red', selectedDotColor: 'blue' },
              ],
              disabled: true,
            },
          }}
          hideArrows={false}
        />
        <ScrollView style={styles.container} />
        <AddLeaveDayModal
          isModalVisible={this.state.isModalVisible}
          onLeaveDaySubmit={this._onLeaveDaySubmit}
          onCancel={this._toggleModal}
          error={error}
        />
        <ActionButton
          buttonColor="#008b00"
          onPress={this._toggleModal}
          style={{ flex: 1 }}
        />
      </View>
    );
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString,
    });
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350,
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  floatingButton: {
    // position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    right: 30,
    bottom: 30,
    flex: 1,
  },
});

const mapStateToProps = state => {
  console.log('State:', state);
  return {
    uid: state.user.uid,
  };
};

export default connect(mapStateToProps)(HomeScreen);
