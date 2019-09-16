import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Header } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import ActionButton from 'react-native-action-button';
import dayjs from 'dayjs';

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      currentDateTitle: dayjs().format('YYYY MMM DD'),
    };
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

  render() {
    const { currentDateTitle } = this.state;
    const currentDate = dayjs().format('YYYY-MM-DD');

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
          onDayPress={() => {}}
          current={currentDate}
          markingType={'multi-dot'}
          markedDates={{
            '2012-05-08': {
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
        <ActionButton
          buttonColor="#008b00"
          onPress={this._toAddLeaveScreen}
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
