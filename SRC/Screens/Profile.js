import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../Components/Header';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomStatusBar from '../Components/CustomStatusBar';

import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Color from '../Assets/Utilities/Color';

import CustomImage from '../Components/CustomImage';
import {Divider, Icon, ScrollView} from 'native-base';
import ImagePickerModal from '../Components/ImagePickerModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {RemoveFromCart, setUserData} from '../Store/slices/common';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ file: Profile.js:50 ~ Profile ~ userData:', userData);
  const [username, setUserName] = useState(
    userData?.name ? userData?.name : '',
  );
  const [address, setAddress] = useState(
    userData?.address ? userData?.address : '',
  );
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(userData?.email ? userData?.email : '');
  const [phone, setPhone] = useState(userData?.phone ? userData?.phone : '');
  const [postCode, setPostCode] = useState(
    userData?.postal_code ? userData?.postal_code : '',
  );
  const [country, setCountry] = useState(
    userData?.country ? userData?.country : '',
  );

  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});
  console.log('🚀 ~ file: Profile.js:60 ~ Profile ~ image:', image);

  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = async () => {
    const url = 'auth/profile/update';
    const body = {
      name: username,
      postal_code: postCode,
      country:country,
      address: address,
    };
    // console.log("🚀 ~ file: Profile.js:74 ~ updateProfile ~ body:", body)
    const formData = new FormData();
    if (Object.keys(image).length > 0) {
      formData.append('photo', image);
    } else {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`image is required`, ToastAndroid.SHORT)
        : Alert.alert(`image is required`);
    }
    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      } else {
        formData.append(key, body[key]);
      }
    }
    console.log(
      '🚀 ~ file: Profile.js:109 ~ updateProfile ~ formData:',
      formData,
    );

    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
   console.log("🚀 ~ file: Profile.js:98 ~ updateProfile ~ response:", response)
    setIsLoading(false);
    if (response != undefined) {
      console.log(
        '🚀 ~ file: Profile.js:113 ~ updateProfile ~ response:',
        response?.data,
      );

      dispatch(setUserData(response?.data?.user_info));
    }
  };

  return (
    <>
      <CustomStatusBar backgroundColor={'#D2E4E4'} barStyle={'dark-content'} />

      <View
        style={{
          width: windowWidth,
          height: windowHeight,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LinearGradient
          style={{
            width: windowWidth * 1,
            height: windowHeight * 0.35,
            // height: windowHeight * 0.9,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Color.themeColor,
          }}
          colors={Color.themeBgColor}>
          <Icon
            style={{position: 'absolute', left: 20, top: 20}}
            name={'menu'}
            as={Feather}
            size={moderateScale(25, 0.3)}
            color={Color.black}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
          <View
            style={{
              width: windowWidth * 0.3,
              //   height: windowHeight * 0.3,
              alignItems: 'center',
              //   backgroundColor:'orange',
            }}>
            <View style={styles.Profile1}>
              <CustomImage
                resizeMode={'cover'}
                source={
                  image?.uri
                    ? {uri: image?.uri}
                    : userData?.photo
                    ? {uri: userData?.photo}
                    : require('../Assets/Images/logo.png')
                }
                style={{width: '100%', height: '100%'}}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.edit}
              onPress={() => {
                setImagePicker(true);
              }}>
              <Icon
                name="pencil"
                as={FontAwesome}
                style={styles.icon2}
                color={Color.black}
                size={moderateScale(16, 0.3)}
                onPress={() => {
                  setImagePicker(true);
                }}
              />
            </TouchableOpacity>
            <CustomText style={styles.text1} isBold>
              {userData?.name}
            </CustomText>
          </View>
        </LinearGradient>
        <ScrollView
          style={{
            backgroundColor: Color.white,
            width: windowWidth,
            // backgroundColor: 'red',
            // minHeight: windowHeight,
            marginTop: moderateScale(-30, 0.3),
            borderTopLeftRadius: moderateScale(30, 0.3),
            borderTopRightRadius: moderateScale(30, 0.3),
          }}>
          <View
            style={{
              // backgroundColor: 'green',
              alignSelf: 'center',
              paddingVertical: moderateScale(20, 0.6),
            }}>
            <TextInputWithTitle
              title={'Username'}
              iconName={'user'}
              iconType={SimpleLineIcons}
              LeftIcon={true}
              titleText={'Username'}
              placeholder={'Username'}
              setText={setUserName}
              value={username}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.75}
              border={1}
              backgroundColor={Color.white}
              borderColor={Color.black}
              //   marginTop={moderateScale(5, 0.3)}
              // marginBottom={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
            />
            <TextInputWithTitle
              title={'Address'}
              iconName={'home'}
              iconType={SimpleLineIcons}
              LeftIcon={true}
              titleText={'Address'}
              placeholder={'Address'}
              setText={setAddress}
              value={address}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.75}
              border={1}
              backgroundColor={Color.white}
              borderColor={Color.black}
              //   marginTop={moderateScale(5, 0.3)}
              // marginBottom={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
            />

            <TextInputWithTitle
              title={'Email'}
              iconName={'email'}
              iconType={Fontisto}
              LeftIcon={true}
              titleText={'Email'}
              placeholder={'Email'}
              setText={setEmail}
              value={email}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.75}
              border={1}
              borderColor={Color.black}
              backgroundColor={Color.white}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
              disable={true}
            />

            <TextInputWithTitle
              title={'Contact'}
              iconName={'cellphone-sound'}
              iconType={MaterialCommunityIcons}
              LeftIcon={true}
              titleText={'Contact'}
              placeholder={'Contact'}
              setText={setPhone}
              value={phone}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.75}
              border={1}
              borderColor={Color.black}
              marginBottom={moderateScale(10, 0.3)}
              backgroundColor={Color.white}
              //   marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
              disable={true}
            />
            <TextInputWithTitle
              title={'postal Code'}
              iconName={'address'}
              iconType={Entypo}
              LeftIcon={true}
              titleText={'post Code'}
              placeholder={'postal Code'}
              setText={setPostCode}
              value={postCode}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.75}
              border={1}
              borderColor={Color.black}
              marginBottom={moderateScale(10, 0.3)}
              backgroundColor={Color.white}
              //   marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
              // disable={true}
            />
            <TextInputWithTitle
              title={'Country'}
              iconName={'globe'}
              iconType={Entypo}
              LeftIcon={true}
              titleText={'Country'}
              placeholder={'Country'}
              setText={setCountry}
              value={country}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.75}
              border={1}
              borderColor={Color.black}
              marginBottom={moderateScale(10, 0.3)}
              backgroundColor={Color.white}
              //   marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
              // disable={true}
            />

            <CustomButton
              isBold
              onPress={() => {
                updateProfile();
                // dispatch(RemoveFromCart(item));
              }}
              text={
                isLoading ? (
                  <ActivityIndicator color={Color.white} size={'small'} />
                ) : (
                  'Update'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.3}
              marginTop={10}
              marginBottom={10}
              height={windowHeight * 0.05}
              bgColor={Color.themeColor}
              fontSize={moderateScale(14, 0.6)}
              borderRadius={moderateScale(5, 0.3)}
            />
          </View>
          {/* </CardContainer> */}
        </ScrollView>
      </View>
      <ImagePickerModal
        show={imagePicker}
        setShow={setImagePicker}
        setFileObject={setImage}
      />
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Profile: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: (windowWidth * 0.1) / 1,
    borderWidth: 1,
    borderColor: Color.white,
    overflow: 'hidden',
  },
  Profile1: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderRadius: (windowWidth * 0.3) / 2,
    borderWidth: 2,
    borderColor: Color.white,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#EEEEEE',
    marginTop: moderateScale(20, 0.3),
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderColor : 'black'
  },
  Rounded: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.05,
    borderRadius: moderateScale(30, 0.3),
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  text1: {
    paddingVertical: moderateScale(10, 0.6),
    fontSize: moderateScale(18, 0.3),
    color: Color.black,
    // width: windowWidth * 0.45,
  },
  edit: {
    backgroundColor: Color.white,
    width: moderateScale(25, 0.3),
    height: moderateScale(25, 0.3),
    position: 'absolute',
    top: 110,
    right: 10,
    borderRadius: moderateScale(12.5, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
