import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { selectMyUser } from '@/store/auth/authSlice';
import { useGetAllProductsQuery } from '@/store/Product/product';
import { Product } from '@/assets/types/product.type';
import { useRouter } from 'expo-router';

const categories = [
  { id: '1', name: 'Category' , component:()=>(<MaterialIcons name="category" size={30} color="white" />) },
  { id: '2', name: 'Company' , component:()=>(<MaterialIcons name="business" size={30} color="white" />)},
  { id: '3', name: 'Blogs' , component:()=>(<MaterialIcons name="article" size={30} color="white" />)},
];

const Home = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const user = useSelector(selectMyUser);
  const { data: products } = useGetAllProductsQuery({ page: 1, limit: 10 , blocked: false});

  const renderCategory = ({ item }: { item: { id: string; name: string; component: () => JSX.Element } }) => (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryImagePlaceholder}>
        {item.component()}
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </View>
  );

  const renderRecommendedItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.recommendedItemContainer} onPress={() => {
      router.push(`/${item.id_pro}`);
    }}>
      <Image source={{ uri: item.product_photo }} style={styles.recommendedImage} />
      <View style={styles.recommendedItemTextContainer}>
        <Text style={styles.recommendedItemName}>{item.product_name_en}</Text>
        <Text style={styles.recommendedItemPrice}>{item.product_name_ar}</Text>
        <Text style={styles.recommendedItemDescription} numberOfLines={2}>{item.product_description}</Text>
        <View style={styles.recommendedItemRating}>
          {item.rateproduct === '0'
            ? [...Array(5)].map((_, index) => (
              <Icon key={index} name="star" size={15} color="#ccc" />  // Gray stars for zero rating
            ))
            : [...Array(parseInt(item.rateproduct))].map((_, index) => (
              <Icon key={index} name="star" size={15} color="#FFA000" />  // Gold stars for positive rating
            ))
          }
        </View>
      </View>
      <Image source={{ uri: item.company_photo}} style={styles.extraImage} resizeMode='contain'/>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Hi, {user?.fname || 'Guest'}</Text>
          <Text style={styles.questionText}>What do you want to see today?</Text>
        </View>
        <View style={styles.profileCircle}>
          {user?.image
            ? <Image source={{ uri: user?.image }} style={styles.profileImage} />
            : <Image source={require('../../assets/images/strong.jpg')} style={styles.profileImage} />
          }
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Text style={styles.searchText}>Search</Text>
        <Icon name="search" size={20} color="#aaa" style={styles.searchIcon} />
      </View>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={styles.categoriesList}
      />
      <View style={styles.recommendedContainer}>
        <View style={styles.recommendedHeader}>
          <Text style={styles.recommendedTitle}>Recommended for you</Text>
          <TouchableOpacity>
            <Text style={styles.moreText}>More</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          renderItem={renderRecommendedItem}
          keyExtractor={item => item?.id_pro}
          horizontal
          contentContainerStyle={styles.recommendedList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#181818',
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  questionText: {
    fontSize: 18,
    color: '#aaa',
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  recommendedImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  extraImage: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 5,
    right: 5,
    // borderRadius: 10,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  searchContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#aaa',
  },
  searchIcon: {
    marginLeft: 10,
  },
  categoriesList: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  categoryContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  categoryImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#800000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    color: '#fff',
    marginTop: 5,
  },
  recommendedContainer: {
    backgroundColor: '#fff',
    height: "50%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  recommendedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  moreText: {
    fontSize: 16,
    color: '#800000',
  },
  recommendedList: {
    paddingHorizontal: 20,
  },
  recommendedItemContainer: {
    width: 150,
    marginRight: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    marginBottom: 20,
  },
  recommendedImagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
  recommendedItemTextContainer: {
    marginTop: 10,
  },
  recommendedItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recommendedItemPrice: {
    fontSize: 14,
    color: '#888',
  },
  recommendedItemDescription: {
    fontSize: 12,
    color: '#aaa',
  },
  recommendedItemRating: {
    flexDirection: 'row',
    marginTop: 5,
  },
});

export default Home;
