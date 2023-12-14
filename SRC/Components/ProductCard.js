import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import Entypo from 'react-native-vector-icons/Entypo';
import {Icon} from 'native-base';
import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from './CustomButton';
import Color from '../Assets/Utilities/Color';
import numeral from 'numeral';
import {AddToCart, RemoveFromCart} from '../Store/slices/common';
import {baseUrl, imageUrl} from '../Config';

const ProductCard = ({item}) => {
  // console.log(
  //   '🚀 ~ file: ProductCard.js:24 ~ ProductCard ~ item:',
  //   `${imageUrl}${item?.size ? item?.varation[0]?.image + '/' : item?.large_image}`,
  // );
  const cardData = useSelector(state => state.commonReducer.item);
  const dispatch = useDispatch();
  const [like, setLike] = useState(item?.like);

  return (
    <View>
      <TouchableOpacity
        onLongPress={() => {
          setLike(!like);
        }}
        activeOpacity={0.8}
        onPress={() => {
          if (cardData.find((data, index) => data?.id == item?.id)) {
            Platform.OS == 'android'
              ? ToastAndroid.show('item already added', ToastAndroid.SHORT)
              : Alert.alert('item already added');
          } else {
            dispatch(AddToCart({...item, quantity: 1, size_id: {}}));
          }
        }}
        style={{
          width: windowWidth * 0.45,
          height: windowHeight * 0.35,
          backgroundColor: '#fff',
          margin: moderateScale(5, 0.3),
          borderRadius: 5,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <TouchableOpacity
          onLongPress={() => {
            setLike(!like);
          }}
          onPress={() => {}}
          activeOpacity={0.8}
          style={{
            width: windowWidth * 0.35,
            height: windowHeight * 0.22,
            overflow: 'hidden',
            borderRadius: 5,
            marginTop: moderateScale(15, 0.3),
          }}>
          {like && (
            <Icon
              name={'heart'}
              as={Entypo}
              size={moderateScale(25, 0.3)}
              color={'#ff0000'}
              style={{
                position: 'absolute',
                zIndex: 1,
              }}
            />
          )}
          <CustomImage
            onLongPress={() => {
              setLike(!like);
            }}
            onPress={() => {
              dispatch(AddToCart({...item, quantity: 1, size_id: {}}));
            }}
            source={
              item?.large_image
                ? {uri: `${imageUrl}${item?.large_image}`}
                : require('../Assets/Images/Mask2.png')
            }
            resizeMode={'cover'}
            style={{
              height: '100%',
              height: '100%',
            }}
          />

          {item?.discount_price && (
            <View style={styles.sale}>
              <CustomText
                isBold
                style={{
                  color: 'black',
                  fontSize: 12,
                  backgroundColor: 'red',
                }}>
                {numeral(
                  1 - parseFloat(item?.discount_price / item?.wholsale_price),
                ).format('0.%')}{' '}
                OFF
              </CustomText>
            </View>
          )}
        </TouchableOpacity>

        <CustomText
          isBold
          numberOfLines={2}
          style={{
            textAlign: 'left',
            width: windowWidth * 0.35,
            color: '#464342',
          }}>
          {item?.title}
        </CustomText>

        <CustomText
          style={{
            textAlign: 'left',
            width: windowWidth * 0.35,
            // height: windowHeight * 0.03,
            color: '#a2a2a2',
          }}>
          {item?.recommended_use}
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginLeft: moderateScale(20, 0.3),
          }}>
          <CustomText
            style={{
              textAlign: 'left',
              // width: windowWidth * 0.35,
              fontSize: moderateScale(16, 0.6),
              color: Color.themeColor,
              marginRight: moderateScale(5, 0.3),
            }}>
            {numeral(
              item?.discount_price
                ? item?.discount_price
                : item?.wholsale_price,
            ).format('$0,0a')}
          </CustomText>
          <Text style={{}}></Text>

          {item?.discount_price && (
            <CustomText
              style={{
                textAlign: 'left',
                // width: windowWidth * 0.35,
                fontSize: moderateScale(14, 0.6),
                color: Color.veryLightGray,
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
                // textDecorationColor:'black'
              }}
              isBold>
              {numeral(item?.wholsale_price).format('$0,0a')}
            </CustomText>
          )}
        </View>

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

      {cardData.find((data, index) => data?.id == item?.id) && (
        <CustomButton
          isBold
          onPress={() => {
            dispatch(RemoveFromCart(item));
          }}
          text={'Remove Cart'}
          textColor={Color.white}
          width={windowWidth * 0.28}
          marginTop={10}
          marginBottom={10}
          height={windowHeight * 0.04}
          bgColor={Color.themeColor}
          fontSize={14}
          borderRadius={moderateScale(5, 0.3)}
        />
      )}
    </View>
  );
};

export default ProductCard;

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
    padding: moderateScale(7, 0.6),
    backgroundColor: 'red',
    borderRadius: moderateScale(10, 0.6),
  },
});
