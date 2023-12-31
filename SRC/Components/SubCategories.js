import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import {windowWidth} from '../Utillity/utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomImage from './CustomImage';

const SubCategories = ({
  image,
  selectedCategory,
  setSelectedCategory,
  item,
  setIsVisible,
  setCategoryId,
  setCategoryType
}) => {
  // console.log(
  //   '🚀 ~ file: SubCategories.js:10 ~ SubCategories ~ selectedCategory:',
  //   item,
  // );
  return (
    <TouchableOpacity
      onPress={() => {
        setCategoryId(item?.id)
        setCategoryType('sub')
        setSelectedCategory(item?.title);
        item?.child_categories?.length == 0 && setIsVisible(false);
      }}
      style={[
        styles.container,
        {
          borderLeftColor:
            selectedCategory == item?.title ? Color.themeColor : Color?.white,
          borderLeftWidth: moderateScale(2, 0.6),
        },
      ]}>
      <View
        style={{
          width: windowWidth * 0.13,
          height: windowWidth * 0.13,
          backgroundColor: Color.lightGrey,
          overflow: 'hidden',
          padding:moderateScale(5,.6),
          borderRadius: (windowWidth * 0.13) / 2,
        }}>
        <CustomImage
          resizeMode="contain"
          onPress={() => {
            setCategoryId(item?.id)
            setSelectedCategory(item?.title);
            setCategoryType('sub')
            item?.child_categories?.length == 0 && setIsVisible(false)
          }}
          source={image}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <Text
        style={[
          styles.text,
          {
            color:
              selectedCategory == item?.title
                ? Color?.themeColor
                : Color?.black,
          },
        ]}>
        {item?.title}
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
    width: windowWidth * 0.3,
    // backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
