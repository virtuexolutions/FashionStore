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
import CustomStatusBar from '../Components/CustomStatusBar';

const WelcomeScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [step, setstep] = useState(0);
  console.log('🚀 ~ file: StartingScreen.js:22 ~ StartingScreen ~ step:', step);

  const [starterData, setStarterData] = useState([
    {
      title: 'Quickly',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. `,
      image: require('../Assets/Images/Mask.png'),
    },
    {
      title: 'Safely',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy`,
      image: require('../Assets/Images/image3.png'),
    },
    {
      title: 'Easy',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy`,
      image: require('../Assets/Images/Mask3.png'),
    },
  ]);

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

          // marginTop: moderateScale(30, 0.3),
        }}>
        {starterData.map((data, index) => {
          console.log(
            '🚀 ~ file: StartingScreen.js:54 ~ {starterData.map ~ index:',
            index,
          );
          return (
            step == index && (
              <>
                <View
                  style={{
                    height: windowHeight * 0.45,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    overflow:'auto',
                    width: windowWidth* 0.15,

                  }}>
                  <View
                    style={{
                      height: windowHeight * 0.45,
                      width: windowWidth * 0.65,
                      overflow: 'hidden',
                      borderRadius: moderateScale(20, 0.6),
                      zIndex:1,
                    }}>
                    <CustomImage
                      source={starterData[step%3]?.image}
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>
                   <View
                    style={{
                      height: windowHeight * 0.43,
                      width: windowWidth * 0.65,
                      overflow: 'hidden',
                      borderRadius: moderateScale(20, 0.6),
                      zIndex:0,

                    }}>
                    <CustomImage
                      source={starterData[(step+1)%3]?.image}
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>
                 <View
                    style={{
                      // backgroundColor:'black',
                      height: windowHeight * 0.41,
                      width: windowWidth * 0.65,
                      overflow: 'hidden',
                      borderRadius: moderateScale(20, 0.6),
                      zIndex:-1,

                    }}>
                    <CustomImage
                      source={starterData[(step+2)%3]?.image}
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>
                </View>

                <CustomText
                  style={{
                    color: 'black',
                    fontSize: moderateScale(20, 0.6),
                    textAlign: 'center',
                    // backgroundColor:'green',
                    marginTop: moderateScale(25, 0.3),
                  }}
                  isBold>
                  {data?.title}
                </CustomText>
                <CustomText
                  style={{
                    color: 'black',
                    fontSize: moderateScale(12, 0.6),
                    textAlign: 'center',
                    marginTop: moderateScale(10, 0.3),
                    width: windowWidth * 0.85,
                    // backgroundColor:'green',
                    lineHeight: moderateScale(20, 0.6),
                  }}>
                  {data?.description}
                </CustomText>
                <CustomButton
                  text={
                    index == starterData.length - 1 ? 'Get Started' : 'Next'
                  }
                  textColor={Color.white}
                  width={windowWidth * 0.75}
                  height={windowHeight * 0.07}
                  marginTop={moderateScale(30, 0.3)}
                  bgColor={['#F89D52', '#FF6E2E']}
                  borderRadius={moderateScale(30, 0.3)}
                  fontSize={moderateScale(16, 0.6)}
                  onPress={() => {
                   
                    if (step < 2) {
                      setstep(step + 1);
                    } else {
                      navigationService.navigate('GetStarted');
                    }
                  }}
                  isGradient
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    bottom: 25,
                    position: 'absolute',

                    // marginTop: moderateScale(100, 0.3),
                    width: windowWidth * 0.2,
                    //   backgroundColor:'black'
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setstep(0);
                  
                    }}
                    style={{
                      width: moderateScale(15, 0.6),
                      height: moderateScale(7, 0.6),
                      backgroundColor: step == 0 ? '#FF6E2E' : '#FBCEB1',
                      borderRadius: moderateScale(10, 0.6),
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setstep(1);
                      
                    
                    }}
                    style={{
                      width: moderateScale(15, 0.6),
                      height: moderateScale(7, 0.6),
                      backgroundColor: step == 1 ? '#FF6E2E' : '#FBCEB1',
                      borderRadius: moderateScale(10, 0.6),
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setstep(2);
                      
                      
                    }}
                    style={{
                      width: moderateScale(15, 0.6),
                      height: moderateScale(7, 0.6),
                      backgroundColor: step == 2 ? '#FF6E2E' : '#FBCEB1',
                      borderRadius: moderateScale(10, 0.6),
                    }}
                  />
                </View>
              </>
            )
          );
        })}
      </View>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});
