import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import navigationService from '../navigationService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { Icon } from 'native-base';
import CustomStatusBar from '../Components/CustomStatusBar';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <>
    <CustomStatusBar
        backgroundColor={'#FEFDFC'}
        barStyle={'dark-content'}
      />
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
        paddingTop: windowHeight * 0.1,
        backgroundColor:'#FEFDFC',

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
      {/* <TextInputWithTitle
        iconName="envelope-o"
        iconType={FontAwesome}
        rightIcon
        titleText={'New password'}
        placeholder={'Confirm password'}
        setText={password}
        value={setPassword}
        viewHeight={0.06}
        viewWidth={0.8}
        inputWidth={0.7}
        border={1}
        borderColor={'#D3D3D3'}
        backgroundColor={'white'}
        marginTop={moderateScale(12, 0.3)}
        color={'#D3D3D3'}
        placeholderColor={'#D3D3D3'}
        borderRadius={moderateScale(20, 0.6)}
       
      /> */}
      <TextInputWithTitle
        iconName="lock"
        iconType={AntDesign}
        rightIcon
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
        iconName="lock"
        iconType={AntDesign}
        rightIcon
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
        text={'Reset Password'}
        textColor={Color.white}
        width={windowWidth * 0.8}
        height={windowHeight * 0.07}
        marginTop={moderateScale(30, 0.3)}
        fontSize={moderateScale(16,.6)}
        bgColor={['#F89D52', '#FF6E2E']}
        borderRadius={moderateScale(30, 0.3)}
        onPress={() => {
          navigationService.navigate('ResetInstruction');
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
