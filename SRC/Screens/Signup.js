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
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setpassword] = useState('');
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
            // alignItems: 'center',
            height: '100%',
            // width:'100%',
          }}
        />
      </View>

      <CustomText
        style={{
          fontSize: moderateScale(18, 0.6),
          marginTop: moderateScale(0, 0.3),
          marginBottom:moderateScale(17,.3),
        }}
        isBold>
        Sign Up
      </CustomText>
      <TextInputWithTitle
        iconName="person-outline"
        iconType={Ionicons}
        rightIcon
        titleText={'Your name'}
        placeholder={'your name'}
        setText={setName}
        value={name}
        viewHeight={0.06}
        viewWidth={0.8}
        inputWidth={0.7}
        border={1}
        borderColor={'#0F02022E'}
        backgroundColor={'white'}
        marginBottom={moderateScale(30, 0.3)}
        color={'#ABB1C0'}
        placeholderColor={'#ABB1C0'}
        borderRadius={moderateScale(20, 0.6)}
       
      />
      <TextInputWithTitle
        iconName="envelope-o"
        iconType={FontAwesome}
        rightIcon
        titleText={'Your email address'}
        placeholder={'Your email address '}
        setText={setEmail}
        value={email}
        viewHeight={0.06}
        viewWidth={0.8}
        inputWidth={0.7}
        border={1}
        borderColor={'#0F02022E'}
        backgroundColor={'white'}
        marginBottom={moderateScale(30, 0.3)}
        color={'#ABB1C0'}
        placeholderColor={'#ABB1C0'}
        borderRadius={moderateScale(20, 0.6)}
       
      />
      <TextInputWithTitle
        iconName="lock"
        iconType={AntDesign}
        rightIcon
        secureText={true}
        titleText={'Your Password'}
        placeholder={'Your Password'}
        setText={setpassword}
        marginBottom={moderateScale(30, 0.3)}
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
     
     

      <CustomButton
        text={'Sign Up'}
        textColor={Color.white}
        width={windowWidth * 0.8}
        height={windowHeight * 0.07}
        fontSize={moderateScale(16,.6)}
        // marginTop={moderateScale(20, 0.3)}
        bgColor={['#F89D52', '#FF6E2E']}
        borderRadius={moderateScale(30, 0.3)}
        onPress={() => {
          navigationService.navigate('LoginScreen');
        }}
        isGradient
      />

     
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});
