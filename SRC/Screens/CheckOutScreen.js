import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
// import {Icon} from 'native-base';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Feather from 'react-native-vector-icons/Feather';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import CustomButton from '../Components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
// import {
//   AddToCart,
//   decrementQuantity,
//   increamentQuantity,
// } from '../Store/slices/common';


const CheckOutScreen = () => {
    const addData = useSelector(state => state.commonReducer.cart);
    console.log("DATA",addData)
  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#fff',
      }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={addData}
        contentContainerStyle={{
          alignSelf: 'center',
          marginTop: moderateScale(5, 0.3),
        }}
        renderItem={({item, index}) => {
            console.log("item images ",item?.img)
          return (
            <View style={{width:windowWidth*0.9,height:windowHeight * 0.3,marginTop:50,backgroundColor:'#000'}}>
              <View
                style={{
                //   flexDirection: 'row',
                //   justifyContent: 'space-evenly',
                  width:windowWidth*0.4,
                  height:windowHeight*0.20,
                  backgroundColor:'blue',
                //   alignItems:'center'

                }}>
                <CustomImage
                  source={item?.img}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CheckOutScreen;
