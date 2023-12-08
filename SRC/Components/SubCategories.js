import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import {windowWidth} from '../Utillity/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomImage from './CustomImage';

const SubCategories = ({selectedCategory, setSelectedCategory, item}) => {
  return (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item?.name)}
      style={[
        styles.container,
        {
          borderLeftColor:
            selectedCategory == item?.name ? Color.themeColor : Color?.white,
          borderLeftWidth: moderateScale(2, 0.6),
        },
      ]}>
      <View
        style={{
          width: windowWidth * 0.12,
          height: windowWidth * 0.12,

          backgroundColor: Color.lightGrey,
          overflow: 'hidden',
          //   backgroundColor: 'red',
          borderRadius: (windowWidth * 0.12) / 2,
        }}>
        <CustomImage
          resizeMode="contain"
          onPress={() => setSelectedCategory(item?.name)}
          source={item?.image}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <Text
        style={[
          styles.text,
          {
            color:
              selectedCategory == item?.name ? Color?.themeColor : Color?.black,
          },
        ]}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );
};

export default SubCategories;

const styles = StyleSheet.create({
  text: {
    marginTop: moderateScale(5, 0.3),
    color: 'black',
    fontSize: moderateScale(12, 0.6),
    fontWeight: 'bold',
    // backgroundColor:'red',
    textAlign: 'center',
  },
  container: {
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    // backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
