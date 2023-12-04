import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useDispatch, useSelector} from 'react-redux';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';

const VerifyNumber = props => {
  const disptach = useDispatch();

  const email = props?.route?.params?.email;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false)
  const [code, setCode] = useState('');

  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
  const [abcd, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });
  const [time, settime] = useState(10);
  const [timerLabel, settimerLabel] = useState('Resend In ');
  if (time > 0) {
    setTimeout(function () {
      settime(time - 1);
    }, 1000);
  }

  const label = () => {
    time == 0 && (settimerLabel('Resend Code '), settime(''));
  };

  const sendOTP = async () => {
    const url = 'password/email';
    setIsLoading(true);
    const response = await Post(url, {email: email}, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      Alert.alert(`${response?.data?.data[0]?.code}`);
      setCode('');
      Platform.OS == 'android'
        ? ToastAndroid.show(`OTP sent to ${email}`, ToastAndroid.SHORT)
        : alert(`OTP sent to ${email}`);
    }
  };

  const VerifyOTP = async () => {
    const url = 'password/code/check';
    setIsLoading2(true);
    console.log(code);
    const response = await Post(url, {code: code}, apiHeader());
    setIsLoading2(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show(`otp verified`, ToastAndroid.SHORT)
        : alert(`otp verified`);

      navigationService.navigate('ResetPassword', {email: email});
    }
  };

  useEffect(() => {
    label();
  }, [time]);

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
            // marginTop: moderateScale(0, 0.3),
          }}
          isBold>
          Enter OTP
        </CustomText>
        {isLoading ? (
          <View
            style={{
              width: windowWidth,
              height: windowHeight * 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color={Color.themeColor} />
          </View>
        ) : (
          <View style={styles.conatiner}>
            <CodeField
              placeholder={'0'}
              ref={ref}
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[styles.cellRoot, isFocused && styles.focusCell]}>
                  <CustomText
                    style={[
                      styles.cellText,
                      isFocused && {color: Color.black},
                    ]}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </CustomText>
                </View>
              )}
            />
            <CustomText style={[styles.txt3, {width: windowWidth * 0.6}]}>
              Haven't Recieved Verification Code ?{' '}
              {
                <TouchableOpacity
                  disabled={timerLabel == 'Resend Code ' ? false : true}
                  onPress={() => {
                    sendOTP();
                    settimerLabel('ReSend in '), settime(10);
                  }}>
                  <CustomText style={[styles.txt4]}>
                    {timerLabel} {time}
                  </CustomText>
                </TouchableOpacity>
              }
            </CustomText>
            <CustomButton
              text={
                isLoading2 ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : (
                  'Verify Now'
                )
              }
              textColor={Color.white}
              fontSize={moderateScale(16, 0.6)}
              width={windowWidth * 0.8}
              height={windowHeight * 0.07}
              marginTop={moderateScale(30, 0.3)}
              onPress={() => {
                VerifyOTP();
                // navigationService.navigate('ResetPassword');
              }}
              bgColor={Color.themeBgColor}
              borderRadius={moderateScale(30, 0.3)}
              isGradient
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  conatiner: {
    width: windowWidth * 0.9,
    // height: windowHeight *0.4,
    paddingVertical: moderateScale(15, 0.6),
    // backgroundColor: 'white',
    alignSelf: 'center',
    // borderRadius: moderateScale(15, 0.6),
    alignItems: 'center',
    marginTop: moderateScale(15, 0.3),
  },

  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
    width: '95%',
    marginTop: moderateScale(10, 0.3),
    lineHeight: moderateScale(20, 0.3),
  },
  txt4: {
    color: Color.black,
    fontSize: moderateScale(14, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.white,
    // alignSelf : 'center'
  },
  txt5: {
    color: Color.black,

    fontSize: moderateScale(12, 0.6),
  },

  codeFieldRoot: {
    marginTop: moderateScale(20, 0.3),
    marginBottom: moderateScale(15, 0.3),
    width: windowWidth * 0.6,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: moderateScale(40, 0.3),
    height: moderateScale(40, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: moderateScale(5, 0.3),
    // backgroundColor: Color.black,
    // borderRadius: moderateScale(10, 0.3),
  },
  focusCell: {
    // backgroundColor: Color.themeColor,
    // borderRadius: moderateScale(10, 0.3),

    borderColor: Color.themeColor,
    borderWidth: 1,
  },
  cellText: {
    color: Color.themeColor,
    fontSize: moderateScale(20, 0.3),
    textAlign: 'center',
  },
});

export default VerifyNumber;
