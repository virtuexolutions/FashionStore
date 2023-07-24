import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import navigationService from '../navigationService';
import CustomStatusBar from '../Components/CustomStatusBar';

const GetStarted = () => {
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
        paddingTop : windowHeight * 0.1,
         backgroundColor : '#FEFDFC'

        // marginTop: moderateScale(30, 0.3),
      }}>
      <CustomImage
        source={require('../Assets/Images/Mask2.png')}
        resizeMode={'contain'}
        // style={[styles.bottomImage]}
      />

      <CustomButton
      text={'Sign in'}
        textColor={Color.themeColor}
        width={windowWidth * 0.8}
        height={windowHeight * 0.07}
        marginTop={moderateScale(80, 0.3)}
        bgColor={'transparent'}
        borderRadius={moderateScale(30, 0.3)}
        borderWidth={1}
        borderColor={'#707070'}
        fontSize={moderateScale(16,.6)}
        onPress={()=>{
          navigationService.navigate('LoginScreen')
        }}
        isBold
      />

      <CustomButton
      text={'Sign Up'}
      textColor={Color.white}
        width={windowWidth * 0.8}
        height={windowHeight * 0.07}
        marginTop={moderateScale(15, 0.3)}
        borderRadius={moderateScale(30, 0.3)}
        fontSize={moderateScale(16,.6)}
        bgColor={Color.themeBgColor}
        onPress={()=>{
          
          navigationService.navigate('Signup')
        }}
        isGradient
        isBold
      />

      <CustomText style={{color:'#ABB1C0',fontSize:moderateScale(12,.6), marginTop:moderateScale(10,.3)}}>
        Terms Of Services
      </CustomText>
    </View>
    </>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});
