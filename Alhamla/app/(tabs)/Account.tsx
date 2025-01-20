import { Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { selectMyToken, selectMyUser, logOut } from '@/store/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import UserInfo from '@/components/userInfo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function Account() {
  const user = useSelector(selectMyUser);
  const token = useSelector(selectMyToken);
  const dispatch = useDispatch();

  if (!token) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/logo.png')} resizeMode="contain" style={styles.logo} />
        </View>
        <View style={styles.specialContainer} >
          <View style={styles.separator} />
          <LinearGradient
            colors={['#800000', '#FF0000']} // Gradient from right to left
            start={{ x: 1, y: 0 }} // Start from the right
            end={{ x: 0, y: 0 }} // End at the left
            style={styles.button}
          >
            <TouchableOpacity onPress={() => router.push('/login')} style={styles.TouchableOpacityStyle}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </LinearGradient>
          <View style={styles.separator} />
          <LinearGradient
            colors={['#800000', '#FF0000']} // Gradient from right to left
            start={{ x: 1, y: 0 }} // Start from the right
            end={{ x: 0, y: 0 }} // End at the left
            style={styles.button}
          >
            <TouchableOpacity onPress={() => router.push('/signUp')} style={styles.TouchableOpacityStyle}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/logo.png')} resizeMode="contain" style={styles.logo} />
        </View>
        <View style={styles.specialContainer} >
          <View style={styles.separator} />
          <LinearGradient
            colors={['#800000', '#FF0000']} // Gradient from right to left
            start={{ x: 1, y: 0 }} // Start from the right
            end={{ x: 0, y: 0 }} // End at the left
            style={styles.button}
          >
            <TouchableOpacity onPress={() => router.push('/profile')}  style={styles.TouchableOpacityStyle}>
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
          </LinearGradient>
          <View style={styles.separator} />
          <LinearGradient
            colors={['#800000', '#FF0000']} // Gradient from right to left
            start={{ x: 1, y: 0 }} // Start from the right
            end={{ x: 0, y: 0 }} // End at the left
            style={styles.button}
          >
            <TouchableOpacity onPress={() => router.push('/settings')} style={styles.TouchableOpacityStyle}>
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLoggedIn: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
    backgroundColor: 'transparent',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: "50%",
    width: "100%",
    backgroundColor: 'transparent',
  },
  button: {
    width: '80%',
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: '#800000',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  specialContainer: {
    backgroundColor: '#fff',
    width: "100%",
    alignItems: "center",
    height: "50%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  TouchableOpacityStyle:{
    width:'100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
