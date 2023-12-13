import {
  FlatList,
  View,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
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
import {Toast} from 'native-base';
// import { selectedProductSize } from '../Store/slices/common';

const CheckOutScreen = ({route}) => {
  const selectedProductSize = useSelector(state => state.commonReducer.item);
  const cardData = useSelector(state => state.commonReducer.item);
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ file: CheckOutScreen.js:27 ~ CheckOutScreen ~ token:", token)
  const [finalAmount, setFinalAmount] = useState(0);
  const [productsForCard, setProdctsForCart] = useState([]);
  const subTotal = route?.params?.subTotal;

  useEffect(() => {
    if (cardData.length == 0) {
      navigationService.navigate('HomeScreen');
    }
  }, [cardData]);

  return (
    <>
      <CustomStatusBar backgroundColor={'#FDFDFD'} barStyle={'dark-content'} />
      <Header
        showLeft={true}
        leftName={'arrow-left'}
        leftType={Feather}
        title={'cart'}
        showRight={true}
        rightName={'shopping-bag'}
        rightType={Feather}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={cardData}
        style={{
          height: '90%',
          backgroundColor: 'white',
          width: windowWidth,
        }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: moderateScale(20, 0.3),
        }}
        renderItem={({item, index}) => {
          return <CartItem item={item} fromCheckout={true} />;
        }}
        ListFooterComponent={() => {
          return (
            <View>
              <CustomButton
                isBold
                onPress={() => {
                  const temp = cardData.some(
                    (item, index) => Object.keys(item?.size_id).length == 0,
                  );
                  console.log(
                    '🚀 ~ file: CheckOutScreen.js:65 ~ CheckOutScreen ~ temp:',
                    temp,
                  );
                  if (temp) {
                    Platform.OS == 'android'
                      ? ToastAndroid.show(
                          ' Please Select size',
                          ToastAndroid.SHORT,
                        )
                      : Alert.alert('Please Select size');
                  } else {
                    navigationService.navigate('FormScreen');
                  }
                }}
                text={'Proceed'}
                textColor={Color.white}
                width={windowWidth * 0.8}
                height={windowHeight * 0.07}
                fontSize={moderateScale(16, 0.6)}
                // marginBottom={moderateScale(10,.3)}
                // marginTop={moderateScale(20, 0.3)}
                bgColor={Color.themeBgColor}
                borderRadius={moderateScale(30, 0.3)}
                isGradient
              />
            </View>
          );
        }}
      />
    </>
  );
};

export default CheckOutScreen;

const styles = ScaledSheet.create({
  heading: {
    fontSize: moderateScale(20, 0.3),
    textAlign: 'left',
    width: windowWidth * 0.9,
    // backgroundColor : 'red'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.9,
    marginTop: moderateScale(10, 0.3),
    borderBottomWidth: 1,
    borderColor: Color.lightGrey,
    paddingBottom: moderateScale(10, 0.3),
  },
  subHeading: {
    fontSize: moderateScale(16, 0.3),
  },
  userTypeContainer: {
    // width: windowWidth * 0.7,
    // backgroundColor : Color.red,
    padding: moderateScale(10, 0.3),
    marginTop: moderateScale(10, 0.3),
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  innerContainer: {
    // width: '48%',
    // backgroundColor : 'green',
    // paddingVertical : moderateScale(5,0.3),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(5, 0.3),
  },
  circle: {
    height: moderateScale(13, 0.3),
    width: moderateScale(13, 0.3),
    borderRadius: moderateScale(6.5, 0.3),
    borderWidth: 1,
    backgroundColor: Color.white,
    borderColor: Color.green,
    marginLeft: moderateScale(15, 0.3),
  },
  txt2: {
    fontSize: moderateScale(12, 0.3),
  },
});
