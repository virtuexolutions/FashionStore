import {
  FlatList,
  View,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CartItem from '../Components/CartItem';
import {useState} from 'react';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import CustomText from '../Components/CustomText';
import OrderCard from '../Components/OrderCard';
import {Text} from 'react-native';
import moment from 'moment';

const OrderDetails = (props) => {
  const data = props?.route?.params?.data
    console.log("🚀 ~ file: OrderDetails.js:28 ~ OrderDetails ~ data:", data?.item_info)
    const cartData =useSelector(state => state.commonReducer.item)
  // const dummyarray = [
  //   {
  //     id: 1,
  //     name: 'thing',
  //     image: require('../Assets/Images/image3.png'),
  //     price: 16,
  //   },
  //   {
  //     id: 2,
  //     name: 'lays',
  //     image: require('../Assets/Images/image3.png'),
  //     price: 56,
  //   },
  //   {
  //     id: 3,
  //     name: 'chips',
  //     image: require('../Assets/Images/image3.png'),
  //     price: 300,
  //   },
  //   {
  //     id: 4,
  //     name: 'chocalate',
  //     image: require('../Assets/Images/image3.png'),
  //     price: 160,
  //   },
  //   {
  //     id: 5,
  //     name: 'milk',
  //     image: require('../Assets/Images/image3.png'),
  //     price: 150,
  //   },
  //   {
  //     id: 6,
  //     name: 'clips',
  //     image: require('../Assets/Images/image3.png'),
  //     price: 126,
  //   },
  //   {
  //     id: 7,
  //     name: 'banana',
  //     image: require('../Assets/Images/image3.png'),
  //     price: 126,
  //   },
  // ];
  return (
    <>
      <Header
        showLeft={true}
        leftName={'arrow-left'}
        leftType={Feather}
        title={'Orders Details'}
        //   showRight={true}
        //   rightName={'shopping-bag'}
        //   rightType={Feather}
      />

      <ScrollView
        style={{
          backgroundColor: 'white',
          paddingBottom: moderateScale(50, 0.6),
        }}>
        <CustomText
          style={{
            fontSize: moderateScale(18, 0.6),
            color: Color.black,
            textAlign: 'left',
            // width: windowWidth,
            // height: windowHeight * 0.04,
            paddingHorizontal: moderateScale(15, 0.3),
            paddingVertical: moderateScale(10, 0.3),
          }}
          isBold>
          item
        </CustomText>
        {data?.item_info?.map((item, index) => (
          <View
            style={styles.view}>
            <View
              style={{
                height: windowHeight * 0.06,
                width: windowWidth * 0.1,
              }}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                }}
                // source={require('../Assets/Images/image3.png')}
                source={{uri :item?.image }}
              />
            </View>
            <View
              style={{
                // backgroundColor:'green',
                flexDirection: 'row',
                width: windowWidth * 0.8,
                justifyContent: 'space-between',
              }}>
              <CustomText
                style={{
                  fontSize: moderateScale(14, 0.6),
                  color: Color.mediumGray,
                  textAlign: 'left',
                  // width: windowWidth,
                  // height: windowHeight * 0.04,
                  paddingHorizontal: moderateScale(15, 0.3),
                  paddingVertical: moderateScale(10, 0.3),
                }}
                isBold>
                {item?.name}
              </CustomText>
              <View style={styles.row}>
                <CustomText
                  style={{
                    fontSize: moderateScale(14, 0.6),
                    color: Color.mediumGray,
                    textAlign: 'left',
                    // width: windowWidth,
                    // height: windowHeight * 0.04,
                    paddingHorizontal: moderateScale(5, 0.3),
                    paddingVertical: moderateScale(10, 0.3),
                  }}
                  isBold>
                  {item?.price}
                </CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(12, 0.6),
                    color: Color.mediumGray,
                    textAlign: 'left',
                    // width: windowWidth,
                    // height: windowHeight * 0.04,
                    //   paddingHorizontal: moderateScale(15, 0.3),
                    paddingVertical: moderateScale(10, 0.3),
                  }}>
                x{item?.quantity}
                </CustomText>
              </View>
            </View>
          </View>
        ))}
        <CustomText
          style={styles.heading}
          isBold>
          order details
        </CustomText>
        <View
          style={styles.firstRow}>
          <View style={styles.row}>
            <CustomText style={styles.text2}>OrderId</CustomText>
            <CustomText style={styles.text2}>{data?.order_number}</CustomText>
          </View>
          <View style={styles.row}>
            <CustomText style={styles.text2}>order time</CustomText>
            <CustomText style={styles.text2}>{moment(data?.updated_at).format('LT') }</CustomText>
          </View>
          <View style={styles.row}>
            <CustomText style={styles.text2}>payment methode</CustomText>
            <CustomText style={styles.text2}>{data?.payment_method}</CustomText>
          </View>
          <View
            style={[
              styles.row,
              {
                borderBottomWidth: 1,
                borderColor: Color.mediumGray,
                paddingVertical: moderateScale(10, 0.6),
              },
            ]}>
            <CustomText style={styles.text2}>Delivery address</CustomText>
            <CustomText
              style={[
                styles.text2,
                {
                  width: windowWidth * 0.35,
                },
              ]}>
              {data?.address1}
            </CustomText>
          </View>

          <View style={styles.row}>
            <CustomText style={styles.text2}>Total</CustomText>
            <CustomText style={styles.text2}>{data?.total_amount}</CustomText>
          </View>
          <View style={styles.row}>
            <CustomText style={styles.text2}>subTotal</CustomText>
            <CustomText style={styles.text2}>{data?.sub_total}</CustomText>
          </View>
          {/* <View style={styles.row}>
            <CustomText style={styles.text2}>discount</CustomText>
            <CustomText style={styles.text2}>10%</CustomText>
          </View>
          <View style={styles.row}>
            <CustomText style={styles.text2}>Total</CustomText>
            <CustomText style={styles.text2}>{data?.total_amount}</CustomText>
          </View> */}
        </View>
        {/* <Text>Thello</Text> */}
      </ScrollView>
    </>
  );
};

export default OrderDetails;

const styles = ScaledSheet.create({
  view:{
    flexDirection: 'row',
    backgroundColor: Color.lightGrey,
    marginHorizontal: moderateScale(10, 0.3),
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    borderRadius: moderateScale(10, 0.3),
    marginBottom: moderateScale(10, 0.3),
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(3, 0.6),
  },
  textRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Color.mediumGray,
    justifyContent: 'space-between',
    backgroundColor: 'red',
  },
  firstRow:
    {
      backgroundColor: Color.lightGrey,
      marginHorizontal: moderateScale(10, 0.3),
      paddingVertical: moderateScale(15, 0.3),
      borderRadius: moderateScale(10, 0.6),
      marginBottom: moderateScale(20, 0.3),
    },
    heading:{
      fontSize: moderateScale(18, 0.6),
      color: Color.black,
      textAlign: 'left',
      paddingHorizontal: moderateScale(15, 0.3),
      paddingVertical: moderateScale(10, 0.3),
    },
  
});
