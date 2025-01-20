import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setCredentials } from '@/store/auth/authSlice';
import { useLoginMutation } from '@/store/auth/authApiSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [Login, { isLoading, isError, error }] = useLoginMutation();

  const err = error as any;

  const dispatch = useDispatch();

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
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
        dispatch(setCredentials(data));
        router.back();
        console.log(data);
      }).catch((err) => {
        console.log(err);
      });
      console.log('Logging in...');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#f04e4e" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode='contain' />
      <View style={styles.loginContainer}>
        <Text style={styles.welcomeText}>Welcome back</Text>
        <Text style={styles.subText}>سجل الان في حسابك فى منصة ادعم</Text>

        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#800000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#800000"
            value={email}
            onChangeText={text => setEmail(text)}
            onBlur={validateEmail}
          />
        </View>
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#800000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="************"
            placeholderTextColor="#800000"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
            onBlur={validatePassword}
          />
        </View>
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

        <TouchableOpacity onPress={handleSubmit}>
          <LinearGradient
            colors={['#800000', '#FF0000']} // Gradient from right to left
            start={{ x: 1, y: 0 }} // Start from the right
            end={{ x: 0, y: 0 }} // End at the left
            style={styles.loginButton}
          >
            <Icon name="arrow-right" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Pressable>
          <Link href="/" style={styles.forgotPasswordText} asChild>
            <Text>Forgot Password?</Text>
          </Link>
        </Pressable>

        <Text style={styles.orText}>OR</Text>

        <TouchableOpacity>
          <LinearGradient
            colors={['#800000', '#FF0000']} // Gradient from right to left
            start={{ x: 1, y: 0 }} // Start from the right
            end={{ x: 0, y: 0 }} // End at the left
            style={styles.createAccountButton}
          >
            <Link href="/signUp" style={styles.createAccountText} asChild>
              <Text>CREATE AN ACCOUNT</Text>
            </Link>
          </LinearGradient>
        </TouchableOpacity>

        {isError ? (
          <View style={styles.boxError}>
            <Text style={styles.error}>{(err?.data.message)}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 50,
    marginBottom: 20,
  },
  loginContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#800000',
    marginBottom: 10,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#800000',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  loginButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 10,
    width: '100%',
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10, // Adjust margin to align text properly
  },
  buttonIcon: {
    marginRight: 10, // Adjust margin to align icon properly
  },
  forgotPasswordText: {
    color: '#800000',
    marginBottom: 20,
  },
  createAccountButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  createAccountText: {
    color: '#fff',
    fontSize: 16,
  },
  orText: {
    color: '#800000',
    marginBottom: 20,
  },
  boxError: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    padding: 10,
  },
});

export default Login;
