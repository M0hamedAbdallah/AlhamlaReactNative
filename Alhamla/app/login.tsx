import { useState } from 'react'
import { ActivityIndicator, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Link, router, useNavigation } from 'expo-router'
import { useDispatch } from 'react-redux'
import React from 'react'
import { setCredentials } from '@/store/auth/authSlice'
import { useLoginMutation } from '@/store/auth/authApiSlice'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [Login, { isLoading, isError, error }] = useLoginMutation();

  const err = error as any;

  const dispatch = useDispatch()

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!/\S+@\gmail+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      // Perform login logic
      Login({ email, password }).unwrap().then((data) => {
        dispatch(setCredentials(data))
        router.back();
        console.log(data)
      }).catch((err) => {
        console.log(err)
      })
      console.log('Logging in...');
    }
  };


  if (isLoading) {
    return (<View style={styles.loading}>
      <ActivityIndicator size="large" color="#f04e4e" />
    </View>)
  }


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          onBlur={validateEmail}
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          onBlur={validatePassword}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
        <Button title="Login" onPress={handleSubmit} />
        {isError ? (
          <View style={styles.boxError}>
            <Text style={styles.error}>{(err?.data.message)}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.linkContainer}>
        <Pressable>
          <Link href="/signUp" style={styles.link} asChild>
            <Text>New User?</Text>
          </Link>
        </Pressable>
        <Pressable>
          <Link href="/" style={styles.link} asChild>
            <Text>Forgot Password?</Text>
          </Link>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    height: "80%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    marginTop: 10,
  },
  linkContainer: {
    height: "20%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  link: {
    marginTop: 10,
    color: 'gray',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  boxError: {
    marginTop: 10,
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
  }
});

export default Login;
