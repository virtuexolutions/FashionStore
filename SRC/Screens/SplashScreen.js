import React from "react";
import * as Animatable from "react-native-animatable";
import Color from "../Assets/Utilities/Color";
import CustomImage from "../Components/CustomImage";
import { windowHeight, windowWidth } from "../Utillity/utils";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import ScreenBoiler from "../Components/ScreenBoiler";
import LinearGradient from "react-native-linear-gradient";

const SplashScreen = () => {
  return (
    <ScreenBoiler
     
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={"dark-content"}
    >
        <LinearGradient
        style={{
          width: windowWidth,
          // alignItems : 'center',
          justifyContent : 'center',
          height: windowHeight,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y:1}}
        colors={Color.themeBgColor}
        // locations ={[0, 0.5, 0.6]}
        >

 
     
        <Animatable.View
          animation="fadeInDown"
          duration={2500}
          useNativeDriver
          style={{
            position : 'absolute',
            left : 1,
            // backgroundColor : 'red'
          }}
          
          
          >
          <CustomImage
            source={require('../Assets/Images/logo.png')}
            resizeMode={"contain"}
            style={[styles.bottomImage]}
            />
        </Animatable.View>

        <CustomImage
            source={require('../Assets/Images/splash1.png')}
            // resizeMode={"contain"}
            style={{
              alignSelf : 'flex-end',
              width: windowWidth,
            height: windowHeight,
              // backgroundColor : 'red'
              // position:'absolute',

            }}
            />
            </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    height: windowHeight,
    width: windowWidth,
    backgroundColor : Color.themeColor
  },
  bottomImage: {
    width : windowWidth * 0.5
  },
  // textContainer: {
  //   flexDirection: "row",
  //   alignSelf :'center',
  //   width : windowWidth * 0.4,
  //   height :windowWidth * 0.4,
  //   borderRadius : moderateScale(windowWidth* 0.7 / 2 , 0.3),
  //   justifyContent : 'center',
  //   alignItems : 'center',
  //   // backgroundColor : Color.white,
    

  // },
  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: "bold",
  },
 
});

export default SplashScreen;
