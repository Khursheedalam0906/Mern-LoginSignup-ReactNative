import {
  Image,
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

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPasswod] = useState('');

  const handleLogin = async () => {
    if (email == '' || password == '') {
      alert('All fields are required!');
      return;
    } else {
      try {
        const response = await fetch('http://10.0.2.2:3000/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
        });

        const result = await response.json();
        if (result.error) {
          alert(result.error);
        } else {
          alert('SignIn Successfully');
          navigation.navigate('homepage');
        }
      } catch (error) {
        console.log('Error:', error);
      }
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
          <Text style={head1}>Login</Text>
          <Text style={head2}>Sign in to Continue</Text>
          <View style={styles.formgroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              style={styles.input}
              onChangeText={Text => setEmail(Text)}
            />
          </View>
          <View style={styles.formgroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              style={styles.input}
              onChangeText={Text => setPasswod(Text)}
            />
          </View>
          <Text style={styles.link}>Forgot Password</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={button1}>LogIn</Text>
          </TouchableOpacity>
          <Text style={styles.account}>
            Create a new account?{' '}
            <Text
              style={styles.acclogin}
              onPress={() => navigation.navigate('signup')}>
              Signup
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

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
