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
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Components/CustomButton';
import Header from '../Components/Header';
import Feather from 'react-native-vector-icons/Feather';
import Color from '../Assets/Utilities/Color';
import PaymentModal from '../Components/PaymentModal';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useDispatch, useSelector} from 'react-redux';
import {AddToCart, EmptyCart} from '../Store/slices/common';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import navigationService from '../navigationService';

const FormScreen = () => {
  const navigation =useNavigation()
  const token = useSelector(state => state.authReducer.token);
  const cartData = useSelector(state => state.commonReducer.item);
  const userdata =useSelector(state => state.commonReducer.userData)
  console.log("🚀 ~ file: FormScreen.js:35 ~ FormScreen ~ userdata:", userdata)
 
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const calcTotal = () => {
    let total_quantity = 0;
    let total_price = 0;
    cartData?.map(item => {
      console.log('Item=============>>>>', item?.size_id?.price)
      total_quantity += item?.quantity;
      total_price += item?.size_id?.price * item?.quantity;
    });
    setTotalQuantity(total_quantity);
    setTotalPrice(total_price);
    console.log('Total quantity=====', total_quantity, total_price);
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
  // console.log('🚀 ~ file: FormScreen.js:56 ~ FormScreen ~ newData:', newData);

  // console.log('🚀 ~ file: FormScreen.js:28 ~ FormScreen ~ isModal:', isModal);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const PlaceOrder = async () => {
    calcTotal();
    cartData?.map(item => {
      return setnewData(prev => [
        ...prev,
        {
          id: item?.id,
          price: item?.size_id?.price,
          quantity: item?.quantity,
          size_id: item?.size_id?.id,
        },
      ]);
    });
    
   const url = 'auth/order';
  //  return  console.log("🚀 ~ file: FormScreen.js:82 ~ PlaceOrder ~ url:", url)
    const body = {
      first_name: name,
      last_name: lastName,
      email: email,
      phone: phone,
      country: country,
      address1: address,
      address2: address,
      post_code: postcode,
      payment_method:
        isChecked == 'Cash on delivery'
          ? 'cod'
          : isChecked == 'pay through stripe'
          ? 'stripe'
          : '',
      total_quantity: totalQuantity,
      total_amount: totalPrice,
      products: newData,
    };
   for(let key in body){
      if(body[key] == ''){
        return Platform.OS == 'android'
        ? ToastAndroid.show(`requried field is empty`,ToastAndroid.SHORT)
        :alert(`requried field is empty`)
    }
  }
    if(isChecked == ''){
      return Platform.OS == 'android'
      ? ToastAndroid.show(`Payment method not selected`,ToastAndroid.SHORT)
      :alert(`Payment method not selected`)
  
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
     console.log('dadafasrfafara' ,response?.data)
     setnewData([])
     console.log(
        '🚀 ~ file: FormScreen.js:53 ~ PlaceOrder ~ response:',
        response?.data,
      );

      dispatch(EmptyCart());
      navigationService.navigate('PaymentInvoice' ,{body:body})
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
        }}
        >
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
              // backgroundColor:'red'
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
                // flexDirection:'row'
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
                // flexDirection:'row'
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
        {/* {isChecked == 'pay through stripe' && (
          <TextInputWithTitle
            titleText={'Token'}
            placeholder={'Token'}
            setText={setStripeToken}
            value={stripeToken}
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
        )} */}
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
            PlaceOrder()
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

export default FormScreen;

const styles = StyleSheet.create({
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});
