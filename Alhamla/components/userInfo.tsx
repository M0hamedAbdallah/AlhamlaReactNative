import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

const UserInfo = ({ user } : any) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.edit}>
        <Text>
          Edit
        </Text>
      </Pressable>
      <Image source={{ uri: user?.image || 'https://i.pravatar.cc/300' }} style={styles.image} />
      <View>
        <Text style={styles.name}>{`${user.fname} ${user.lname}`}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.role}>{user.role}</Text>
      </View>
      <View style={styles.point}>
        <Text>
          Points {user.points}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width:"80%",
    backgroundColor: '#f0f0f0',
    padding: 50,
    elevation: 5,
    borderRadius: 10,
    marginBottom: 10,

  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: 'gray',
  },
  point: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    color: 'white',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
    borderColor: '#f04e4e',
    borderWidth: 2
  },
  edit:{
    position: 'absolute',
    right: 0,
    top: 0,
    color: 'gray',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    marginTop: 10,
  }
});

export default UserInfo;
