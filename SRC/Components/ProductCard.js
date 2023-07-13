import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { moderateScale } from 'react-native-size-matters'
import { windowHeight, windowWidth } from '../Utillity/utils'
import CustomImage from './CustomImage'
import CustomText from './CustomText'
import Entypo from 'react-native-vector-icons/Entypo'
import { Icon } from 'native-base'
import navigationService from '../navigationService'
import { useDispatch, useSelector } from 'react-redux'
import { AddToCart, RemoveToCart } from '../Store/slices/common'
import CustomButton from './CustomButton'



const ProductCard = ({item}) => {


  const dispatch = useDispatch();

  const cartData = useSelector(state => state.commonReducer.cart);
  console.log("🚀 ~ file: ProductCard.js:21 ~ ProductCard ~ cartData:", cartData)

  const addedItem = item => {
    console.log('add DATA===>', cartData);

    dispatch(AddToCart(item));
  };

  const removeItem = item => {
    console.log('REMOVE DATA', cartData);
    dispatch(RemoveToCart(item));
  };
  const tempitem = cartData?.find((x,index)=> x?.id == item?.id)
  console.log("QTY+++",tempitem)
  return (
    <View>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>{ 
        if(!tempitem){
          addedItem(item)}}
        }
      style={{
        width: windowWidth * 0.45,
        height: windowHeight * 0.35,
        backgroundColor: '#fff',
        margin: moderateScale(5, 0.3),
        borderRadius: 5,
        alignItems: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          width: windowWidth * 0.35,
          height: windowHeight * 0.22,
          overflow: 'hidden',
          borderRadius: 5,
          marginTop: moderateScale(15, 0.3),
        }}>
        {item?.like && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.heartIcon}>
            <Icon
              name={'heart'}
              as={Entypo}
              size={moderateScale(25, 0.3)}
              color={'#ff0000'}
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
          <View style={styles.sale}>
            <CustomText
              isBold
              style={{
                color: '#fff',
                fontSize: 12,
              }}>
              {item.sale}
            </CustomText>
          </View>
        )}
      </TouchableOpacity>

      <CustomText
        isBold
        style={{
          textAlign: 'left',
          width: windowWidth * 0.35,
          height: windowHeight * 0.03,
          color: '#464342',
          marginTop: moderateScale(10, 0.3),
        }}>
        {item.Title}
      </CustomText>

      <CustomText
        style={{
          textAlign: 'left',
          width: windowWidth * 0.35,
          height: windowHeight * 0.03,
          color: '#a2a2a2',
        }}>
        {item.subTitle}
      </CustomText>

      <CustomText
        style={{
          textAlign: 'left',
          width: windowWidth * 0.35,
          color: '#E56A36',
        }}>
        $ {item.price}
      </CustomText>

      <CustomText
        onPress={() => {
          navigationService.navigate('DressesDetail', {item});
        }}
        style={{
          textAlign: 'right',
          width: windowWidth * 0.35,
          color: '#2C2928',
          position: 'absolute',
          bottom: moderateScale(10, 0.3),
          right: moderateScale(15, 0.3),
          fontSize: 13,
        }}>
        View all
      </CustomText>
    </TouchableOpacity>

    {tempitem != undefined && tempitem?.qty > 0 && (
      <CustomButton 
        isBold
        onPress={() => removeItem(item)}
        text={'Remove Cart'}
        textColor={Color.white}
        width={windowWidth * 0.28}
        marginTop={10}
        marginBottom={10}
        height={windowHeight * 0.04}
        bgColor={'#FF6E2E'}
        fontSize={14}
        borderRadius={moderateScale(5, 0.3)}
      />
    )}
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
