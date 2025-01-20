import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateFirstName = () => {
    if (!firstName) {
      setFirstNameError('First name is required');
      return false;
    }
    setFirstNameError('');
    return true;
  };

  const validateLastName = () => {
    if (!lastName) {
      setLastNameError('Last name is required');
      return false;
    }
    setLastNameError('');
    return true;
  };

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
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleSubmit = () => {
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      // Perform signup logic
      console.log('Signing up...');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode='contain' />
      <View style={styles.signupContainer}>
        <Text style={styles.welcomeText}>Create your account</Text>
        <Text style={styles.subText}>هيا الان قم بتسجيل حسابك وابدأ الدعم للمنتاجات المحلية</Text>

        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#800000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#800000"
            value={firstName}
            onChangeText={text => setFirstName(text)}
            onBlur={validateFirstName}
          />
        </View>
        {firstNameError ? <Text style={styles.error}>{firstNameError}</Text> : null}

        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#800000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#800000"
            value={lastName}
            onChangeText={text => setLastName(text)}
            onBlur={validateLastName}
          />
        </View>
        {lastNameError ? <Text style={styles.error}>{lastNameError}</Text> : null}

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#800000" style={styles.icon} />
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
            placeholder="Password"
            placeholderTextColor="#800000"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
            onBlur={validatePassword}
          />
        </View>
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#800000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#800000"
            secureTextEntry
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            onBlur={validateConfirmPassword}
          />
        </View>
        {confirmPasswordError ? <Text style={styles.error}>{confirmPasswordError}</Text> : null}

        <TouchableOpacity onPress={handleSubmit} >
          <LinearGradient
            colors={['#800000', '#FF0000']} // Gradient from right to left
            start={{ x: 1, y: 0 }} // Start from the right
            end={{ x: 0, y: 0 }} // End at the left
            style={styles.signupButton}
          >
            <Icon name="arrow-right" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.signupButtonText}>REGISTER</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.alreadyAccountText}>Already have an account?</Text>
        <TouchableOpacity>
          <LinearGradient
            colors={['#FF0000', '#800000']} // Gradient from right to left
            start={{ x: 1, y: 0 }} // Start from the right
            end={{ x: 0, y: 0 }} // End at the left
            style={styles.signinButton}
          >
            <Link href="/login" style={styles.signinButtonText} asChild>
              <Text>SIGN IN</Text>
            </Link>
          </LinearGradient>
        </TouchableOpacity>

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
  logo: {
    width: 100,
    height: 100,
    marginTop: 50,
    marginBottom: 20,
  },
  signupContainer: {
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
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
  signupButton: {
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
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10, // Adjust margin to align text properly
  },
  buttonIcon: {
    marginRight: 10, // Adjust margin to align icon properly
  },
  alreadyAccountText: {
    color: '#999',
    marginBottom: 10,
  },
  signinButton: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  signinButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Signup;
