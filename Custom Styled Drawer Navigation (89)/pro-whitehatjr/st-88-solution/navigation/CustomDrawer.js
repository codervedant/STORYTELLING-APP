import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

export default class CustomDrawer extends Component {
  constructor() {
    super();
    this.state = {
      lightTheme: true,
    };
  }

  componentDidMount() {
    firebase.database
      .ref('users/' + firebase.auth().currentUser.uid)
      .on('value', (dataSnapshot) => {
        this.setState({
          lighTheme:
            dataSnapshot.val().current_theme === 'light' ? true : false,
        });
      });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.state.lightTheme ? 'white' : '#15193c',
        }}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.sideMenuProfileIcon}
        />
        <DrawerContentScrollView {...this.props}>
          <DrawerItemList {...this.props} />
        </DrawerContentScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
    alignSelf: 'center',
    marginTop: RFValue(60),
    resizeMode: 'contain',
  },
});
