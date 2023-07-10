import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Components/CustomButton';
import {ScrollView} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {validateEmail} from '../Config';
import {setSelectedRole, setUserData} from '../Store/slices/common';
import {setUserLogin, setUserToken, setWalkThrough} from '../Store/slices/auth';
import {useDispatch, useSelector} from 'react-redux';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import CustomDropDown from '../Components/CustomDropDown';
import navigationService from '../navigationService';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = () => {
 const disptach = useDispatch();
  const [firstSection, setFirstSection] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedType] = useState('Qbid Member');

  const servicesArray = ['Qbid Negotiator', 'Qbid Member'];

  // const handleLogin = async loginFor => {
  //   console.log(
  //     '🚀 ~ file: LoginScreen.js:38 ~ handleLogin ~ loginFor',
  //     loginFor,
  //   );
  //   const url = 'login';
  //   const body = {
  //     email: email.trim(),
  //     password: password,
  //   };
  //   if (email == '' || password == '') {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show('Required Field is empty', ToastAndroid.SHORT)
  //       : alert('Required Field is empty');
  //   }
  //   if (!validateEmail(email)) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show('Please use valid email', ToastAndroid.SHORT)
  //       : alert('Please use valid email');
  //   }
  //   setIsLoading(true);
  //   const response = await Post(url, body, apiHeader());
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     console.log(response?.data);
  //     // console.log('yes' ,  response?.data?.data?.user_info?.role , loginFor)
  //     response?.data?.data?.user_info?.role == loginFor
  //       ? (dispatch(setUserData(response?.data?.data?.user_info)),
  //         dispatch(setUserLogin(response?.data?.data?.token)))
  //       : Platform.OS == 'android'
  //       ? ToastAndroid.show(
  //           'This User is not registered for selected role',
  //           ToastAndroid.SHORT,
  //         )
  //       : alert('This User is not registered for selected role');
  //   }
  // };



  return (
   <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />

<LinearGradient
        style={{
          width: windowWidth,
          alignItems: 'center',
            paddingTop: windowHeight * 0.1,
          height: windowHeight,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y:1}}
        colors={['purple', 'white' ]}
        // locations ={[0, 0.5, 0.6]}
        >
       
            <CustomImage
              source={
              require('../Assets/Images/hola.png')
              }
              // resizeMode={'stretch'}
              style={{
                width : windowWidth * 0.3,
                height : windowHeight * 0.1,
              }}
            />

        
          <TextInputWithTitle
              iconName={'user'}
              iconType={FontAwesome}
            titleText={'User Name'}
            secureText={false}
            placeholder={'User Name'}
            setText={setEmail}
            value={email}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={windowHeight * 0.1}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          <TextInputWithTitle
            iconName={'lock'}
            iconType={FontAwesome}
            titleText={'password'}
            secureText={true}
            placeholder={'password'}
            setText={setPassword}
            value={password}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.6)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            marginBottom={moderateScale(10, 0.3)}
          />
          <CustomText
            onPress={() => {
              navigationService.navigate('EnterPhone', {fromForgot: true});
            }}
            style={[
              styles.txt3,
              {
             color : Color.white,
                marginTop: moderateScale(20, 0.3),
              },
            ]}>
            {'Forgot Password?'}
          </CustomText>

          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Login'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(10, 0.3)}
            onPress={() => {
              disptach(setUserToken({token : 'fasdasd awdawdawdada'}))
             }}
            bgColor={'#AF69EF'}
           borderRadius={moderateScale(30, 0.3)}
          />

          <View style={styles.container2}>
            <CustomText style={styles.txt5}>
              {"Don't have an account? "}
            </CustomText>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginLeft: windowWidth * 0.01}}
              onPress={() => navigationService.navigate('Signup')}>
              <CustomText
                style={[
                  styles.txt4,
                  {
                    color:
                     Color.black
                  },
                ]}>
                {'Sign Up'}
              </CustomText>
            </TouchableOpacity>
          </View>
        
        </LinearGradient>
    </>
  );
};

const styles = ScaledSheet.create({
  bottomImage: {
    width: windowWidth * 0.4,backgroundColor : 'green'
  },

  textContainer: {
    marginTop: moderateScale(20, 0.3),
  },

  Heading: {
    fontSize: moderateScale(20, 0.3),
    // fontWeight: 'bold',
    color: '#ffffff',

    alignSelf: 'flex-start',
  },

  txt3: {
    fontSize: moderateScale(10, 0.6),
    alignSelf: 'center',
    fontWeight: '600',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
    // marginTop: moderateScale(10,0.3),
  },
  txt4: {
    color: Color.purple,
    fontSize: moderateScale(15, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.white,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(12, 0.6),
  },
  dropDown: {
    backgroundColor: Color.red,
  },
});

export default LoginScreen;
