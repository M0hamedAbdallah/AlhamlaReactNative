import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectMyUser } from '@/store/auth/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const Profile = () => {
    const user = useSelector(selectMyUser);
    const dispatch = useDispatch();
    const router = useRouter();

    const favoriteItems = [
        { id: '1', name: 'شيبيسى', image: 'https://via.placeholder.com/150' },
        { id: '2', name: 'شيبيسى', image: 'https://via.placeholder.com/150' },
    ];

    const renderFavoriteItem = ({ item }: { item: { id: string; name: string; image: string } }) => (
        <View style={styles.favoriteItemContainer}>
            <Image source={{ uri: item.image }} style={styles.favoriteItemImage} />
            <Text style={styles.favoriteItemName}>{item.name}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Icon name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity onPress={() => {
                    dispatch(logOut());
                    router.push('/');
                }}>
                    <Icon name="sign-out" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.profileContainer}>
                <View style={styles.profileImageOuterCircle}>
                    <View style={styles.profileImageMiddleCircle}>

                        <Image source={{ uri: user?.image || 'https://via.placeholder.com/150' }} style={styles.profileImage} />
                        <TouchableOpacity style={styles.editIcon}>
                            <Icon name="pencil" size={16} color="#fff" />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{user?.Fname || 'Mohamed Abdallah'}</Text>
                    <Text style={styles.profileEmail}>{user?.email || 'mohamedabdallah2@gmail.com'}</Text>
                </View>
            </View>
            <LinearGradient
                colors={['#FF0000', '#800000']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={styles.statsContainer}
            >
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>564</Text>
                    <Text style={styles.statLabel}>Transactions</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>345</Text>
                    <Text style={styles.statLabel}>Reviews</Text>
                </View>
            </LinearGradient>
            <Text style={styles.favoritesTitle}>Your Favourite</Text>
            <FlatList
                data={favoriteItems}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id}
                horizontal
                contentContainerStyle={styles.favoritesList}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#181818',
    },
    headerTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    profileContainer: {
        alignItems: 'center',
        padding: 20,
    },
    profileImageOuterCircle: {
        width: 125,
        height: 125,
        borderRadius: 70,
        borderWidth: 2,
        borderColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageMiddleCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 2,
        borderColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInfo: {
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    editIcon: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#FF0000',
        borderRadius: 25,
        padding: 10,
    },
    profileName: {
        fontSize: 24,
        color: '#fff',
        marginTop: 10,
    },
    profileEmail: {
        fontSize: 16,
        color: '#aaa',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        margin: 20,
    },
    statBox: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 16,
        color: '#fff',
    },
    favoritesTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 20,
    },
    favoritesList: {
        paddingHorizontal: 20,
    },
    favoriteItemContainer: {
        width: 150,
        marginRight: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    favoriteItemImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    favoriteItemName: {
        fontSize: 16,
        color: '#333',
    },
});

export default Profile;
