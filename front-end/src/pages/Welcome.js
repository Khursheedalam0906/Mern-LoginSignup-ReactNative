import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import bgImage from '../../assets/bgimage.webp';
import {button1} from '../common/button';

const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={bgImage} style={styles.patternbg} />
      <View style={styles.container1}>
        <Image style={styles.head} source={require('../../assets/logo.png')} />
        <Text style={button1} onPress={() => navigation.navigate('login')}>
          Login
        </Text>
        <Text style={button1} onPress={() => navigation.navigate('signup')}>
          Signup
        </Text>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  patternbg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  head: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  container1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
