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

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)

  return (
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
        paddingTop: windowHeight * 0.1,
        // backgroundColor : 'red'

        // marginTop: moderateScale(30, 0.3),
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
          fontSize: moderateScale(15, 0.6),
          marginTop: moderateScale(0, 0.3),
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
        viewHeight={0.05}
        viewWidth={0.8}
        inputWidth={0.7}
        border={1}
        borderColor={'#D3D3D3'}
        backgroundColor={'white'}
        marginTop={moderateScale(12, 0.3)}
        color={'#D3D3D3'}
        placeholderColor={'#D3D3D3'}
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
        // marginTop={moderateScale(10,0.3)}
        value={password}
        viewHeight={0.05}
        viewWidth={0.8}
        inputWidth={0.7}
        border={1}
        borderColor={'#D3D3D3'}
        backgroundColor={'white'}
        marginTop={moderateScale(25, 0.3)}
        color={'#D3D3D3'}
        placeholderColor={'#D3D3D3'}
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
          marginTop: moderateScale(10, 0.3),
          textAlign: 'right',
          // backgroundColor:'black',
          width: windowWidth * 0.8,
          color: 'red',
        }}>
        Forgot Password
      </CustomText>
      <View
        style={{
          flexDirection: 'row',
          width: windowWidth * 0.8,
          marginLeft: moderateScale(20, 0.3),
          marginTop: moderateScale(20, 0.3),
          alignItems: 'center',
          justifyContent:'center',
        }}>
        <Icon
          name={checked ? 'check-circle-o' : 'circle-thin'}
          as={FontAwesome}
          size={5}
          color={Color.veryLightGray}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <CustomText
          style={{
            fontSize: moderateScale(12, 0.6),
            // marginTop: moderateScale(10, 0.3),
            textAlign: 'left',
            // backgroundColor:'black',
            width: windowWidth * 0.8,
            color: Color.veryLightGray,
          }}>
          Remember me
        </CustomText>
      </View>

      <CustomButton
        text={'Sign In'}
        textColor={Color.white}
        width={windowWidth * 0.8}
        height={windowHeight * 0.06}
        marginTop={moderateScale(20, 0.3)}
        bgColor={'#FF6E2E'}
        borderRadius={moderateScale(30, 0.3)}
        onPress={() => {
          navigationService.navigate('Signup');
        }}
      />

      <View style={{width:windowWidth*0.8, height:1,backgroundColor:Color.veryLightGray,marginTop:moderateScale(40,0.3)}}></View>
      <CustomText
          style={{
            fontSize: moderateScale(15, 0.6),
            // marginTop: moderateScale(10, 0.3),
            textAlign: 'left',
            // backgroundColor:'black',
            width: windowWidth * 0.09,
            height:windowHeight*0.03,
            top :-12,
            textAlign:'center',
            color: Color.veryLightGray,
            backgroundColor:'white',
          }}>
         OR
        </CustomText>

        <View style={{flexDirection:'row', width:windowWidth*0.8, justifyContent:'space-between'}}>
        <CustomButton
        text={'Facebook'}
        textColor={Color.white}
        width={windowWidth * 0.35}
        height={windowHeight * 0.05}
        marginTop={moderateScale(20, 0.3)}
        bgColor={'#3b5998'}
        borderRadius={moderateScale(30, 0.3)}
        onPress={() => {
          navigationService.navigate('Signup');
        }}
      />
       <CustomButton
        text={'twitter'}
        textColor={Color.white}
        width={windowWidth * 0.35}
        height={windowHeight * 0.05}
        marginTop={moderateScale(20, 0.3)}
        bgColor={'#00acee'}
        borderRadius={moderateScale(30, 0.3)}
        onPress={() => {
          navigationService.navigate('Signup');
        }}
      />
        </View>
      
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
