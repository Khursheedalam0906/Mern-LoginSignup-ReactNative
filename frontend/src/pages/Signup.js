import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import bgImage from '../../assets/bgimage.webp';
import {head1, head2} from '../common/formcss';
import {button1} from '../common/button';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPasswod] = useState('');
  const [cPassword, setCPasswod] = useState('');
  const [address, setAddress] = useState('');

  const Sendtobackend = async () => {
    if (
      name == '' ||
      email == '' ||
      dob == '' ||
      password == '' ||
      cPassword == '' ||
      address == ''
    ) {
      alert('All fields are required!');
      return;
    } else {
      if (password != cPassword) {
        alert('Password and Confirm Password must be same');
        return;
      } else {
        try {
          const response = await fetch('http://10.0.2.2:3000/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, dob, password, address}),
          });

          const result = await response.json();
          // console.log(result);
          // if (result.error) {
          //   alert(result.error);
          // } else {
          //   alert('Account created successfully');
          //   navigation.navigate('login');
          // }
          if (result.error === 'Invalid Credentials') {
            alert('Invalid Credentials');
          } else if (result.message === 'Veryfication code sent to your Email')
            // console.log(result.udata);
            alert(result.message);
          navigation.navigate('verification', {userdata: result.udata});
        } catch (error) {
          console.log('Error:', error);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.patternbg} source={bgImage} />
      <View style={styles.container1}>
        <View style={styles.s1}>
          {/* <Image style={styles.logo} source={logo} />
          <Text style={styles.h1}>Used2, Inc</Text>
          <Text style={styles.small}>Buying abd selling online</Text> */}
        </View>
        <ScrollView style={styles.s2}>
          <Text style={head1}>Sign up</Text>
          <Text style={head2}>Signup to continue</Text>
          <View style={styles.formgroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={name}
              style={styles.input}
              placeholder="Enter your name"
              onChangeText={Text => setName(Text)}
            />
          </View>
          <View style={styles.formgroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Enter your Email"
              onChangeText={Text => setEmail(Text)}
            />
          </View>
          <View style={styles.formgroup}>
            <Text style={styles.label}>DOB</Text>
            <TextInput
              value={dob}
              style={styles.input}
              placeholder="Enter your Date of Birth"
              onChangeText={Text => setDob(Text)}
            />
          </View>
          <View style={styles.formgroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              style={styles.input}
              secureTextEntry={true}
              placeholder="Enter your Password"
              onChangeText={Text => setPasswod(Text)}
            />
          </View>
          <View style={styles.formgroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              value={cPassword}
              style={styles.input}
              secureTextEntry={true}
              placeholder="Confirm your password"
              onChangeText={Text => setCPasswod(Text)}
            />
          </View>
          <View style={styles.formgroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              value={address}
              style={[styles.input, {height: 70}]}
              secureTextEntry={true}
              placeholder="Enter your address"
              multiline={true}
              onChangeText={Text => setAddress(Text)}
            />
          </View>
          <TouchableOpacity onPress={Sendtobackend}>
            <Text style={button1}>Signup</Text>
          </TouchableOpacity>

          <Text style={styles.account}>
            Already have an account?{' '}
            <Text
              style={styles.acclogin}
              onPress={() => navigation.navigate('login')}>
              Login
            </Text>
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default Signup;

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
    height: '7%',
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
    height: '93%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    padding: 20,
  },
  formgroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: 6,
  },
  label: {
    fontSize: 17,
    color: '#000',
    marginLeft: 10,
    marginBottom: 3,
  },
  input: {
    backgroundColor: '#FFB0CC',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
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
});
