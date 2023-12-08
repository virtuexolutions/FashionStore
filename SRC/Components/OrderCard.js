import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import {Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';

const OrderCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        <CustomText style={styles.text2}>OrderId :</CustomText>
        <CustomText style={styles.text2}>4012565</CustomText>
        <CustomText style={styles.text2}>30-dec-23 12:55 pm</CustomText>
        <CustomText style={styles.text2}>status</CustomText>
      </View>
      <View style={styles.imageView}>
        <Image
          style={{
            height: '100%',
            width: '100%',
          }}
          source={require('../Assets/Images/image3.png')}
        />
      </View>
      <View style={styles.buttonRow}>
        <CustomText style={styles.text1}>Rs 360</CustomText>
        <CustomButton
          // disabled={ cardData.find((data ,index) => data?.id == item?.id) && true}
          isBold
          onPress={() => {}}
          text={'Order Details'}
          textColor={Color.white}
          width={windowWidth * 0.29}
          height={windowHeight * 0.04}
          fontSize={moderateScale(13, 0.6)}
          bgColor={Color.themeBgColor}
          borderRadius={moderateScale(30, 0.3)}
          isGradient
        />
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  textRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Color.mediumGray,
  },
  text1: {
    fontSize: moderateScale(14, 0.3),
    color: Color.black,
    // width: windowWidth * 0.2
    padding: moderateScale(10, 0.6),
    textAlign: 'left',
  },
  text2: {
    fontSize: moderateScale(14, 0.3),
    color: Color.black,
    // width: windowWidth * 0.2
    padding: moderateScale(9, 0.6),
    textAlign: 'left',
    fontSize: moderateScale(12, 0.3),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageView: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.15,
    overflow: 'hidden',
    borderRadius: moderateScale(5, 0.3),
    marginTop: moderateScale(10, 0.3),
  },
  container: {
    width: windowWidth * 0.94,
    // backgroundColor:'red',
    borderRadius: moderateScale(15, 0.3),
    marginHorizontal: moderateScale(10, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    borderWidth: 1,
    borderColor: Color.mediumGray,
  },
});
