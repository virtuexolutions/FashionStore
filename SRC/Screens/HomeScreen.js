import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {FlatList, Icon, ScrollView} from 'native-base';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import SearchContainer from '../Components/SearchContainer';
import LinearGradient from 'react-native-linear-gradient';
import ProductCard from '../Components/ProductCard';
import navigationService from '../navigationService';

const HomeScreen = () => {
  const [searchData, setSearchData] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    {
      name: 'All',
      image2: require('../Assets/Images/menu.png'),
      image: require('../Assets/Images/menu1.png'),
      onPress:()=>{ 
        console.log('here')}
    },
    {
      name: 'Dress',
      image: require('../Assets/Images/dress.png'),
      image2: require('../Assets/Images/dress1.png'),
      onPress:()=>{ 
        console.log('here')
        navigationService.navigate('Dresses')}
    },
    {
      name: 'T-shirt',
      image: require('../Assets/Images/tshirt.png'),
      image2: require('../Assets/Images/tshirt1.png'),
      onPress:()=>{ 
        console.log('here')}
    },
    {
      name: 'jeans',
      image: require('../Assets/Images/jeans.png'),
      image2: require('../Assets/Images/jeans1.png'),
      onPress:()=>{ 
        console.log('here')}
  },
    {
      name: 'shoes',
      image: require('../Assets/Images/shoes.png'),
      image2: require('../Assets/Images/shoes1.png'),
      onPress:()=>{ 
        console.log('here')}
    },
  ];
  const specialOffers = [
    {
      title: 'black Friday',
      off: '30%',
      detail: '*for selection item',
    },
    {
      title: 'New Year Sale',
      off: '50% ',
      detail: '*for selection item',
    },
  ];
  const newArrivals = [
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
      images:[require('../Assets/Images/Mask2.png'),require('../Assets/Images/Mask2.png'),require('../Assets/Images/Mask2.png'),require('../Assets/Images/Mask2.png'),require('../Assets/Images/Mask2.png'),],
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
      <CustomStatusBar backgroundColor={'#FDFDFD'} barStyle={'dark-content'} />
      <Header
        showLeft={true}
        leftName={'menu'}
        leftType={Feather}
        title={'Home'}
        showRight={true}
        rightName={'shopping-bag'}
        rightType={Feather}
        textStyle={{fontSize:moderateScale(18,.6)}}
      />
      <ScrollView
      showsVerticalScrollIndicator={false}
        style={{
          height: windowHeight,
          width: windowWidth,
          //   alignItems: 'center',
          alignSelf: 'center',
          //   paddingTop: windowHeight * 0.1,
            backgroundColor: '#FDFDFD',
        }}
        contentContainerStyle={{
          paddingHorizontal : moderateScale(10,0.6)
        }}
        >
        <CustomText
          style={{
            fontSize: moderateScale(24, 0.6),
            color: '#FF6E2E',
            textAlign: 'left',
            width: windowWidth,
            height: windowHeight * 0.04,
            // backgroundColor:'black'
          }}
          isBold>
          Fashion Store
        </CustomText>

        <SearchContainer
          width={windowWidth * 0.95}
          input
          inputStyle={{
            height: windowHeight * 0.05,
          }}
          style={{
            height: windowHeight * 0.06,
            marginTop: moderateScale(13, 0.3),
            borderRadius: moderateScale(20, 0.3),
            alignSelf: 'center',
          }}
          data={searchData}
          placeHolder={'What Do You need ?'}
          setData={setSearchData}
          rightIcon
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: windowWidth * 0.95,
            marginTop: moderateScale(23, 0.3),
          }}>
          <CustomText
            style={{
              //   backgroundColor: 'red',
              fontSize: moderateScale(16, 0.6),
              color: 'black',
            }} isBold>
            Categories
          </CustomText>
          <CustomText
            style={{
              //   backgroundColor: 'red',
              color: '#FF6E2E',
              borderRadius: moderateScale(20, 0.6),
              backgroundColor: '#FBCEB1',
              fontSize: moderateScale(12, 0.6),
              //height:windowHeight*0.03,
              padding: moderateScale(5, 0.6),
            }}
            isBold>
            See all
          </CustomText>
        </View>
        <View
          style={{
            height: windowHeight * 0.09,
            width: windowWidth * 0.95,
            // backgroundColor:'red',
            marginTop: moderateScale(20, 0.3),
            flexDirection: 'row',
            // alignItems:'center',
            justifyContent: 'space-between',
          }}>
          {categories.map((item, index) => {
            console.log(
              '🚀 ~ file: HomeScreen.js:146 ~ {categories.map ~ item:',
              item,
            );
            return (
              <>
                <TouchableOpacity style={{alignItems: 'center', width: windowWidth * 0.16}} onPress={item?.onPress}>
                  <LinearGradient
                    style={{
                      height: moderateScale(52,.6),
                      width:  moderateScale(52,.6),
                      // backgroundColor:
                      //   selectedCategory == item?.name ? 'orange' : '#E5E4E2',
                      // color: selectedCategory == item?.name ? 'white' : '#DDD2',
                      borderRadius: moderateScale(10, 0.6),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    colors={
                      selectedCategory == item?.name
                        ? ['#F89D52', '#FF6E2E']
                        : ['#F4F4F4', '#F4F4F4']
                    }>
                    <CustomImage
                      source={
                        selectedCategory == item?.name
                          ? item?.image2
                          : item?.image
                      }
                      // style={{}}
                      resizeMode={'cover'}
                      onPress={() => {
                        setSelectedCategory(item?.name);
                        item?.onPress()
                      }}
                    />
                  </LinearGradient>
                  <CustomText
                    style={{width: windowWidth * 0.14, color: 'black'}}>
                    {item?.name}
                  </CustomText>
                </TouchableOpacity>
              </>
            );
          })}
        </View>
        <View
          style={{
            height: windowHeight * 0.16,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ScrollView
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              width: windowWidth,
              marginTop: moderateScale(20, 0.3),
              height: windowHeight * 0.1,
              //   backgroundColor: 'black',
            }}
            contentContainerStyle={{
              paddingHorizontal : moderateScale(10,0.6)
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {specialOffers.map((item, index) => {
              return (
                <LinearGradient
                  style={{
                    width: windowWidth * 0.5,
                    height: windowHeight * 0.12,
                    borderRadius: moderateScale(20, 0.6),
                    // backgroundColor: 'orange',
                    marginRight: moderateScale(10, 0.3),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  colors={['#F89D52', '#FF6E2E']}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}>
                  <View
                  >
                    <CustomText
                      style={{
                        color: 'white',
                        // backgroundColor: 'red',
                        textAlign: 'left',
                        width: windowWidth * 0.45,
                        fontSize: moderateScale(14, 0.6),
                      }}>
                      {item?.title}
                    </CustomText>
                    <View
                      style={{
                        flexDirection: 'row',
                        // backgroundColor: 'purple',
                        width: windowWidth * 0.45,
                        alignItems: 'center',
                      }}>
                      <CustomText
                        style={{
                          color: 'white',
                          // backgroundColor: 'red',
                          textAlign: 'left',
                          // width: windowWidth * 0.2,
                          fontSize: moderateScale(25, 0.6),
                        }}>
                        {item?.off}
                      </CustomText>
                      <CustomText
                        style={{
                          color: 'white',
                          // backgroundColor: 'red',
                          textAlign: 'left',
                          // width: windowWidth * 0.2,
                          fontSize: moderateScale(12, 0.6),
                        }}>
                        {'  '}
                        off
                      </CustomText>
                    </View>

                    <CustomText
                      style={{
                        color: 'white',
                        // backgroundColor: 'red',
                        textAlign: 'left',
                        width: windowWidth * 0.45,
                        fontSize: moderateScale(10, 0.6),
                      }}>
                      {item?.detail}
                    </CustomText>
                  </View>
                </LinearGradient>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: windowWidth * 0.95,
            // backgroundColor:'purple'
          }}>
          <CustomText
            style={{
              fontSize: moderateScale(16, 0.6),
              color: 'black',
            }}
            isBold>
            New Arrivals
          </CustomText>
          <CustomText
            style={{
              
              color: 'black',
              borderRadius: moderateScale(20, 0.6),
              fontSize: moderateScale(12, 0.6),
              paddingVertical: moderateScale(5, 0.6),
            }}>
            See all collection
          </CustomText>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={newArrivals}
          contentContainerStyle={{
            alignSelf: 'center',
            marginTop: moderateScale(5, 0.3),
          }}
          renderItem={({item, index}) => {
            return (
            <ProductCard item={item} />
            );
          }}
        />
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bottomImage: {
    width: '100%',
    height: '100%',
  },
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
    width: windowWidth * 0.2,
    height: windowHeight * 0.03,
  },
});
