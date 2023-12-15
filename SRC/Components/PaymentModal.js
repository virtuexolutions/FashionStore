import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {CardField, createToken} from '@stripe/stripe-react-native';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import CustomImage from './CustomImage';

const PaymentModal = ({isModal, setIsModal, setToken}) => {
  const stripePaymentFunction = ()=> {
    createToken({
      type: 'Card',
    })
      .then(token => {
        console.log('token= ', token);
        setToken(token?.token?.id)
        setIsModal(false)
      })
      .catch(error => {
        console.log('error= ', error);
      });
  }
  return (
    <Modal
      isVisible={isModal}
      // isModal={isModal}
      hasBackdrop={true}
      onBackdropPress={() => {
        setIsModal(false);
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(10, 0.3),
      }}>
      <View
        style={{
          backgroundColor: Color.white,
          paddingVertical: moderateScale(15, 0.3),
          // height:windowHeight*0.4,
          width: windowWidth * 0.95,
          borderRadius: moderateScale(30, 0.3),
          //   paddingHorizontal:moderateScale(20,.3)
        }}>
        <CustomText
          isBold
          style={{
            textAlign: 'center',
            // paddingLeft: moderateScale(20, 0.3),
            color: Color.themeColor,
            fontSize: moderateScale(25, 0.6),
          }}>
          PAYMENT
        </CustomText>
        <View
          style={{
            height: windowHeight * 0.15,
            width: windowWidth * 0.27,
            alignSelf: 'center',
          }}>
          <CustomImage
            style={{
              height: '100%',
              width: '100%',
            }}
            source={require('../Assets/Images/Creditcard.png')}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // paddingVertical:moderateScale(10,.3)
          }}>
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor:Color.lightGrey,
              borderRadius:moderateScale(15,.6),
              width: windowWidth * 0.8,
              // backgroundColor: '#FFFFFF',
              // textColor: '#000000',
              // color:Color.red,
            }}
            
            style={{
              // backgroundColor: 'red',
              width: '85%',
              height: windowHeight *0.07,
              // paddingVertical:moderateScale(10,.3),
              marginVertical:moderateScale(10 ,0.3) ,
              // paddingHorizontal: moderateScale(20, 0.3),
            }}
            onCardChange={cardDetails => {
              console.log('cardDetails', cardDetails);
            }}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row', 
            alignSelf:'flex-end',
            // position:'absolute',
            // right:10,
            // bottom:0,   
            justifyContent: 'space-between',
            width: windowWidth * 0.5,
            // marginVertical:moderateScale(20,.3),
            marginHorizontal: moderateScale(20, 0.3),
            paddingVertical: moderateScale(10, 0.3),
            // backgroundColor: 'red',
          }}>
          <CustomButton
            isBold
            text={'Cancel'}
            textColor={Color.themeDarkGray}
            width={windowWidth * 0.22}
            height={windowHeight * 0.05}
            // marginTop={moderateScale(10, 0.3)}
            onPress={() => {
              setIsModal(false)

            }}
            bgColor={Color.lightGrey424242}
            // isGradient
            borderRadius={moderateScale(25, 0.3)}
          />
          <CustomButton
            isBold
            text={'Confirm'}
            textColor={Color.white}
            width={windowWidth * 0.22}
            height={windowHeight * 0.05}
            onPress={() => {
              stripePaymentFunction()
              // setIsModal(false)
            }}
            bgColor={Color.themeColor}
            // isGradient
            borderRadius={moderateScale(30, 0.3)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({});
