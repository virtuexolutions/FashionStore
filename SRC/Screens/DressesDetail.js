import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../Components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {
  AddToCart,
  decrementQuantity,
  increamentQuantity,
} from '../Store/slices/common';

const DressesDetail = props => {
  const dispatch = useDispatch();

  const [Selectedcolor, SetSelectedColor] = useState('');
  const [Selectedsize, SetSelectedSize] = useState('');
  const item = props.route.params.item;

  const addData = useSelector(state => state.commonReducer.cart);

const [count, setCount] = useState(0)
const [count1, setCount1] = useState(0)

   console.log('QTYNEW',count)


  const addedItem = item => {
    dispatch(AddToCart(item));
  };  

  






  return (
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
      }}>
      <View style={styles.banner}>
        <View
          style={{
            width: windowWidth * 1,
            height: windowHeight * 0.3,
            alignItems: 'center',
          }}>
          <CustomImage
            source={item.img}
            style={{
              height: '100%',
              height: '100%',
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            padding: moderateScale(10, 0.6),
            alignItems: 'center',
          }}>
          <CustomText
            isBold
            style={{
              color: '#252E2B',
              fontSize: 20,
              width: windowWidth * 0.4,
              textAlign: 'left',
            }}>
            {item.Title}
          </CustomText>

          <CustomText
            style={{
              color: '#818181',
              width: windowWidth * 0.38,
              textAlign: 'left',
            }}>
            {item.subTitle}
          </CustomText>

          <TouchableOpacity activeOpacity={0.6} style={styles.heartIcon}>
            <Icon
              name={'heart'}
              as={Entypo}
              size={moderateScale(25, 0.3)}
              color={'#E50808'}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: moderateScale(5, 0.6),
            alignItems: 'center',
          }}>
          <CustomText
            isBold
            style={{
              color: '#FF6E2E',
              fontSize: 24,
              width: windowWidth * 0.24,
            }}>
            ${item.price}.00
          </CustomText>

          <View style={styles.conterContainer}>
            <TouchableOpacity
              onPress={() => {
                // dispatch(increamentQuantity(item));
                setCount(count+1)
              }}
              style={{
                width: windowWidth * 0.06,
                height: windowHeight * 0.03,
                borderRadius: (windowWidth * 0.06) / 2,
                backgroundColor: '#E56A36',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomText
                isBold
                style={{
                  color: '#ffffff',
                  fontSize: 13,
                }}>
                +
              </CustomText>
            </TouchableOpacity>

            <CustomText
              isBold
              style={{
                color: '#000',
                fontSize: 14,
              }}>
              {count}
            </CustomText>

            <TouchableOpacity
              onPress={() => {
                // dispatch(increamentQuantity(item));
                setCount(count-1)
              }}
              style={{
                width: windowWidth * 0.06,
                height: windowHeight * 0.03,
                borderRadius: (windowWidth * 0.06) / 2,
                backgroundColor: '#E56A36',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomText
                isBold
                style={{
                  color: '#ffffff',
                  fontSize: 13,
                }}>
                -
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>

        <CustomText
          isBold
          style={{
            color: '#201E1D',
            fontSize: 14,
            width: windowWidth * 0.17,
          }}>
          Color
        </CustomText>

        <View style={styles.ColorLine}>
          {item?.colors?.map(item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  SetSelectedColor(item);
                }}
                style={{
                  height: windowHeight * 0.04,
                  width: windowWidth * 0.08,
                  borderRadius: (windowWidth * 0.1) / 2,
                  backgroundColor: item,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {Selectedcolor == item && (
                  <Icon
                    name={'check'}
                    as={Entypo}
                    size={moderateScale(17, 0.3)}
                    color={'#fff'}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <CustomText
          isBold
          style={{
            fontSize: 14,
            color: '#201E1D',
            width: windowWidth * 0.17,
          }}>
          Size
        </CustomText>

        <View style={styles.ColorLine1}>
          {item?.size?.map(item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  SetSelectedSize(item);
                }}
                style={{
                  height: windowWidth * 0.08,
                  width: windowWidth * 0.08,
                  borderRadius: (windowWidth * 0.8) / 2,
                  justifyContent: 'center',
                  backgroundColor: Selectedsize == item ? '#E56A36' : "#F4F5F6",
                }}>
                <CustomText
                  style={{
                    color:Selectedsize == item ? '#fff' : "#8E9194",
                  }}>
                  {item}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>

        <CustomText
          style={{
            fontSize: 12,
            color: '#8e9194',
            width: windowWidth * 0.28,
          }}>
          Composition
        </CustomText>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: moderateScale(5, 0.6),
            alignItems: 'center',
          }}>
          <CustomText
            isBold
            style={{
              color: '#2F2B29',
              fontSize: 16,
              width: windowWidth * 0.36,
            }}>
            Organic Cotton
          </CustomText>

          <View style={styles.conterContainer}>
            <TouchableOpacity
              onPress={()=>{setCount1(count1+1)}}
              style={{
                width: windowWidth * 0.06,
                height: windowHeight * 0.03,
                borderRadius: (windowWidth * 0.06) / 3,
                backgroundColor: '#f2f2f2',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomText
                isBold
                style={{
                  color: '#000',
                  fontSize: 13,
                }}>
                +
              </CustomText>
            </TouchableOpacity>

            <CustomText
              isBold
              style={{
                color: '#2F2B29',
                fontSize: 18,
              }}>
              {count1}
            </CustomText>

            <TouchableOpacity
            onPress={()=>{setCount1(count1-1)}}
              style={{
                width: windowWidth * 0.06,
                height: windowHeight * 0.03,
                borderRadius: (windowWidth * 0.06) / 3,
                backgroundColor: '#f2f2f2',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomText
                isBold
                style={{
                  color: '#000',
                  fontSize: 13,
                }}>
                -
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottomBanner}>
        <CustomButton
          isBold
          onPress={() => addedItem(item)}
          text={'ADD TO CART'}
          textColor={Color.white}
          width={windowWidth * 0.93}
          height={windowHeight * 0.06}
          marginTop={moderateScale(10, 0.3)}
          bgColor={'#FF6E2E'}
          borderRadius={moderateScale(30, 0.3)}
        />
      </View>
    </View>
  );
};

export default DressesDetail;

const styles = StyleSheet.create({
  banner: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.8,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: moderateScale(40, 0.3),
    shadowColor: '#0000000A',
    shadowOffset: {width: 0, height: 2},
  },

  conterContainer: {
    width: windowWidth * 0.27,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: moderateScale(10, 0.6),
  },

  ColorLine: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: windowWidth * 0.8,
    marginTop: moderateScale(25, 0.3),
    marginBottom: moderateScale(25, 0.3),
  },

  ColorLine1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: windowWidth * 0.7,
    marginTop: moderateScale(25, 0.3),
    marginBottom: moderateScale(25, 0.3),
  },

  bottomBanner: {
    width: windowWidth,
    height: windowHeight * 0.13,
    position: 'absolute',
    bottom: moderateScale(0, 0.3),
    backgroundColor: '#fff',
    elevation: 1,
  },

  heartIcon: {
    paddingRight: 10,
  },
});
