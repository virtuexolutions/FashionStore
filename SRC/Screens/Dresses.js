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

const Dresses = () => {
  const [like, SetLike] = useState(false);


  const makeUp = [
    {
      id: 1,
      Title: 'Oversize Dress',
      subTitle: 'Oversize',
      price: 14.0,
      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
    },
    {
      id: 2,
      Title: 'Blue Dress',
      subTitle: 'Slim Fit',
      price: 15.0,
      img: require('../Assets/Images/Image.png'),
      like: false,
    },
    {
      id: 3,
      Title: 'Elegant Dress',
      subTitle: 'Slim Fit',
      price: 4.5,
      img: require('../Assets/Images/image3.png'),
      like: true,
    },
    {
      id: 4,
      Title: 'White Dress',
      subTitle: 'Oversize',
      price: 6.9,
      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
    },
    {
      id: 5,
      Title: 'Red Dress',
      subTitle: 'Oversize',
      price: 8.94,
      img: require('../Assets/Images/Image.png'),
      like: false,
    },
    {
      id: 6,
      Title: 'Black Dress',
      subTitle: 'Oversize',
      price: 18.5,
      img: require('../Assets/Images/Image.png'),
      like: true,
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
          return (
            <View
              style={{
                width: windowWidth * 0.45,
                height: windowHeight * 0.35,
                backgroundColor: '#fff',
                margin: moderateScale(5, 0.3),
                borderRadius: 5,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: windowWidth * 0.35,
                  height: windowHeight * 0.22,
                  overflow: 'hidden',
                  borderRadius: 5,
                  marginTop: moderateScale(15, 0.3),
                }}>
                {item?.like && (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.heartIcon}>
                    <Icon
                      name={'heart'}
                      as={Entypo}
                      size={moderateScale(25, 0.3)}
                      color={'#F03710'}
                    />
                  </TouchableOpacity>
                )}
                <CustomImage
                  source={item.img}
                  resizeMode={'cover'}
                  style={{
                    height: '100%',
                    height: '100%',
                  }}
                />
 
                { item?.sale && (<View style={styles.sale}>
                  <CustomText
                    isBold
                    style={{
                      color: '#fff',
                    }}>
                    {item.sale}
                  </CustomText>
                </View>)}

              </View>

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
                  color: '#fe6e2e',
                }}>
                $ {item.price}
              </CustomText>
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

  sale:{
    position: 'absolute',
    bottom: moderateScale(10, 0.3),
    right: moderateScale(5, 0.3),
    zIndex: 1,
    width:windowWidth*0.20,
    height:windowHeight*0.03,
  },


});
