import {StyleSheet, Text, View, Alert, ToastAndroid, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import navigationService from '../navigationService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {Icon} from 'native-base';
import CustomStatusBar from '../Components/CustomStatusBar';
import { Post } from '../Axios/AxiosInterceptorFunction';

const EnterPhone = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const ForgotPassword = async () => {
    const body = {
      email: email,
    };

    const url = 'password/email';

    if (['', null, undefined].includes(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Email is required', ToastAndroid.SHORT)
        : Alert.alert('Email is required');
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    setIsLoading(false);

    if (response != undefined) {
      console.log('response data =>', response?.data);
      Alert.alert(`${response?.data?.data[0]?.code}`);
      navigationService.navigate('VerifyNumber', {
        email: `${email}`,
      });

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
            marginTop: moderateScale(0, 0.3),
          }}
          isBold>
          Forgot Password
        </CustomText>
        <TextInputWithTitle
          iconName="envelope-o"
          iconType={FontAwesome}
          rightIcon
          titleText={'Your email address'}
          placeholder={'Your email Address here'}
          setText={setEmail}
          value={email}
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
          text={isLoading ? <ActivityIndicator color={Color.white} size={'small'} />:'send Code'}
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          marginTop={moderateScale(30, 0.3)}
          bgColor={Color.themeBgColor}
          fontSize={moderateScale(16, 0.6)}
          borderRadius={moderateScale(30, 0.3)}
          onPress={() => {
            ForgotPassword()
            // navigationService.navigate('VerifyNumber');
          }}
          isGradient
        />
      </View>
    </>
  );
};

export default EnterPhone;

const styles = StyleSheet.create({
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});
