import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import navigationService from '../navigationService';

const GetStarted = () => {
  return (
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
        paddingTop : windowHeight * 0.1
        // backgroundColor : 'red'

        // marginTop: moderateScale(30, 0.3),
      }}>
      <CustomImage
        source={require('../Assets/Images/Mask2.png')}
        resizeMode={'contain'}
        // style={[styles.bottomImage]}
      />

      <CustomButton
      text={'Sign in'}
        textColor={'#FF6E2E'}
        width={windowWidth * 0.8}
        height={windowHeight * 0.06}
        marginTop={moderateScale(80, 0.3)}
        bgColor={'transparent'}
        borderRadius={moderateScale(30, 0.3)}
        borderWidth={1}
        borderColor={Color.veryLightGray}
        onPress={()=>{
          navigationService.navigate('LoginScreen')
        }}
      />

      <CustomButton
      text={'Sign Up'}
      textColor={Color.white}
        width={windowWidth * 0.8}
        height={windowHeight * 0.06}
        marginTop={moderateScale(10, 0.3)}
        bgColor={'#FF6E2E'}
        borderRadius={moderateScale(30, 0.3)}
        onPress={()=>{
          navigationService.navigate('Signup')
        }}
      />

      <CustomText >
        Terms Of Services
      </CustomText>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});
