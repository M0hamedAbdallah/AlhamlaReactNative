import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { selectMyToken, selectMyUser } from '@/store/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import UserInfo from '@/components/userInfo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Account() {

  const user = useSelector(selectMyUser);
  const token = useSelector(selectMyToken);
  
  if(!token){
    return (
      <View style={styles.container}>
        <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={{ width: 64, height: 64 }} />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TouchableOpacity 
          onPress={() => router.push('/login')} 
          style={styles.button}>
          <Text style={styles.title}>
            Login
          </Text>
        </TouchableOpacity>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TouchableOpacity 
          onPress={() => router.push('/signUp')} 
          style={styles.button}>
          <Text style={styles.title}>
            SingUp
          </Text>
        </TouchableOpacity>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TouchableOpacity 
          onPress={() => router.push('/login')} 
          style={styles.button}>
          <Text style={styles.title}>
            Setting
          </Text>
        </TouchableOpacity>
      </View>
    );
  }else{
    console.log(user)
    return (
      <SafeAreaView style={styles.containerTwo}>
        <UserInfo user={user} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTwo: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: 'gray',
  }
});
