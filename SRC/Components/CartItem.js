import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomImage from './CustomImage';
import {Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import numeral from 'numeral';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  RemoveFromCart,
  decrementQuantity,
  increamentQuantity,
  selectedProductSize,
} from '../Store/slices/common';
import DropDownSingleSelect from './DropDownSingleSelect';
import {imageSizeUrl, imageUrl} from '../Config';

const CartItem = ({item, fromCheckout}) => {
  // console.log(
  //   '🚀 ~ file: CartItem.js:22 ~ CartItem ~ item:',
  //   item,
  //   imagesizeUrl,item?.size_id?.image,
  // );
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(
    Object.keys(item?.size_id).length > 0 ? item?.size_id?.size : '',
  );
  const [sizeArray, setSizeArray] = useState(
    item?.varation?.map(item => item?.size),
  );

  useEffect(() => {
    if (selectedSize != '') {
      dispatch(
        selectedProductSize({
          id: item?.id,
          item: item?.varation?.find(data => data?.size == selectedSize),
        }),
      );
    }
  }, [selectedSize]);

  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={styles.otherContainer}>
          <Icon
            name={'circle'}
            as={Entypo}
            size={moderateScale(20, 0.3)}
            color={Color.themeLightGray}
            style={{
              marginRight: moderateScale(5, 0.3),
            }}
          />
          <CustomImage
            source={
              item?.size_id?.image ? {uri :`${imageSizeUrl}/${item?.size_id?.image}`} :
              item?.small_image
                ? {uri: `${imageUrl}${item?.small_image}`}
                : require('../Assets/Images/Mask2.png')
            }
            // source={require('../Assets/Images/Mask2.png')}
            style={{
              width: windowWidth * 0.3,
              height: windowHeight * 0.15,
              borderRadius: moderateScale(10, 0.3),
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            dispatch(RemoveFromCart(item));
          }}
          style={{
            position: 'absolute',
            right: 5,
            zIndex: 1,
          }}>
          <Icon
            style={{
              color: Color.red,
            }}
            name="trash-outline"
            as={Ionicons}
            color={Color.red}
            size={22}
          />
        </TouchableOpacity>
        <View style={styles.other1}>
          <CustomText numberOfLines={2} style={styles.text1}>
            {item?.title}
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: windowWidth * 0.45,
            }}>
            {/* {item?.size_id ? (
              <CustomText style={{textAlign:'left', color:'black', fontSize:moderateScale(12,.6)}}>{item?.size_id?.size}</CustomText>
            ) : ( */}
            {!['', null, undefined].includes(item?.size) ? (
              <DropDownSingleSelect
                placeholder={selectedSize ? selectedSize : 'Select Any Size'}
                array={sizeArray}
                item={selectedSize}
                setItem={setSelectedSize}
                width={windowWidth * 0.5}
                dropDownHeight={windowHeight * 0.06}
                dropdownStyle={{
                  fontSize: moderateScale(10, 0.6),
                  width: windowWidth * 0.9,
                  borderBottomWidth: 0,
                }}
                fontSize={moderateScale(10, 0.6)}
              />
            ) : (
              <View
                style={{
                  height: 30,
                }}></View>
            )}
            {/* )} */}
          </View>

          <View
            style={[
              styles.other1,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <CustomText style={styles.amount}>
              {numeral(
                (!['', null, undefined, 'null'].includes(item?.size)
                  ? item?.size_id?.discount_price
                    ? item?.size_id?.discount_price
                    : item?.size_id?.price
                  : item?.discount_price
                  ? item?.discount_price
                  : item?.wholsale_price) * item?.quantity,
                // (item?.discount_price
                //     ? item?.discount_price
                //     : item?.wholsale_price
                //   : item?.size_id?.discount_price
                //   ? item?.size_id?.discount_price
                //   : item?.size_id?.price) * item?.quantity
              ).format('$0,0.00')}

              {/* {numeral(item?.size_id?.price * item?.quantity).format('$0,0.00')} */}
            </CustomText>

            <View
              style={{
                marginRight: moderateScale(15, 0.3),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name={'add-circle-sharp'}
                as={Ionicons}
                color={Color.themeColor}
                size={moderateScale(25, 0.3)}
                onPress={() => {
                  dispatch(increamentQuantity(item?.id));
                }}
              />
              <CustomText
                isBold
                style={{
                  marginHorizontal: moderateScale(5, 0.3),
                  fontSize: moderateScale(12, 0.3),
                }}>
                {item?.quantity}
              </CustomText>
              <Icon
                name={'circle-with-minus'}
                as={Entypo}
                color={Color.themeColor}
                size={moderateScale(24, 0.3)}
                onPress={() => {
                  dispatch(decrementQuantity(item?.id));
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cardContainer: {
    minHeight: windowHeight * 0.2,
    width: windowWidth * 0.9,
    marginBottom: moderateScale(20, 0.3),
    borderBottomWidth: 1,
    borderColor: Color.veryLightGray,
    paddingBottom: moderateScale(10, 0.3),
  },
  name: {
    fontSize: moderateScale(20, 0.3),
    color: Color.black,
    marginLeft: moderateScale(5, 0.3),
    marginBottom: moderateScale(10, 0.3),
  },
  otherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  other1: {
    marginLeft: moderateScale(5, 0.3),
    flexWrap: 'wrap',
    width: windowWidth * 0.5,
    overflow: 'hidden',
  },
  text1: {
    fontSize: moderateScale(16, 0.3),
    color: Color.black,
    width: windowWidth * 0.45,
    textAlign: 'left',
  },
  text: {
    fontSize: moderateScale(13, 0.3),
    color: Color.black,
    width: windowWidth * 0.45,
    backgroundColor: 'red',
  },
  sizeBox: {
    paddingVertical: moderateScale(3, 0.3),
    paddingHorizontal: moderateScale(5, 0.3),
    borderRadius: moderateScale(5, 0.3),
    borderWidth: 1,
    borderColor: Color.themeLightGray,
    marginRight: moderateScale(5, 0.3),
  },
  colorBox: {
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    borderRadius: moderateScale(10, 0.3),
  },
  amount: {
    fontSize: moderateScale(18, 0.3),
    color: Color.themeColor,
  },
});
