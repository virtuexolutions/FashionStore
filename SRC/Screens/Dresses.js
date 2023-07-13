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
      qty: 0,
      colors:[ '#4e86c2','#2c4973','#1ABFBC','#C8CDD2', '#ECECEC','#313436'],
      size:['XS', 'S', 'M', 'L', 'XL'],
      selectedSize : '',
      selectedColor : ''
     
    },
    {
      id: 2,
      Title: 'Blue Dress',
      subTitle: 'Slim Fit',
      price: 15.0,
      img: require('../Assets/Images/Image.png'),
      like: false,
      qty: 0,
      colors:[ '#4e86c2','#2c4973','#1ABFBC','#C8CDD2', '#ECECEC','#313436'],
      size:['XS', 'S', 'M', 'L', 'XL'],
      selectedSize : '',
      selectedColor : ''
    },
    {
      id: 3,
      Title: 'Elegant Dress',
      subTitle: 'Slim Fit',
      price: 4.5,
      img: require('../Assets/Images/image3.png'),
      like: true,
      qty: 0,
      colors:[ '#4e86c2','#2c4973','#1ABFBC','#C8CDD2', '#ECECEC','#313436'],
      size:['XS', 'S', 'M', 'L', 'XL'],
      selectedSize : '',
      selectedColor : ''
    },
    {
      id: 4,
      Title: 'White Dress',
      subTitle: 'Oversize',
      price: 6.9,
      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
      qty: 0,
      colors:[ '#4e86c2','#2c4973','#1ABFBC','#C8CDD2', '#ECECEC','#313436'],
      size:['XS', 'S', 'M', 'L', 'XL'],
      selectedSize : '',
      selectedColor : ''
    },
    {
      id: 5,
      Title: 'Red Dress',
      subTitle: 'Oversize',
      price: 8.94,
      img: require('../Assets/Images/Image.png'),
      like: false,
      qty: 0,
      colors:[ '#4e86c2','#2c4973','#1ABFBC','#C8CDD2', '#ECECEC','#313436'],
      size:['XS', 'S', 'M', 'L', 'XL'],
      selectedSize : '',
      selectedColor : ''
    },
    {
      id: 6,
      Title: 'Black Dress',
      subTitle: 'Oversize',
      price: 18.5,
      img: require('../Assets/Images/Image.png'),
      like: true,
      qty: 0,
      colors:[ '#4e86c2','#2c4973','#1ABFBC','#C8CDD2', '#ECECEC','#313436'],
      size:['XS', 'S', 'M', 'L', 'XL'],
      selectedSize : '',
      selectedColor : ''
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
            // <ProductCard item={item}/>
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => addedItem(item)}
                style={{
                  width: windowWidth * 0.45,
                  height: windowHeight * 0.35,
                  backgroundColor: '#fff',
                  margin: moderateScale(5, 0.3),
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    width: windowWidth * 0.35,
                    height: windowHeight * 0.22,
                    overflow: 'hidden',
                    borderRadius: 5,
                    marginTop: moderateScale(15, 0.3),
                  }}>
                  {item?.like && (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.heartIcon}>
                      <Icon
                        name={'heart'}
                        as={Entypo}
                        size={moderateScale(25, 0.3)}
                        color={'#ff0000'}
                      />
                    </TouchableOpacity>
                  )}

                  <CustomImage
                     onPress={() => addedItem(item)}
                    source={item.img}
                    resizeMode={'cover'}
                    style={{
                      height: '100%',
                      height: '100%',
                    }}
                  />

                  

                  {item?.sale && (
                    <View style={styles.sale}>
                      <CustomText
                        isBold
                        style={{
                          color: '#fff',
                          fontSize: 12,
                        }}>
                        {item.sale}
                      </CustomText>
                    </View>
                  )}
                </TouchableOpacity>

                <CustomText
                  isBold
                  style={{
                    textAlign: 'left',
                    width: windowWidth * 0.35,
                    height: windowHeight * 0.03,
                    color: '#464342',
                    marginTop: moderateScale(10, 0.3),
                  }}>
                  {item.Title}
                </CustomText>

                <CustomText
                  style={{
                    textAlign: 'left',
                    width: windowWidth * 0.35,
                    height: windowHeight * 0.03,
                    color: '#a2a2a2',
                  }}>
                  {item.subTitle}
                </CustomText>

                <CustomText
                  style={{
                    textAlign: 'left',
                    width: windowWidth * 0.35,
                    color: '#E56A36',
                  }}>
                  $ {item.price}
                </CustomText>

                <CustomText
                  onPress={() => {
                    navigationService.navigate('DressesDetail', {item});
                  }}
                  style={{
                    textAlign: 'right',
                    width: windowWidth * 0.35,
                    color: '#2C2928',
                    position: 'absolute',
                    bottom: moderateScale(10, 0.3),
                    right: moderateScale(15, 0.3),
                    fontSize: 13,
                  }}>
                  View all
                </CustomText>
              </TouchableOpacity>

              {tempitem && item?.qty >= 0 && (
                <CustomButton 
                  isBold
                  onPress={() => removeItem(item)}
                  text={'Remove'}
                  textColor={Color.white}
                  width={windowWidth * 0.28}
                  marginTop={10}
                  marginBottom={10}
                  height={windowHeight * 0.04}
                  bgColor={'#FF6E2E'}
                  fontSize={14}
                  borderRadius={moderateScale(5, 0.3)}
                />
              )}
            </View>
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
