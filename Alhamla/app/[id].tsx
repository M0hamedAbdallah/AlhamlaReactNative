import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetOneProductQuery } from '@/store/Product/product';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { useAddRateMutation } from '@/store/Rate/rate';

const ProductDetails = () => {
  const router = useRouter();
  const route = useRoute();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { id } = route.params as { id: string };
  const { data: productData, isError, isLoading, error } = useGetOneProductQuery(id);
  const [addRating, { isLoading: addRatingLoading, isError: addRatingError, error: addRatingErrorData }] = useAddRateMutation() as any;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching product details: {error?.toString() || 'Unknown error'}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.goBackButton}>
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleRatingSubmit = async () => {
    if (!comment) {
      Alert.alert('Error', 'Please enter a comment');
      return;
    }
    try {
      await addRating({ id_product: id, rating, comment }).unwrap();
      Alert.alert('Rating submitted', `Rating: ${rating}, Comment: ${comment}`, [{ text: 'OK', onPress: () => router.back() }]);
    } catch (error) {
      console.error('Failed to submit rating', error);
    }
  };

  const product = productData?.data;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerIcon}>
              <Icon name="heart" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Icon name="ellipsis-v" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <Image source={{ uri: product?.product_photo }} style={styles.productImage} resizeMode="contain" />
        <View style={styles.productInfoContainer}>
          <Text style={styles.productName}>{product?.product_name_ar}</Text>
          <Text style={styles.productDetails}>بلد المنشأ: {product?.state_name_ar}</Text>
          <Text style={styles.productDetails}>التصنيف: {product?.category_name_ar}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.productRating}>{parseInt(product?.rateproduct)} / 5</Text>
            <Icon name="star" size={15} color="#FFA000" />
          </View>
          <View style={styles.reasonContainer}>
            <Text style={styles.sectionTitle}>الوصف</Text>
            <Text style={styles.reasonText}>{product?.product_description}</Text>
          </View>
          <View style={styles.systemRatingContainer}>
            <Text style={styles.sectionTitle}>اترك تقييم للمنتج</Text>
            <View style={styles.ratingStars}>
              {[...Array(5)].map((_, index) => (
                <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
                  <Icon name="star" size={30} color={index < rating ? "#FFA000" : "#ddd"} />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.commentInput}
              placeholder="اكتب تعليقك"
              placeholderTextColor="#888"
              numberOfLines={5}
              value={comment}
              onChangeText={setComment}
              multiline
            />
            {addRatingError && (
              <Text style={styles.errorText}>{addRatingErrorData?.data?.message || 'Error submitting rating'}</Text>
            )}
            <TouchableOpacity
              style={styles.submitRatingButton}
              onPress={handleRatingSubmit}
              disabled={addRatingLoading}
            >
              {addRatingLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitRatingText}>تقييم</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.ratingHistory} onPress={() => {
          router.push(`/rate/${id}`);
          console.log(id);
        }}>
          <Text style={styles.ratingHistoryText}>تقييمات المنتج</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  loadingContainer: {
    backgroundColor: '#181818',
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
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 20,
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  productInfoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  productDetails: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  systemRatingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  productRating: {
    alignItems: 'center',
    fontSize: 16,
    color: '#000',
    marginRight: 5,
  },
  reasonContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  reasonText: {
    fontSize: 14,
    color: '#888',
  },
  ratingStars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  commentInput: {
    borderWidth: 1,
    width: '100%',
    height: 100,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  submitRatingButton: {
    backgroundColor: '#FF0000',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitRatingText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ratingHistoryList: {
    paddingBottom: 20,
  },
  ratingHistoryItemContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
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
  ratingHistory: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  ratingHistoryText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductDetails;
