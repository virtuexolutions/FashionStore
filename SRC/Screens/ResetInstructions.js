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

const ResetInstruction = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (<>
    <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
        paddingTop: windowHeight * 0.1,

      }}>
      <CustomText />
      <View
        style={{
          width: windowWidth * 0.7,
          height: windowHeight * 0.4,
          alignItems: 'center',
          justifyContent:'space-between',
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
          fontSize: moderateScale(12, 0.6),
          marginTop: moderateScale(0, 0.3),
          color:Color.veryLightGray,
          height:windowHeight*0.1,
          width:windowWidth * 0.8
        }}
        >
      Please check your email for password reset instruction
      </CustomText>
     
     
      
     
   

      <CustomButton
        text={'Login Again'}
        textColor={Color.white}
        width={windowWidth * 0.8}
        height={windowHeight * 0.06}
        marginTop={moderateScale(20, 0.3)}
        bgColor={['#FF6E2E','#FF7F50','#FAC898']}
        borderRadius={moderateScale(30, 0.3)}
        onPress={() => {
          navigationService.navigate('Signup');
        }}
        isGradient
      />

      

      
      
    </View>
    </>
  );
};

export default ResetInstruction;

const styles = StyleSheet.create({
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});
