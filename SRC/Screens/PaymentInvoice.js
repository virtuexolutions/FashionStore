import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import Header from '../Components/Header';
  import CustomText from '../Components/CustomText';
  import {windowHeight, windowWidth} from '../Utillity/utils';
  import CustomStatusBar from '../Components/CustomStatusBar';
  import {moderateScale} from 'react-native-size-matters';
  import Color from '../Assets/Utilities/Color';
  import CustomImage from '../Components/CustomImage';
  import navigationService from '../navigationService';
  import { useDispatch, useSelector } from 'react-redux';
  import moment from 'moment';
  import numeral from 'numeral'
import { EmptyCart } from '../Store/slices/common';
  
  const PaymentInvoice = props => {
    const Invoice = props.route.params.body;
  //  return  console.log("🚀 ~ file: PaymentInvoice.js:22 ~ PaymentInvoice ~ Invoice:", Invoice?.item_info?.product_info)
    const user = useSelector(state=> state.commonReducer.userData)
    const dispatch = useDispatch()
  
  
    return (
      <>
        <CustomStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
  
        <View
          style={{
            height: windowHeight,
            width: windowWidth,
            // backgroundColor: Color.themeColor2,
            backgroundColor:'white',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginTop: moderateScale(10, 0.3),
              alignItems: 'center',
              width: windowWidth,
              paddingVertical: moderateScale(10, 0.6),
            }}>
            <View style={{height: windowHeight *0.1, width: windowWidth  *0.2}}>
              <CustomImage
                source={require('../Assets/Images/logo.png')}
                resizeMode={'contain'}
                style={{height: '100%', width: '100%'}}
              />
            </View>
            <CustomText isBold style={{fontSize: moderateScale(18, 0.6)}}>
              Fashion store
            </CustomText>
          </View>
  
          <View
            style={{
              width: windowWidth,
              marginTop: moderateScale(30, 0.3),
              alignItems: 'center',
            }}>
            <View
              style={{
                width: windowWidth * 0.9,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: moderateScale(20, 0.3),
              }}>
              <CustomText>Order Id</CustomText>
              <CustomText>{Invoice?.order_number}</CustomText>
            </View>
            <View
              style={{
                width: windowWidth * 0.9,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: moderateScale(20, 0.3),
              }}>
              <CustomText>Bill To</CustomText>
              <CustomText>{Invoice?.first_name}</CustomText>
            </View>
            <View
              style={{
                width: windowWidth * 0.9,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: moderateScale(20, 0.3),
              }}>
              <CustomText>Amount Due To</CustomText>
              <CustomText>{numeral(Invoice?.discount_amount).format('$0,0.00')}</CustomText>
            </View>
            <View
              style={{
                width: windowWidth * 0.9,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: moderateScale(20, 0.3),
              }}>
              <CustomText>Date</CustomText>
              <CustomText>{ moment().format('DD MMM YYYY')}</CustomText>
            </View>
            {/* <View
              style={{
                width: windowWidth * 0.9,
                flexDirection: 'row',
                marginTop: moderateScale(20, 0.3),
              }}>
              <CustomText  numberOfLines={2} style={{width:windowWidth*0.9,color:"#e4b22d",fontSize:moderateScale(11,0.6)}}>Note: kindly contact seller for further details with in two days</CustomText>
            </View> */}
          </View>
  
  
          <View
            style={{
              width: windowWidth,
              paddingVertical: moderateScale(10, 0.3),
              marginTop: moderateScale(10, 0.3),
              alignItems: 'center',
            }}>
            <View
              style={{
                width: windowWidth * 0.9,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: moderateScale(10, 0.3),
                borderBottomWidth: 1,
                borderBottomColor: Color.mediumGray,
                paddingBottom: 10,
              }}>
              <CustomText isBold>ITEMS</CustomText>
              <CustomText isBold>#AMOUNT </CustomText>
            </View>
  
            <ScrollView
             contentContainerStyle={{
              paddingBottom:moderateScale(20,0.6),
              // maxHeight: windowHeight * 0.2,
  
             }}
              style={{
              maxHeight: windowHeight * 0.2,
              }}>
              {Invoice?.item_info?.map(item => {
                return (
                  <View
                    style={{
                      width: windowWidth * 0.9,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: moderateScale(20, 0.3),
                    }}>
                    <CustomText>
                      {item?.product_info?.title} x {item?.quantity}
                    </CustomText>
                    <CustomText>{numeral(item?.price).format('$0,0.00')}</CustomText>
                  </View>
                );
              })}
            </ScrollView>
          </View>
  
          <View
            style={{
              width: windowWidth * 0.9,
              borderBottomWidth: 1,
              borderColor: Color.mediumGray,
            }}></View>
  
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: windowWidth * 0.9,
              marginTop: moderateScale(20, 0.3),
            }}>
            <CustomText isBold>Total </CustomText>
            <CustomText isBold> {numeral(Invoice?.total_amount).format('$0,0.00')}</CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: windowWidth * 0.9,
              marginTop: moderateScale(10, 0.3),
            }}>
            <CustomText isBold>Discount </CustomText>
            <CustomText isBold> {numeral(Invoice?.total_amount - Invoice?.discount_amount).format('$0,0.00')}</CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: windowWidth * 0.9,
              marginTop: moderateScale(10, 0.3),
            }}>
            <CustomText isBold>Sub Total </CustomText>
            <CustomText isBold> {numeral(Invoice?.discount_amount).format('$0,0.00')}</CustomText>
          </View>
  
          <TouchableOpacity
            onPress={() => {
              dispatch(EmptyCart())
              navigationService.navigate('HomeScreen')}}
            activeOpacity={0.8}
            style={{
              width: windowWidth * 0.4,
              paddingVertical: moderateScale(15, 0.6),
              backgroundColor: Color.themeColor,
              borderRadius: moderateScale(10, 0.3),
              marginTop: moderateScale(20, 0.3),
              alignItems: 'center',
            }}>
            <CustomText style={{color: Color.white, fontSize:moderateScale(15,.6)}}>Back To Home</CustomText>
          </TouchableOpacity>
  
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: windowWidth * 0.8,
              paddingVertical: moderateScale(10, 0.6),
              borderRadius: moderateScale(10, 0.3),
              alignItems: 'center',
            }}>
            <CustomText
              style={{color: Color.black, marginLeft: moderateScale(10, 0.3)}}>
              Powered by
            </CustomText>
  
            <View
              style={{
                width: windowWidth * 0.3,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <CustomImage
                source={require('../Assets/Images/logo.png')}
                resizeMode={'contain'}
                style={{height: 20, width: 20}}
              />
              <CustomText isBold style={{color: Color.black}}>
                Fashion store
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  
  export default PaymentInvoice;