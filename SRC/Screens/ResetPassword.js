import {StyleSheet, Text, View, ToastAndroid, Platform, Alert, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import navigationService from '../navigationService';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomStatusBar from '../Components/CustomStatusBar';
import { Post } from '../Axios/AxiosInterceptorFunction';

const ResetPassword = (props) => {
  const email = props?.route?.params?.email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const reset = async () => {
 
    const url = 'password/reset';
    const body = {
      email:email,
      password: password,
      confirm_password: confirmPassword,
    };
    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show('All Fields are required', ToastAndroid.SHORT)
          : Alert.alert('All Fields are required');
      }
    }
   
    if (password !== confirmPassword) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Password donot match', ToastAndroid.SHORT)
        : Alert.alert('Password donot match');
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    setIsLoading(false);

    if (response != undefined) {
      console.log(
        '🚀 ~ file: Signup.js:66 ~ register ~ response:',
        response?.data,
      );
      Platform.OS == 'android' ? ToastAndroid.show('Password reset successfully', ToastAndroid.SHORT) : Alert.alert('Password reset successfully')
      
      navigationService.navigate('LoginScreen')
    }
  };

  return (
    <>
      <CustomStatusBar backgroundColor={'#FEFDFC'} barStyle={'dark-content'} />
      <View
        style={{
          height: windowHeight,
          width: windowWidth,
          alignItems: 'center',
          paddingTop: windowHeight * 0.1,
          backgroundColor: '#FEFDFC',
        }}>
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
          }}
          isBold>
          Reset Password
        </CustomText>

        <TextInputWithTitle
          secureText={true}
          titleText={'Your new Password'}
          placeholder={'Your new Password'}
          setText={setPassword}
          // marginTop={moderateScale(10,0.3)}
          value={password}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginTop={moderateScale(30, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />
        <TextInputWithTitle
          secureText={true}
          titleText={'Confirm Password'}
          placeholder={'Confirm Password'}
          setText={setConfirmPassword}
          // marginTop={moderateScale(10,0.3)}
          value={confirmPassword}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginTop={moderateScale(30, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />

        <CustomButton
          text={isLoading ?<ActivityIndicator color={Color.white} size={'small'} /> :'Reset Password'}
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          marginTop={moderateScale(30, 0.3)}
          fontSize={moderateScale(16, 0.6)}
          bgColor={Color.themeBgColor}
          borderRadius={moderateScale(30, 0.3)}
          onPress={() => {
            reset()
            // navigationService.navigate('ResetInstruction');
          }}
          isGradient
        />
      </View>
    </>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});
