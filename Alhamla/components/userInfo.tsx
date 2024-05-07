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
      <Image source={{ uri: 'https://lh3.googleusercontent.com/fife/ALs6j_HTvCJXq-LHsocncGC11q2kNOTd3DDKXMdIcqDv29X4mizYt_jdXRZLKNDPSaGh8bfQd1YZV1MZNhKtBsZqVJ5w78ngwdPxEbiJTGnyGTPxz307Jf3HHRcJd9uVOjfuW6ouC6K5jCHkRqXHOWKY6pUdvMG4yQnPHKL9rHCWrsuKkccbPWT9m_uuF2nQkX4qbWJtLRFRC3cc8lhszcDIDEEqEnSPjR2Uo6KY-8FX5T_nsKkaHefaAJnm4hnWy_sGU6v4JALVqLDwrQLE50VxO1_axit7yKSqwM0rVUgvQu9Rwv-uc5YARHZuXSxWCOXbbFqIly-qw4OQ5sDphY3W3V8GqyBN4UitXHqclrXt0e9jxTH6T3-602GGn20xMKLrbCnzl6VFYdA68DOwxMxOhahc0W4oKR2-PwbRROZc4yDo2EWgrqnolLPRTKbHhamWA_3xW-pBDu5MmAHVMAKMciW8yk0Oo12A1jp32ntM5q0WUMMilG2hbDE6YLSNqbO0V90ZgMQF2Y4V57o2eZPPySEQXTpiWrpPwDYIyLDl408CfBx5MRHoEFJ6HZXAu_W2CPYfEybxlDh7IFF1-uWh9eOzUhh4c9DHYVhk5jEY8wDqi0jINr48k8DXYIaw4dMJQYlGbDaiXG7UfX1z5jQ_ajcXJG2RWRh5KhxlpNs_O4FrjZLSNFLDNmXNWNVwUBURUQE1wCLu0bsjiBKFXeKlj9I8xV2R7nzPF9XNaz1J7X3D0c3tnB9SqFWVXlhCNt8m6Gk-zFmaZmjfgpk-9vWGwcRlFUJu530e2YO4aFoQkyh8PpH9AcspSLjHe7_gLwZmAIOQGRuI3IWMGmRKgzzha_HaIYpsVBNyjRZcXDMEDuFuk-liO2VB5ZEdCq_TpcKQ_HTvLe0ob55x7yTWFTUvTprAssdhyIVGdMXvDQE2KPgA5jE5zE3zI3G57pMnG0OALACPbFfE66Lbg65nvUTnLosnACqojfNafAzYwDMXab3oQvwEcM_uVHf2NANLReMS6R29CsY8-2IpFzYrLsbgoBbLmYoaq3pOT0EgVVcIXNiELr1TyYbnZHyOIKQKTG44EZXWEVGiKjy5E8gQ2iYour0ZcCXD1Nay0jwRKsWufDVo5PY-ykTmX-Lat67JqQOVHD5Ey9k6wDAcJyWsngTkPTsGzETDTGHL6KzMxxhxhVDJUASLx6fu6bDAW59Jg0nHS4jwJ7lUEJ2wD7f8y_AqCQPDWGORLnZ6AITC6q-1iW8a2zZ_8igI-q686GMS5XMB3h68hkLoufkHMa-h3OqZDwLyWYcyFIsZXE6Qd_7gSID8uCJ5py_5GHcCDn4Tu5kXZ3iG65V7Zcy_HCojGpfq7kE_Hd_ac7OCSgcvZgb4Iry3qHCT8ILCiby0mucLTpiatQ1Baooh7Tj6hz9i9ndkJ5M0KF82alVlehba_5srZ3hQP5hb131NdsykuOVSZKqVwcMS5qDQaQSi6P05Tnc6kjy4P-ZYghfv5NvewA1Tdot815OwL62MuCY9fxAambWtBEkPRsXEykhb2kwTkB8vj0rx9PNBLn6SM8PutU-JFHiFVh5M4avfWUpNhgFywjQuQRFA4hRpzEaHy4HjvIbxd6Hx1fuoMaW1RW1etBuQwNh1uv3U13OdbvvRjoaB7UbfxVm0tpOTRgMFPljQsEul7hM=w1632-h936' }} style={styles.image} />
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
