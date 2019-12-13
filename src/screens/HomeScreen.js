import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  Text,
  TextInput,
} from 'react-native';
import { Header, ListItem } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import { SCHEDULES_COLLECTION, USERS_COLLECTION } from '../constant';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import dayjs from 'dayjs';
import AddLeaveDayModal from '../components/AddLeaveDayModal';
import _ from 'lodash';

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
      dateMarked: null,
      schedules: [],
    };

    this.fireStoreScheduleRef = firebase
      .firestore()
      .collection(SCHEDULES_COLLECTION);
    this.fireStoreUserRef = firebase.firestore().collection(USERS_COLLECTION);
    this.onDayPress = this.onDayPress.bind(this);
  }

  componentWillMount() {
    this.getSchedule();
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
    console.log(calendarObject);
    this.setState({ currentDate: calendarObject.dateString });
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

  getSchedule = async () => {
    const { uid } = this.props;
    var dateRaws = {};
    var schedulesRaws = [];
    try {
      var query = await this.fireStoreScheduleRef.where('uid', '==', uid);
      query.get().then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, ' => ', doc.data());
          var dateObj = {};
          var scheduleObj = {};
          dateObj[`${doc.data().date}`] = {
            selected: true,
            scheduleID: doc.id,
          };
          Object.assign(dateRaws, dateObj);
          schedulesRaws.push(doc.data());
        });
        this.setState({ dateMarked: dateRaws });
        this.setState({ schedules: schedulesRaws });
        console.log('dateRaws', dateRaws);
        console.log('schedulesRaws', schedulesRaws);
      });
    } catch (error) {
      console.log('get Schedule', error);
    }
  };

  _storeScheduleData = async scheduleData => {
    try {
      console.log('scheduleData', scheduleData);
      const response = await this.fireStoreScheduleRef.add(scheduleData);
      // console.log('response', response);
      const scheduleID = response.id;
      await this._storeScheduleID(scheduleID);
      this.getSchedule();
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
      console.log('error adding storeScheduleID: ', error.message);
    }
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  listEmptyComponent() {
    return (
      <View style={[styles.listEmpty, styles.container]}>
        <Text></Text>
      </View>
    );
  }

  render() {
    const {
      currentDateTitle,
      currentDate,
      error,
      dateMarked,
      schedules,
    } = this.state;

    return (
      <View style={styles.container}>
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: this._openDrawer,
          }}
          centerComponent={{
            text: currentDateTitle,
            style: { color: '#fff' },
          }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <Calendar
          style={styles.calendar}
          onDayPress={this._onDayPress}
          current={currentDate}
          markingType={'multi-dot'}
          markedDates={dateMarked}
          hideArrows={false}
        />
        <FlatList
          data={schedules}
          ListEmptyComponent={this.listEmptyComponent}
          renderItem={({ item, index }) => (
            <ListItem
              containerStyle={{
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,
              }}
              title={item.title}
              subtitle={item.date}
            />
          )}
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
    // backgroundColor: 'white',
    // position: 'relative',
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
  listEmpty: {
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 50,
  },
});

const mapStateToProps = state => {
  console.log('State:', state);
  return {
    uid: state.user.uid,
  };
};

export default connect(mapStateToProps)(HomeScreen);
