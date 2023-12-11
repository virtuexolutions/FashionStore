import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import CustomImage from './CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import SubCategories from './SubCategories';

const CategoriesModal = ({isVisible, setIsVisible}) => {
  const token = useSelector(state => state.authReducer.token);
  const [selectedCategory, setSelectedCategory] = useState('Electronics');
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const url = 'auth/category/list';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      console.log(
        '🚀 ~ file: CategoriesModal.js:19 ~ getCategories ~ response:',
        response?.data,
      );
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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
      onBackdropPress={()=> setIsVisible(false)}
      style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.modalContainer}>
        <View style={{flexDirection: 'row'}}>
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <SubCategories
                  item={item}
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                />
              );
            }}
          />
          <FlatList
            data={data?.find(item => item?.name == selectedCategory)?.sub}
            numColumns={2}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity style={styles.container}>
                  <Text style={styles.text}>{item?.name}</Text>
                </TouchableOpacity>
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
  },
  text: {
    // marginTop: moderateScale(5, 0.3),
    color: 'white',
    fontSize: moderateScale(15, 0.6),
    textAlign: 'center',
  },
  container: {
    paddingVertical: moderateScale(8, 0.6),
    paddingHorizontal: moderateScale(8, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(15, 0.6),
    marginVertical: moderateScale(5, 0.3),
    backgroundColor: Color.themeColor,
    marginHorizontal: moderateScale(5, 0.3),
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
