import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import {Icon, ScrollView} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../Components/CustomButton';

import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {useIsFocused} from '@react-navigation/native';
import Color from '../Assets/Utilities/Color';
import {useDispatch, useSelector} from 'react-redux';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {
  AddToCart,
  decrementQuantity,
  increamentQuantity,
  selectedProductSize,
} from '../Store/slices/common';

const DressesDetail = props => {
  const focused = useIsFocused();
  const item = props.route.params.item;
  const cartData = useSelector(state => state.commonReducer.item);
  console.log(
    '🚀 ~ file: DressesDetail.js:32 ~ DressesDetail ~ cartData:',
    cartData,
  );

  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState('');
  console.log(
    '🚀 ~ file: DressesDetail.js:56 ~ DressesDetail ~ selectedSize:',
    selectedSize,
  );
  const [selectedItem, setSelectedItem] = useState({});
  const cardData = useSelector(state => state.commonReducer.item);
  const [sizeArray, setSizeArray] = useState(
    item?.varation?.map(item => item?.size),
  );
  const [like, setLike] = useState(item?.like);
  const [index, setIndex] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [cotton, setcotton] = useState(1);
  const images = [
    require('../Assets/Images/image3.png'),
    require('../Assets/Images/Mask2.png'),
    require('../Assets/Images/image3.png'),
    require('../Assets/Images/Mask2.png'),
    require('../Assets/Images/Mask.png'),
  ];

  const [finalItem, setFinalItem] = useState(item);

  useEffect(() => {
    setSelectedItem(item?.varation?.find(item => item?.size == selectedSize));
    if (selectedSize != '') {
      dispatch(
        selectedProductSize({
          id: item?.id,
          item: item?.varation?.find(data => data?.size == selectedSize),
        }),
      );
    }
  }, [selectedSize]);

  useEffect(() => {
    if (cartData?.some(data => data?.id == item?.id)) {
      setSelectedSize(
        Object.keys(cartData?.find(data => data?.id == item?.id)?.size_id)
          .length > 0
          ? cartData?.find(data => data?.id == item?.id)?.size_id?.size
          : '',
      );

      setSelectedItem(
        Object.keys(cartData?.find(data => data?.id == item?.id)?.size_id)
          .length > 0
          ? cartData?.find(data => data?.id == item?.id)?.size_id
          : {},
      );
    }
  }, [focused]);

  return (
    <>
      <CustomStatusBar backgroundColor={'#FDFDFD'} barStyle={'dark-content'} />
      <Header
        showLeft={true}
        leftName={'arrow-left'}
        leftType={Feather}
        title={'Item Details'}
        showRight={true}
        rightName={'shopping-bag'}
        rightType={Feather}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          paddingBottom: moderateScale(60, 0.6),
        }}>
        <View style={styles.banner}>
          <View style={styles.container}>
            {index > 0 && images.length > 1 && (
              <>
                <View
                  style={{
                    width: windowWidth * 0.6,
                    height: windowHeight * 0.28,
                    alignItems: 'center',
                    overflow: 'hidden',
                    alignSelf: 'center',
                    left: -170,
                    position: 'absolute',
                    backgroundColor: 'black',
                  }}>
                  <CustomImage
                    source={images[index - 1]}
                    style={{
                      height: '100%',
                      height: '100%',
                    }}
                    resizeMode={'cover'}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setIndex(index - 1);
                  }}
                  style={{
                    height: moderateScale(25, 0.6),
                    width: moderateScale(25, 0.6),
                    borderRadius: moderateScale(25, 0.6) / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    left: -5,
                    backgroundColor: Color.themeColor,
                  }}>
                  <Icon name={'left'} as={AntDesign} color={'white'} />
                </TouchableOpacity>
              </>
            )}

            <View
              style={{
                width: windowWidth * 0.6,
                height: windowHeight * 0.3,
                // alignItems: 'center',
                overflow: 'hidden',
                alignSelf: 'center',
                backgroundColor: 'black',
              }}>
              <CustomImage
                source={images.length == 1 ? images[index - 1] : images[index]}
                style={{
                  height: '100%',
                  height: '100%',
                }}
              />
            </View>
            {index < images.length - 1 && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setIndex(index + 1);
                  }}
                  style={{
                    height: moderateScale(25, 0.6),
                    width: moderateScale(25, 0.6),
                    borderRadius: moderateScale(25, 0.6) / 2,
                    alignItems: 'center',
                    zIndex: 1,
                    justifyContent: 'center',
                    right: -5,
                    backgroundColor: Color.themeColor,
                  }}>
                  <Icon name={'right'} as={AntDesign} color={'white'} />
                </TouchableOpacity>

                <View
                  style={{
                    width: windowWidth * 0.6,
                    height: windowHeight * 0.28,
                    alignItems: 'center',
                    overflow: 'hidden',
                    alignSelf: 'center',
                    right: -170,
                    position: 'absolute',
                    backgroundColor: 'black',
                  }}>
                  <CustomImage
                    source={images[index + 1]}
                    style={{
                      height: '100%',
                      height: '100%',
                    }}
                  />
                </View>
              </>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: windowWidth * 0.95,
              alignItems: 'center',
              paddingHorizontal: moderateScale(10, 0.6),
              paddingVertical: moderateScale(10, 0.6),
            }}>
            <CustomText
              isBold
              style={{
                color: '#252E2B',
                fontSize: moderateScale(18, 0.6),
                width: windowWidth * 0.6,
                textAlign: 'left',
                // backgroundColor:'orange',
              }}>
              {finalItem?.title}
            </CustomText>

            {/* <CustomText
              style={{
                color: '#818181',
                width: windowWidth * 0.38,
                fontSize: moderateScale(14, 0.6),
                textAlign: 'left',
                // backgroundColor:'red',
              }}
              numberOfLines={1}>
              {finalItem?.category}
            </CustomText> */}

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setLike(!like);
              }}>
              {like ? (
                <Icon
                  name={'heart'}
                  as={Entypo}
                  size={moderateScale(25, 0.3)}
                  color={'#E50808'}
                />
              ) : (
                <Icon
                  name={'heart-outlined'}
                  as={Entypo}
                  size={moderateScale(25, 0.3)}
                  color={'black'}
                />
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(10, 0.6),
              alignItems: 'center',
              width: windowWidth * 0.95,
            }}>
            <CustomText
              isBold
              style={{
                textAlign: 'left',
                color: Color.themeColor,
                fontSize: 24,
                width: windowWidth * 0.24,
              }}>
              $
              {selectedItem && Object.keys(selectedItem).length > 0
                ? selectedItem?.price
                : item?.wholsale_price}
            </CustomText>

            <View style={styles.conterContainer}>
              <TouchableOpacity
                onPress={() => {
                  if (quantity < item?.stock) {
                    dispatch(increamentQuantity(item?.id));
                    setQuantity(quantity + 1);
                  } else {
                    Platform.OS == 'android'
                      ? ToastAndroid.show(
                          'Sorry! You can not add more',
                          ToastAndroid.SHORT,
                        )
                      : Alert.alert('Sorry! You can not add more');
                  }
                }}
                style={styles.icon}>
                <CustomText
                  isBold
                  style={{
                    color: '#ffffff',
                    fontSize: moderateScale(13, 0.6),
                  }}>
                  +
                </CustomText>
              </TouchableOpacity>

              <CustomText
                isBold
                style={{
                  color: '#1B1721',
                  fontSize: moderateScale(14, 0.6),
                }}>
                {quantity}
              </CustomText>

              <TouchableOpacity
                onPress={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                    dispatch(decrementQuantity(item?.id));
                  }
                }}
                style={styles.icon}>
                <CustomText
                  isBold
                  style={{
                    color: '#ffffff',
                    fontSize: moderateScale(13, 0.6),
                  }}>
                  -
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>

          {/* <CustomText
            isBold
            style={{
              color: '#201E1D',
              fontSize: moderateScale(14, 0.6),
              width: windowWidth * 0.17,
              backgroundColor:'red',
              width:windowWidth*0.95,
              textAlign:'left',
              paddingHorizontal:moderateScale(10,.6),
              paddingVertical:moderateScale(5,.6),
            }}>
            Color
          </CustomText> */}

          {/* <View style={styles.ColorLine}>
            {item?.colors?.map(color => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    SetSelectedColor(color);
                  }}
                  style={[styles.colorContainer, {backgroundColor: color}]}>
                  {Selectedcolor == color && (
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
          </View> */}

          <CustomText
            isBold
            style={{
              color: '#201E1D',
              fontSize: moderateScale(14, 0.6),
              width: windowWidth * 0.17,
              // backgroundColor:'red',
              width: windowWidth * 0.95,
              textAlign: 'left',
              paddingHorizontal: moderateScale(10, 0.6),
              paddingTop: moderateScale(10, 0.6),
            }}>
            Size
          </CustomText>

          <DropDownSingleSelect
            placeholder={selectedSize ? selectedSize : 'Please select size'}
            array={sizeArray}
            item={selectedSize}
            setItem={setSelectedSize}
            width={windowWidth * 0.9}
            dropDownHeight={windowHeight * 0.06}
            dropdownStyle={{
              width: windowWidth * 0.9,
              borderBottomWidth: 0,
            }}
          />
          <CustomText
            isBold
            style={{
              color: '#201E1D',
              fontSize: moderateScale(14, 0.6),
              width: windowWidth * 0.17,
              // backgroundColor:'red',
              width: windowWidth * 0.95,
              textAlign: 'left',
              paddingHorizontal: moderateScale(10, 0.6),
              paddingTop: moderateScale(10, 0.6),
            }}>
            Description
          </CustomText>
          <CustomText
            style={{
              color: '#201E1D',
              fontSize: moderateScale(13, 0.6),
              width: windowWidth * 0.95,
              textAlign: 'left',
              paddingHorizontal: moderateScale(10, 0.6),
              paddingVertical: moderateScale(10, 0.6),
            }}>
            {item?.description}
          </CustomText>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <CustomButton
          disabled={
            cardData.find((data, index) => data?.id == item?.id) && true
          }
          isBold
          onPress={() => {
            dispatch(
              AddToCart({...item, quantity: quantity, size_id: selectedItem}),
            );
          }}
          text={
            cardData.find((data, index) => data?.id == item?.id)
              ? 'Added'
              : 'ADD TO CART'
          }
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          fontSize={moderateScale(16, 0.6)}
          bgColor={Color.themeBgColor}
          borderRadius={moderateScale(30, 0.3)}
          isGradient
        />
      </View>
    </>
  );
};

export default DressesDetail;

const styles = StyleSheet.create({
  size: {
    height: windowHeight * 0.04,
    width: windowWidth * 0.08,
    borderRadius: (windowWidth * 0.1) / 2,
    justifyContent: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    width: windowWidth,
    height: windowHeight * 0.1,
    backgroundColor: '#FFFFFF',
    //  alignItems:'center',
    bottom: 0,
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    height: windowHeight * 0.3,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  colorContainer: {
    height: windowHeight * 0.04,
    width: windowWidth * 0.08,
    borderRadius: (windowWidth * 0.1) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(15, 0.3),
  },
  icon: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    borderRadius: (windowWidth * 0.06) / 2,
    backgroundColor: Color.themeColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: moderateScale(5, 0.3),
  },
  banner: {
    width: windowWidth * 0.95,
    // height: windowHeight * 0.77,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: moderateScale(10, 0.3),
    shadowColor: '#0000000A',
    shadowOffset: {width: 0, height: 2},
    justifyContent: 'center',
    alignItems: 'center',
  },

  conterContainer: {
    paddingVertical: moderateScale(5, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  ColorLine: {
    flexDirection: 'row',
    marginTop: moderateScale(15, 0.3),
    marginBottom: moderateScale(15, 0.3),
  },

  ColorLine1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: windowWidth * 0.7,
    marginTop: moderateScale(15, 0.3),
    marginBottom: moderateScale(15, 0.3),
  },

  bottomBanner: {
    width: windowWidth,
    height: windowHeight * 0.13,
    position: 'absolute',
    bottom: moderateScale(0, 0.3),
    backgroundColor: '#fff',
    elevation: 1,
  },
});
