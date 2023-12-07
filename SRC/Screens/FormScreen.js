import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Components/CustomButton';
import Header from '../Components/Header';
import Feather from 'react-native-vector-icons/Feather';
import Color from '../Assets/Utilities/Color';
import PaymentModal from '../Components/PaymentModal';

const FormScreen = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostCode] = useState();
  const [token, setToken] = useState('');
  const[isChecked ,setIsChecked] =useState()
  const [isModal , setIsModal] =useState(false)
  console.log("🚀 ~ file: FormScreen.js:28 ~ FormScreen ~ isModal:", isModal)
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Header
        showLeft={true}
        leftName={'arrow-left'}
        leftType={Feather}
        title={'checkout'}
        // showRight={true}
        // rightName={'shopping-bag'}
        // rightType={Feather}
      />

      <View
        style={{
          height: windowHeight,
          width: windowWidth,
          alignItems: 'center',
          //   paddingTop: windowHeight * 0.1,
          backgroundColor: '#FEFDFC',
        }}>
        <CustomText />

        {/* <View
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
    </View> */}

        {/* <CustomText
      style={{
        fontSize: moderateScale(18, 0.6),
        marginTop: moderateScale(0, 0.3),
        marginBottom: moderateScale(17, 0.3),
      }}
      isBold>
      Sign Up
    </CustomText> */}
        <TextInputWithTitle
          //   iconName="person-outline"
          //   iconType={Ionicons}
          //   rightIcon
          titleText={'Your name'}
          placeholder={'Your name'}
          setText={setName}
          value={name}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginBottom={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />
        <TextInputWithTitle
          //   iconName="person-outline"
          //   iconType={Ionicons}
          //   rightIcon
          titleText={'Last name'}
          placeholder={'Last name'}
          setText={setLastName}
          value={lastName}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginBottom={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />
        <TextInputWithTitle
          //   iconName="envelope-o"
          //   iconType={FontAwesome}
          //   rightIcon
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
          marginBottom={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />
        <TextInputWithTitle
          //   iconName="envelope-o"
          //   iconType={FontAwesome}
          //   rightIcon
          titleText={'Phone'}
          placeholder={'Phone'}
          setText={setPhone}
          value={phone}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginBottom={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />
        <TextInputWithTitle
          //   iconName="envelope-o"
          //   iconType={FontAwesome}
          //   rightIcon
          titleText={'Country'}
          placeholder={'Country'}
          setText={setCountry}
          value={country}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginBottom={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />
        <TextInputWithTitle
          //   iconName="envelope-o"
          //   iconType={FontAwesome}
          //   rightIcon
          titleText={'Address'}
          placeholder={'Address'}
          setText={setAddress}
          value={address}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginBottom={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />
        <TextInputWithTitle
          //   iconName="envelope-o"
          //   iconType={FontAwesome}
          //   rightIcon
          titleText={'Post code'}
          placeholder={'Post code'}
          setText={setPostCode}
          value={postcode}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginBottom={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />
        <TextInputWithTitle
          //   iconName="envelope-o"
          //   iconType={FontAwesome}
          //   rightIcon
          titleText={'Token'}
          placeholder={'Token'}
          setText={setToken}
          value={token}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginBottom={moderateScale(20, 0.3)}
          color={'#ABB1C0'}
          placeholderColor={'#ABB1C0'}
          borderRadius={moderateScale(20, 0.6)}
        />

        <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent: 'space-between',
            // backgroundColor:'yellow',
            width:windowWidth*0.75,
            paddingBottom:moderateScale(15,.3)
          }}>
          <View style={{
            flexDirection:'row',
            alignItems:'center',
            // backgroundColor:'red'
          }}>
            <TouchableOpacity
            onPress={() => {
                setIsChecked('Cash on delivery')
            }}
              style={{
                width: windowHeight * 0.015,
                backgroundColor: isChecked == 'Cash on delivery' ?  Color.themeColor : Color.mediumGray,
                height: windowHeight * 0.015,
                borderRadius: (windowHeight * 0.015) / 2,
                borderColor: Color.mediumGray,
                borderWidth: 2,
                // flexDirection:'row'
              }}></TouchableOpacity>
            <CustomText
            onPress={() => {
                setIsChecked('Cash on delivery')
            }}
              style={[{marginLeft: moderateScale(5, 0.3)}, styles.labelText]}>
              Cash on delivery
            </CustomText>
          </View>
          <View style={{
            flexDirection:'row',
            alignItems:'center'
          }}>
            <TouchableOpacity
            onPress={() => {
                setIsChecked('pay through stripe')
            }}
              style={{
                width: windowHeight * 0.015,
                backgroundColor: isChecked == 'pay through stripe' ?  Color.themeColor : Color.mediumGray,
                height: windowHeight * 0.015,
                borderRadius: (windowHeight * 0.015) / 2,
                borderColor: Color.mediumGray,
                borderWidth: 2,
                // flexDirection:'row'
              }}></TouchableOpacity>
            <CustomText
            onPress={() => {
                setIsModal(true)
                setIsChecked('pay through stripe')
            }}
              style={[{marginLeft: moderateScale(5, 0.3)}, styles.labelText]}>
            pay through stripe
            </CustomText>
          </View>
        </View>

        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator size={'small'} color={Color.white} />
            ) : (
              'Place order'
            )
          }
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          fontSize={moderateScale(16, 0.6)}
          bgColor={Color.themeBgColor}
          borderRadius={moderateScale(30, 0.3)}
          onPress={() => {
            // register();
          }}
          isGradient
        />
        <PaymentModal isModal={isModal} setIsModal={setIsModal} />
      </View>
    </>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});
