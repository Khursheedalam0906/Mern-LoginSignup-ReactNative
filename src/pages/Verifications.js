import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import bgImage from '../../assets/bgimage.webp';
import {head1, head2} from '../common/formcss';
import {button1} from '../common/button';

const Verifications = ({navigation, route}) => {
  const {userdata} = route.params;
  // console.log('From verification Page', userdata[0]?.verificationCode);

  const [userCode, setUserCode] = useState('xxxx');
  const [actualCode, setActualCode] = useState(null);

  useEffect(() => {
    setActualCode(userdata[0]?.verificationCode);
  }, []);

  const VerifyCode = async () => {
    // console.log(userCode);
    // console.log(actualCode);
    if (userCode == 'xxxx' || userCode == '') {
      alert('Please enter the code');
      return;
      //
    } else if (userCode == actualCode) {
      // console.log('correct code');
      const formData = {
        name: userdata[0]?.name,
        email: userdata[0]?.email,
        password: userdata[0]?.password,
        dob: userdata[0]?.dob,
        address: userdata[0]?.address,
      };
      const response = await fetch('http://10.0.2.2:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      if (result.message === 'User Registered Successfully') {
        alert(result.message);
        navigation.navigate('login');
      } else {
        alert('Something went wrong || Try signup again');
      }
      //
    } else if (userCode != actualCode) {
      alert('Incorrect Code');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.patternbg} source={bgImage} />
      <View style={styles.container1}>
        <View style={styles.s1}>
          <Text style={styles.h1}>
            USED<Text style={{fontSize: 50, color: 'red'}}>2</Text>, Inc
          </Text>
          <Text style={styles.small}>Buying abd selling online</Text>
        </View>
        <View style={styles.s2}>
          <Text style={head1}>Verification</Text>
          <Text style={head2}>A code has been sent to your email</Text>

          <View style={styles.formgroup}>
            <Text style={styles.label}>Code</Text>
            <TextInput
              placeholder="Enter 6 digit verification code"
              style={styles.input}
              onChangeText={Text => setUserCode(Text)}
            />
          </View>
          <TouchableOpacity onPress={VerifyCode}>
            <Text style={button1}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Verifications;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  patternbg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  container1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  s1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
  },
  small: {
    color: 'white',
    fontSize: 17,
  },
  h1: {
    fontSize: 30,
    color: '#fff',
  },
  s2: {
    display: 'flex',
    backgroundColor: '#fff',
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    padding: 20,
  },
  formgroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: 10,
  },
  label: {
    fontSize: 17,
    color: '#000',
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFB0CC',
    borderRadius: 20,
    padding: 10,
  },
  link: {
    color: '#F50057',
    fontSize: 15,
    textAlign: 'right',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  account: {
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 16,
  },
  acclogin: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  head: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
});
