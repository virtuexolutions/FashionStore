import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import navigationService from '../navigationService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {Icon} from 'native-base';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
        paddingTop: windowHeight * 0.1,
        backgroundColor : '#FEFDFC'

        // marginTop: moderateScale(30, 0.3),
      }}>
      <View
        style={{
          width: windowWidth * 0.7,
          height: windowHeight * 0.2,
          // backgroundColor:'purple',
          alignItems: 'center',
        }}>
        <CustomImage
          source={require('../Assets/Images/logo.png')}
          resizeMode={'contain'}
          style={{
            // justifyContent: 'center',
            // alignItems: 'center',
            // backgroundColor: 'black',
            height: '100%',
            // width:'100%',
          }}
        />
      </View>

      <CustomText
        style={{
          fontSize: moderateScale(18, 0.6),
          // marginTop: moderateScale(0, 0.3),
          // color:'#fffff',
        }}
        isBold>
        Sign in
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
        // elevation={elevation}
        // rightIcon={rightIcon}
        // onPressLeft={() => {
        //   setIsVisble(true);
        // }}
        // disable
      />
      <TextInputWithTitle
        iconName="lock"
        iconType={AntDesign}
        rightIcon
        secureText={true}
        titleText={'Your Password'}
        placeholder={'Your Password'}
        setText={setPassword}
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
        // elevation={elevation}
        // rightIcon={rightIcon}
        // onPressLeft={() => {
        //   setIsVisble(true);
        // }}
        // disable
      />
      <CustomText
        style={{
          fontSize: moderateScale(10, 0.6),
          marginTop: moderateScale(20, 0.3),
          textAlign: 'right',
          // backgroundColor:'black',
          width: windowWidth * 0.8,
          color: '#FF0040',
        }}
        onPress={() => {
          navigationService.navigate('EnterPhone');
        }}>
        Forgot Password?
      </CustomText>
      <View
        style={{
          flexDirection: 'row',
          width: windowWidth * 0.8,
          marginLeft: moderateScale(30, 0.3),
          marginTop: moderateScale(20, 0.3),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <TouchableOpacity
            style={{
              width: windowWidth * 0.04,
              justifyContent: 'center',
              alignItems: 'center',
              height: windowWidth * 0.04,
              borderRadius: (windowWidth * 0.04) / 2,
              borderColor: '#D8D8D8',
              borderWidth: 1,
            }}
            onPress={() => {
              setChecked(!checked);
            }}>
              {checked &&  <Icon as={Feather} name={'check'} size={3} color={'black'} />}
          </TouchableOpacity>
     
  
        <CustomText
          style={{
            fontSize: moderateScale(12, 0.6),
            marginLeft: moderateScale(3, 0.3),
            textAlign: 'left',
            // backgroundColor:'black',
            width: windowWidth * 0.8,
            color: '#ABB1C0',
          }}
          onPress={() => {
            setChecked(!checked);
          }}>
          Remember me
        </CustomText>
      </View>

      <CustomButton
        text={'Sign In'}
        textColor={Color.white}
        width={windowWidth * 0.8}
        height={windowHeight * 0.07}
        fontSize={moderateScale(16,.6)}
        marginTop={moderateScale(20, 0.3)}
        bgColor={['#F89D52', '#FF6E2E']}
        borderRadius={moderateScale(30, 0.3)}
        onPress={() => {
          navigationService.navigate('HomeScreen');
        }}
        isGradient
      />

     
    
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});
