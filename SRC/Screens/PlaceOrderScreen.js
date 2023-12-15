import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import Header from '../Components/Header';
import Feather from 'react-native-vector-icons/Feather';
import Color from '../Assets/Utilities/Color';
import PaymentModal from '../Components/PaymentModal';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useDispatch, useSelector} from 'react-redux';
import {AddToCart, EmptyCart} from '../Store/slices/common';
import {useNavigation} from '@react-navigation/native';
import navigationService from '../navigationService';
import CustomButton from '../Components/CustomButton';

const PlaceOrderScreen = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const cartData = useSelector(state => state.commonReducer.item);
  const userdata = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ file: FormScreen.js:35 ~ FormScreen ~ userdata:', userdata);

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [afterDiscount, setAfterDiscount] = useState(0);

  const calcTotal = (totalQ, total, discount) => {
    cartData?.map(item => {
      totalQ += item?.quantity;

      total +=
        (item?.size ? item?.size_id?.price : item?.wholsale_price) *
        item?.quantity;

      discount +=
        (item?.size
          ? item?.size_id?.discount_price
            ? item?.size_id?.discount_price
            : item?.size_id?.price
          : item?.discount_price
          ? item?.discount_price
          : item?.wholsale_price) * item?.quantity;
    });
    // setTotalQuantity(total_quantity);
    // setTotalPrice(total_price);
    // setAfterDiscount(afterDiscount);
    console.log(
      'final calculations======',
      totalQ,
      total,
      discount,
    );
    return {totalQ, total, discount}
  };

  const [name, setName] = useState(userdata?.name);
  const [lastName, setLastName] = useState(userdata?.name);
  const [email, setEmail] = useState(userdata?.email);
  const [phone, setPhone] = useState(userdata?.contact);
  console.log("🚀 ~ file: FormScreen.js:57 ~ FormScreen ~ phone:", phone)
  const [country, setCountry] = useState(userdata?.country);
  const [address, setAddress] = useState(userdata?.address);
  const [postcode, setPostCode] = useState(userdata?.postal_code);
  const [stripeToken, setStripeToken] = useState('');
  const [isChecked, setIsChecked] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [newData, setnewData] = useState([]);
  const array = [1, 2, 3, 4];

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const PlaceOrder = async () => {
    let totalQ = 0;
    let total = 0;
    let discount = 0;
    const result = calcTotal(totalQ, total, discount);
    const url = 'auth/order';
    const body = {
      first_name: name,
      last_name: lastName,
      email: email,
      phone: phone,
      country: country,
      address1: address,
      address2: address,
      post_code: postcode,
      // stripeToken : isChecked == 'pay through stripe'
      // && stripeToken ,
      payment_method:
        isChecked == 'Cash on delivery'
          ? 'cod'
          : isChecked == 'pay through stripe'
          ? 'stripe'
          : '',
      total_quantity: result?.totalQ,
      total_amount: result?.total,
      discount_amount: result?.discount, 
      products: cartData?.map(item => {
        return {
          id: item?.id,
          price: item?.size
            ? item?.size_id?.discount_price
              ? item?.size_id?.discount_price
              : item?.size_id?.price
            : item?.discount_price
            ? item?.discount_price
            : item?.wholsale_price,
          quantity: item?.quantity,
          size_id: item?.size ? item?.size_id?.id : item?.id,
        };
      }),
    };
    if(isChecked == 'pay through stripe'  ){
      if(stripeToken == '') {
        alert('Please enter your card details');
      }
      else{

        body.stripeToken = stripeToken
      }
    }
    
    console.log(
      '🚀 ~ file: PlaceOrderScreen.js:100 ~ PlaceOrder ~ body:',
      body,
    );

    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is empty`, ToastAndroid.SHORT)
          : alert(`requried field is empty`);
      }
    }

    if (isNaN(postcode)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            `Please insert a correct post code`,
            ToastAndroid.SHORT,
          )
        : alert(`Please insert a correct post code`);
    }

    if (isNaN(phone)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            `Please insert a correct phone number`,
            ToastAndroid.SHORT,
          )
        : alert(`Please insert a correct phone number`);
    }

    if (isChecked == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`Payment method not selected`, ToastAndroid.SHORT)
        : alert(`Payment method not selected`);
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      console.log('dadafasrfafara', response?.data);
      navigationService.navigate('PaymentInvoice',{body:response?.data?.order_info})
      // dispatch(EmptyCart());
    }
  };

  return (
    <>
      <Header
        showLeft={true}
        leftName={'arrow-left'}
        leftType={Feather}
        title={'checkout'}
      />

      <ScrollView
        style={{
          backgroundColor: '#FEFDFC',
        }}
        contentContainerStyle={{
          alignItems: 'center',
          minHeight: windowHeight,
        }}>
        <CustomText />
        <TextInputWithTitle
          titleText={'Your name'}
          placeholder={'Your name'}
          setText={setName}
          value={name}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginBottom={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />
        <TextInputWithTitle
          titleText={'Last name'}
          placeholder={'Last name'}
          setText={setLastName}
          value={lastName}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginBottom={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />
        <TextInputWithTitle
          titleText={'Your email address'}
          placeholder={'Your email address '}
          setText={setEmail}
          value={email}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginBottom={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />
        <TextInputWithTitle
          titleText={'Phone'}
          placeholder={'Phone'}
          setText={setPhone}
          value={phone}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginBottom={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
          keyboardType={'numeric'}
        />
        <TextInputWithTitle
          titleText={'Country'}
          placeholder={'Country'}
          setText={setCountry}
          value={country}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginBottom={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />
        <TextInputWithTitle
          titleText={'Address'}
          placeholder={'Address'}
          setText={setAddress}
          value={address}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginBottom={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />
        <TextInputWithTitle
          keyboardType={'numeric'}
          titleText={'Post code'}
          placeholder={'Post code'}
          setText={setPostCode}
          value={postcode}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginBottom={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // backgroundColor:'yellow',
            width: windowWidth * 0.75,
            paddingBottom: moderateScale(15, 0.3),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setIsChecked('Cash on delivery');
              }}
              style={{
                width: windowHeight * 0.015,
                backgroundColor:
                  isChecked == 'Cash on delivery'
                    ? Color.themeColor
                    : Color.mediumGray,
                height: windowHeight * 0.015,
                borderRadius: (windowHeight * 0.015) / 2,
                borderColor: Color.mediumGray,
                borderWidth: 2,
              }}></TouchableOpacity>
            <CustomText
              onPress={() => {
                setIsChecked('Cash on delivery');
              }}
              style={[{marginLeft: moderateScale(5, 0.3)}, styles.labelText]}>
              Cash on delivery
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setIsModal(true);
                setIsChecked('pay through stripe');
              }}
              style={{
                width: windowHeight * 0.015,
                backgroundColor:
                  isChecked == 'pay through stripe'
                    ? Color.themeColor
                    : Color.mediumGray,
                height: windowHeight * 0.015,
                borderRadius: (windowHeight * 0.015) / 2,
                borderColor: Color.mediumGray,
                borderWidth: 2,
              }}></TouchableOpacity>
            <CustomText
              onPress={() => {
                setIsModal(true);
                setIsChecked('pay through stripe');
              }}
              style={[{marginLeft: moderateScale(5, 0.3)}, styles.labelText]}>
              pay through stripe
            </CustomText>
          </View>
        </View>
        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator size={'small'} color={Color.white} />
            ) : (
              'Place order'
            )
          }
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          fontSize={moderateScale(16, 0.6)}
          bgColor={Color.themeBgColor}
          borderRadius={moderateScale(30, 0.3)}
          onPress={() => {
            PlaceOrder();
          }}
          isGradient
        />
        <PaymentModal
          isModal={isModal}
          setIsModal={setIsModal}
          setToken={setStripeToken}
        />
      </ScrollView>
    </>
  );
};

export default PlaceOrderScreen;

const styles = StyleSheet.create({
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});
