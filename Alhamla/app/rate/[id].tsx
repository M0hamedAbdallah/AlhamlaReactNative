import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { useGetAllRatesByProductQuery } from '@/store/Rate/rate';

const ProductRating = () => {
  const router = useRouter();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const [page, setPage] = useState<number>(1);
  const [rates, setRates] = useState<any[]>([]);
  const { data: allRates, isLoading, isError, error } = useGetAllRatesByProductQuery({ id, page, limit: 10 }) as any;

  useEffect(() => {
    if (allRates) {
      setRates(prevRates => [...prevRates, ...allRates]);
    }
  }, [allRates]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  };

  const handleLoadMore = () => {
    if (!isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="large" color="#FF0000" />
      </View>
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.ratingHistoryItemContainer}>
      <Image source={{ uri: item.image || 'https://via.placeholder.com/50' }} style={styles.ratingHistoryImage} />
      <View style={styles.ratingHistoryTextContainer}>
        <Text style={styles.ratingHistoryUser}>{item.fname} {item.lname}</Text>
        <View style={styles.ratingHistoryStars}>
          {[...Array(5)].map((_, index) => (
            <Icon key={index} name="star" size={15} color={index < item.rate ? "#FFA000" : "#ddd"} />
          ))}
        </View>
        <Text style={styles.ratingHistoryComment}>{item.comment}</Text>
        <Text style={styles.ratingHistoryDate}>{formatDate(item.date_comment)}</Text>
      </View>
    </View>
  );

  if (isLoading && page === 1) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching ratings: {error?.data?.message || 'Unknown error'}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.goBackButton}>
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rate Product</Text>
      </View>
      <FlatList
        data={rates}
        keyExtractor={item => item.id_rp}
        renderItem={renderItem}
        contentContainerStyle={styles.ratingHistoryList}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  ratingHistoryList: {
    paddingBottom: 20,
  },
  ratingHistoryItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  ratingHistoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  ratingHistoryTextContainer: {
    flex: 1,
  },
  ratingHistoryUser: {
    fontWeight: 'bold',
    color: '#000',
  },
  ratingHistoryStars: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  ratingHistoryComment: {
    color: '#888',
  },
  ratingHistoryDate: {
    color: '#aaa',
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  goBackButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  goBackButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loadingFooter: {
    paddingVertical: 20,
  },
});

export default ProductRating;
