import {
  StyleSheet,
  Text,
  View,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import Feather from 'react-native-vector-icons/Feather';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomStatusBar from '../Components/CustomStatusBar';
import {Post} from '../Axios/AxiosInterceptorFunction';
import Header from '../Components/Header';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const ForgotPassword = () => {
  const token = useSelector(state => state.authReducer.token);

  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updatePassword = async () => {
    const url = 'changepassword';
    const body = {
      old_password: password,
      password: newPassword,
      confirm_password: confirmNewPassword,
    };
    for (let i in body) {
      if (body[i] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show('All Fields are required', ToastAndroid.SHORT)
          : Alert.alert('All Fields are required');
      }
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      navigation.goBack();
    }
  };

  return (
    <>
      <CustomStatusBar backgroundColor={'#FEFDFC'} barStyle={'dark-content'} />
      <Header
        showLeft={true}
        leftName={'menu'}
        leftType={Feather}
        title={'Change Password'}
        showRight={true}
        rightName={'shopping-bag'}
        rightType={Feather}
        textStyle={{fontSize: moderateScale(18, 0.6)}}
      />
      <View
        style={{
          height: windowHeight * 0.9,
          width: windowWidth,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FEFDFC',
        }}>
        <TextInputWithTitle
          secureText={true}
          titleText={'Current password'}
          placeholder={'Current password'}
          setText={setPassword}
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
          titleText={'New password'}
          placeholder={'New password'}
          setText={setNewPassword}
          value={newPassword}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginTop={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />
        <TextInputWithTitle
          secureText={true}
          titleText={'Confirm New password'}
          placeholder={'Confirm New password'}
          setText={setConfirmNewPassword}
          value={confirmNewPassword}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginTop={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />

        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={Color.white} size={'small'} />
            ) : (
              'Update'
            )
          }
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          marginTop={moderateScale(30, 0.3)}
          bgColor={Color.themeBgColor}
          fontSize={moderateScale(16, 0.6)}
          borderRadius={moderateScale(30, 0.3)}
          onPress={() => {
            updatePassword();
          }}
          isGradient
        />
      </View>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});
