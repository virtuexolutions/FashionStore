import {
  Alert,
  Platform,
  ToastAndroid,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useDispatch, useSelector} from 'react-redux';
import {validateEmail} from '../Config';
import {setUserData} from '../Store/slices/common';
import {setUserToken} from '../Store/slices/auth';

const Signup = () => {
  const token = useSelector(state => state.authReducer.token);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setpassword] = useState('');
  const [c_password, setc_password] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const dispatch = useDispatch();

  const register = async () => {
    const formData = new FormData()
    const url = 'register';
    const body = {
      name: name,
      email: email,
      password: password,
      c_password: c_password,
    };
    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show('All Fields are required', ToastAndroid.SHORT)
          : Alert.alert('All Fields are required');
      }else{
        formData.append(key, body[key])
      }
    }
    if (!validateEmail(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            'Please enter valid email address',
            ToastAndroid.SHORT,
          )
        : Alert.alert('Please enter valid email address');
    }
    if (password !== c_password) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Password donot match', ToastAndroid.SHORT)
        : Alert.alert('Password donot match');
    }
    setisLoading(true);
    const response = await Post(url, body, apiHeader());
    setisLoading(false);

    if (response != undefined) {
      console.log(
        '🚀 ~ file: Signup.js:66 ~ register ~ response:',
        response?.data,
      );
      dispatch(setUserData(response?.data?.data?.use_info));
      dispatch(setUserToken({token: response?.data?.data?.token}));
    }
  };

  return (
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
        paddingTop: windowHeight * 0.1,
        backgroundColor: '#FEFDFC',
      }}>
      <CustomText />
      <View
        style={{
          width: windowWidth * 0.7,
          height: windowHeight * 0.2,
          alignItems: 'center',
        }}>
        <CustomImage
          source={require('../Assets/Images/logo.png')}
          resizeMode={'contain'}
          style={{
            height: '100%',
          }}
        />
      </View>

      <CustomText
        style={{
          fontSize: moderateScale(18, 0.6),
          marginTop: moderateScale(0, 0.3),
          marginBottom: moderateScale(17, 0.3),
        }}
        isBold>
        Sign Up
      </CustomText>
      <TextInputWithTitle
        iconName="person-outline"
        iconType={Ionicons}
        rightIcon
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
        marginBottom={moderateScale(30, 0.3)}
        color={'#ABB1C0'}
        placeholderColor={'#ABB1C0'}
        borderRadius={moderateScale(20, 0.6)}
      />
      <TextInputWithTitle
        iconName="envelope-o"
        iconType={FontAwesome}
        rightIcon
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
        marginBottom={moderateScale(30, 0.3)}
        color={'#ABB1C0'}
        placeholderColor={'#ABB1C0'}
        borderRadius={moderateScale(20, 0.6)}
      />
      <TextInputWithTitle
        secureText={true}
        titleText={'Your Password'}
        placeholder={'Your Password'}
        setText={setpassword}
        marginBottom={moderateScale(30, 0.3)}
        value={password}
        viewHeight={0.06}
        viewWidth={0.8}
        inputWidth={0.7}
        border={1}
        borderColor={'#0F02022E'}
        backgroundColor={'white'}
        color={'#ABB1C0'}
        placeholderColor={'#ABB1C0'}
        borderRadius={moderateScale(20, 0.6)}
      />
      <TextInputWithTitle
        secureText={true}
        titleText={'Confirm Password'}
        placeholder={'Confirm Password'}
        setText={setc_password}
        marginBottom={moderateScale(30, 0.3)}
        value={c_password}
        viewHeight={0.06}
        viewWidth={0.8}
        inputWidth={0.7}
        border={1}
        borderColor={'#0F02022E'}
        backgroundColor={'white'}
        color={'#ABB1C0'}
        placeholderColor={'#ABB1C0'}
        borderRadius={moderateScale(20, 0.6)}
      />

      <CustomButton
        text={
          isLoading ? (
            <ActivityIndicator size={'small'} color={Color.white} />
          ) : (
            'Sign Up'
          )
        }
        textColor={Color.white}
        width={windowWidth * 0.8}
        height={windowHeight * 0.07}
        fontSize={moderateScale(16, 0.6)}
        bgColor={Color.themeBgColor}
        borderRadius={moderateScale(30, 0.3)}
        onPress={() => {
          register();
        }}
        isGradient
      />
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});
