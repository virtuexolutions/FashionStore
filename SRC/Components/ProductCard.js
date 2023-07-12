import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { moderateScale } from 'react-native-size-matters'
import { windowHeight, windowWidth } from '../Utillity/utils'
import CustomImage from './CustomImage'
import CustomText from './CustomText'
import Entypo from 'react-native-vector-icons/Entypo'
import { Icon } from 'native-base'

const ProductCard = ({item}) => {
  return (
    <View
    style={{
      width: windowWidth * 0.45,
      height: windowHeight * 0.35,
      backgroundColor: '#fff',
      margin: moderateScale(5, 0.3),
      borderRadius: 5,
      alignItems: 'center',
    }}>
    <View
      style={{
        width: windowWidth * 0.35,
        height: windowHeight * 0.22,
        overflow: 'hidden',
        borderRadius: 5,
        marginTop: moderateScale(15, 0.3),
      }}>
      {item?.like && (
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.heartIcon}>
          <Icon
            name={'heart'}
            as={Entypo}
            size={moderateScale(25, 0.3)}
            color={'#F03710'}
          />
        </TouchableOpacity>
      )}
      <CustomImage
        source={item.img}
        resizeMode={'cover'}
        style={{
          height: '100%',
          height: '100%',
        }}
      />

      {item?.sale && (
        // <View style={styles.sale}>
        <CustomText
          isBold
          style={{
            position: 'absolute',
            bottom: moderateScale(10, 0.3),
            right: moderateScale(5, 0.3),
            zIndex: 1,
            width: windowWidth * 0.17,
            // height:windowHeight*0.03,
            fontSize: moderateScale(12, 0.6),
            color: '#fff',
            backgroundColor: 'red',
            borderRadius: moderateScale(10, 0.6),
            height: windowHeight * 0.03,
          }}>
          {item.sale}
        </CustomText>
        // </View>
      )}
    </View>

    <CustomText
      isBold
      style={{
        textAlign: 'left',
        width: windowWidth * 0.35,
        height: windowHeight * 0.03,
        fontSize:moderateScale(14,.6),
        color: '#464342',
        marginTop: moderateScale(10, 0.3),
      }}>
      {item?.Title}
    </CustomText>

    <CustomText
      style={{
        textAlign: 'left',
        width: windowWidth * 0.35,
        height: windowHeight * 0.03,
        fontSize:moderateScale(12,.6),

        color: '#999999',
      }}>
      {item?.subTitle}
    </CustomText>
    <CustomText
      style={{
        textAlign: 'left',
        width: windowWidth * 0.35,
        color: '#fe6e2e',
        fontSize:moderateScale(18,.6),
      }} isBold>
      ${item?.price}
    </CustomText>
  </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
    bottomImage: {
        width: '100%',
        height: '100%',
      },
      heartIcon: {
        position: 'absolute',
        top: moderateScale(10, 0.3),
        left: moderateScale(5, 0.3),
        zIndex: 1,
      },
    
      sale: {
        position: 'absolute',
        bottom: moderateScale(10, 0.3),
        right: moderateScale(5, 0.3),
        zIndex: 1,
        width: windowWidth * 0.2,
        height: windowHeight * 0.03,
      },
})
