import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import CustomImage from './CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import SubCategories from './SubCategories';
import CustomText from './CustomText';

const CategoriesModal = ({isVisible, setIsVisible, categoryData,  setCategoryId, setCategoryType}) => {
  const token = useSelector(state => state.authReducer.token);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryData?.sub_categories,
  );
  const [selectedSubCat, setSelectedSubCat] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSelectedCategory(categoryData?.sub_categories[0]?.title);
  }, [categoryData]);



 

  const data = [
    {
      name: 'Electronics',
      image: require('../Assets/Images/dress.png'),
      sub: [
        {name: 'laptop', image: require('../Assets/Images/shoes.png')},
        {name: 'television', image: require('../Assets/Images/jeans.png')},
        {name: 'Headphones', image: require('../Assets/Images/tshirt.png')},
        {name: 'tablets', image: require('../Assets/Images/shoes.png')},
      ],
    },
    {
      name: 'Fashion',
      image: require('../Assets/Images/dress.png'),
      sub: [
        {name: 'Dress', image: require('../Assets/Images/shoes.png')},
        {name: 'Shoes', image: require('../Assets/Images/jeans.png')},
        {name: 'Headphones', image: require('../Assets/Images/tshirt.png')},
        {name: 'tablets', image: require('../Assets/Images/shoes.png')},
      ],
    },
    {
      name: 'Beauty',
      image: require('../Assets/Images/dress.png'),
      sub: [
        {name: 'laptop', image: require('../Assets/Images/shoes.png')},
        {name: 'television', image: require('../Assets/Images/jeans.png')},
        {name: 'Headphones', image: require('../Assets/Images/tshirt.png')},
        {name: 'tablets', image: require('../Assets/Images/shoes.png')},
      ],
    },
    {
      name: 'Jewellery',
      image: require('../Assets/Images/dress.png'),
      sub: [
        {name: 'laptop', image: require('../Assets/Images/shoes.png')},
        {name: 'television', image: require('../Assets/Images/jeans.png')},
        {name: 'Headphones', image: require('../Assets/Images/tshirt.png')},
        {name: 'tablets', image: require('../Assets/Images/shoes.png')},
      ],
    },
  ];

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      style={{}}>
      <View style={styles.modalContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <FlatList
            data={categoryData?.sub_categories}
            renderItem={({item, index}) => {
              return (
                <SubCategories
                setCategoryType={setCategoryType}
                setCategoryId={setCategoryId}
                  item={item}
                  setIsVisible={setIsVisible}
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                />
              );
            }}
          />
          <FlatList
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}
            data={
              categoryData?.sub_categories?.find(
                item => item?.title == selectedCategory,
              )?.child_categories
            }
            renderItem={({item, index}) => {
              return (
                <>
                  <TouchableOpacity
                    style={styles.container}
                    onPress={() => {
                      setCategoryId(item?.id)
                      setCategoryType('child')
                      setSelectedSubCat(item?.title);
                      setIsVisible(false);
                    }}>
                    <CustomText style={styles.text} isBold>
                      {item?.title}
                    </CustomText>
                  </TouchableOpacity>
                </>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CategoriesModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    width: windowWidth * 0.9,
    height: windowHeight * 0.6,
  },
  text: {
    color: 'black',
    fontSize: moderateScale(15, 0.6),
    textAlign: 'center',
  },
  container: {
    paddingVertical: moderateScale(8, 0.6),
    justifyContent: 'center',
    width: windowWidth * 0.5,
    alignItems: 'center',
    borderColor: Color.lightGrey,
    borderWidth: 2,
    borderRadius: moderateScale(15, 0.6),
    marginVertical: moderateScale(5, 0.3),
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
