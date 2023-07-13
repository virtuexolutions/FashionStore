import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import {useSelector, useDispatch} from 'react-redux';
import {AddToCart, RemoveToCart} from '../Store/slices/common';
import CustomButton from '../Components/CustomButton';
import ProductCard from '../Components/ProductCard';

const Dresses = () => {
  const [like, SetLike] = useState(false);

  const dispatch = useDispatch();

  const cartData = useSelector(state => state.commonReducer.cart);
  console.log( 'the data is ========>> >> ',cartData)
  const addedItem = item => {
    console.log('add DATA===>', cartData);

    dispatch(AddToCart(item));
  };

  const removeItem = item => {
    console.log('REMOVE DATA', cartData);
    dispatch(RemoveToCart(item));
  };
  
  const makeUp = [
    {
      id: 1,
      Title: 'Oversize Dress',
      subTitle: 'Oversize',
      price: 14.0,
      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
      qty: 1,
      colors:[ '#4e86c2','#2c4973','#1ABFBC','#C8CDD2', '#ECECEC','#313436'],
      size:['XS', 'S', 'M', 'L', 'XL'],
      cotton:1,
      selectedSize : '',
      selectedColor : '',
      totalQty : 18,
    },
    {
      id: 2,
      Title: 'Blue Dress',
      subTitle: 'Slim Fit',
      price: 15.0,
      img: require('../Assets/Images/Image.png'),
      like: false,
      qty: 1,
      colors:[ '#4e86c2','#2c4973','#1ABFBC','#C8CDD2', '#ECECEC','#313436'],
      size:['XS', 'S', 'M', 'L', 'XL'],
      cotton:1,
      selectedSize : '',
      selectedColor : '',
      totalQty : 18,
    },
    {
      id: 3,
      Title: 'Elegant Dress',
      subTitle: 'Slim Fit',
      price: 4.5,
      img: require('../Assets/Images/image3.png'),
      like: true,
      qty: 1,
      colors:[ '#4e86c2','#2c4973','#1ABFBC','#C8CDD2', '#ECECEC','#313436'],
      size:['XS', 'S', 'M', 'L', 'XL'],
      cotton:1,
      selectedSize : '',
      selectedColor : '',
      totalQty : 18,
    },
    {
      id: 4,
      Title: 'White Dress',
      subTitle: 'Oversize',
      price: 6.9,
      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
      qty: 1,
      colors:[ '#4e86c2','#2c4973','#1ABFBC','#C8CDD2', '#ECECEC','#313436'],
      size:['XS', 'S', 'M', 'L', 'XL'],
      cotton:1,
      selectedSize : '',
      selectedColor : '',
      totalQty : 18,
    },
    {
      id: 5,
      Title: 'Red Dress',
      subTitle: 'Oversize',
      price: 8.94,
      img: require('../Assets/Images/Image.png'),
      like: false,
      qty: 1,
      colors:[ '#4e86c2','#2c4973','#1ABFBC','#C8CDD2', '#ECECEC','#313436'],
      size:['XS', 'S', 'M', 'L', 'XL'],
      cotton:1,
      selectedSize : '',
      selectedColor : '',
      totalQty : 18,
    },
    {
      id: 6,
      Title: 'Black Dress',
      subTitle: 'Oversize',
      price: 18.5,
      img: require('../Assets/Images/Image.png'),
      like: true,
      qty: 1,
      colors:[ '#4e86c2','#2c4973','#1ABFBC','#C8CDD2', '#ECECEC','#313436'],
      size:['XS', 'S', 'M', 'L', 'XL'],
      cotton:1,
      selectedSize : '',
      selectedColor : '',
      totalQty : 18,
    },
  ];

  return (
    <>
    <CustomStatusBar
        backgroundColor={'white'}
      barStyle={'dark-content'}
    />
    <Header
      showLeft={true}
      leftName={'arrow-left'}
      leftType={Feather}
      title={'dresses'}
      showRight={true}
      rightName={'shopping-bag'}
      rightType={Feather}
    />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: moderateScale(10, 0.6),
          // marginTop: moderateScale(90, 0.3),
        }}>
        <CustomText isBold> All Dresses</CustomText>

        <CustomText>See Other categories</CustomText>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={makeUp}
        contentContainerStyle={{
          alignSelf: 'center',
          marginTop: moderateScale(5, 0.3),
        }}
        renderItem={({item, index}) => {
          const tempitem = cartData.find((x,index)=> x?.id == item?.id)

          return (
            <ProductCard item={item}/>
          
          );
        }}
      />
   
    </>
  );
};

export default Dresses;

const styles = StyleSheet.create({
  heartIcon: {
    position: 'absolute',
    top: moderateScale(10, 0.3),
    left: moderateScale(5, 0.3),
    zIndex: 1,
  },

  sale: {
    position: 'absolute',
    bottom: moderateScale(10, 0.3),
    right: moderateScale(5, 0.3),
    zIndex: 1,
    width: windowWidth * 0.17,
    height: windowHeight * 0.04,
    backgroundColor: '#ff6e2e',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (windowWidth * 0.17) / 2,
  },
});
