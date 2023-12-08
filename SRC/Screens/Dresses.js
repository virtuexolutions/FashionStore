import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import {Icon, ScrollView} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import {useSelector, useDispatch} from 'react-redux';
import ProductCard from '../Components/ProductCard';
import Color from '../Assets/Utilities/Color';

const Dresses = () => {
  const cartData =useSelector(state => state.commonReducer.item)
  const [like, SetLike] = useState(false);

  const dispatch = useDispatch();


  
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
      images:[require('../Assets/Images/Mask.png'),require('../Assets/Images/Mask2.png'),],
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
      images:[require('../Assets/Images/Image.png'),require('../Assets/Images/Mask.png'),require('../Assets/Images/Mask2.png')],

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
      images:[require('../Assets/Images/Mask.png'),require('../Assets/Images/Mask2.png')],

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
      images:[require('../Assets/Images/Mask3.png'),require('../Assets/Images/Image.png'),require('../Assets/Images/Mask.png'),require('../Assets/Images/Mask2.png')],

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
      images:[require('../Assets/Images/Mask2.png')],
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
      images:[require('../Assets/Images/Image.png'),require('../Assets/Images/Mask.png'),require('../Assets/Images/Mask2.png')],
    },
  ];

  return (
    <>
   <CustomStatusBar backgroundColor={'#FDFDFD'} barStyle={'dark-content'} />
    <Header
      showLeft={true}
      leftName={'arrow-left'}
      leftType={Feather}
      title={'dresses'}
      showRight={true}
      rightName={'shopping-bag'}
      rightType={Feather}
    />

    <ScrollView 
     showsHorizontalScrollIndicator={false}>
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
    </ScrollView>
   
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
    backgroundColor:Color.themeColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (windowWidth * 0.17) / 2,
  },
});
