import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import Feather from 'react-native-vector-icons/Feather';
import {Icon, ScrollView} from 'native-base';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import SearchContainer from '../Components/SearchContainer';
import LinearGradient from 'react-native-linear-gradient';

const ResetInstruction = () => {
  const [searchData, setSearchData] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    {
      name: 'All',
      image2: require('../Assets/Images/menu.png'),
      image: require('../Assets/Images/menu1.png'),
    },
    {
      name: 'Dress',
      image: require('../Assets/Images/dress.png'),
      image2: require('../Assets/Images/dress1.png'),
    },
    {
      name: 'T-shirt',
      image: require('../Assets/Images/tshirt.png'),
      image2: require('../Assets/Images/tshirt1.png'),
    },
    {
      name: 'jeans',
      image: require('../Assets/Images/jeans.png'),
      image2: require('../Assets/Images/jeans1.png'),
    },
    {
      name: 'shoes',
      image: require('../Assets/Images/shoes.png'),
      image2: require('../Assets/Images/shoes1.png'),
    },
  ];
  const specialOffers = [
    {
      title: 'black Friday',
      off: '30%',
      detail: '*for selection item',
    },
    {
      title: 'New Year Sale',
      off: '50% ',
      detail: '*for selection item',
    },
  ];
  return (
    <>
      <CustomStatusBar
        //   backgroundColor={'white'}
        barStyle={'dark-content'}
      />
      <Header
        showLeft={true}
        leftName={'menu'}
        leftType={Feather}
        title={'Home'}
        showRight={true}
        rightName={'shopping-bag'}
        rightType={Feather}
      />
      <View
        style={{
          height: windowHeight,
          width: windowWidth * 0.95,
          //   alignItems: 'center',
          alignSelf: 'center',
          //   paddingTop: windowHeight * 0.1,
          //   backgroundColor: 'white',
        }}>
        <CustomText
          style={{
            fontSize: moderateScale(20, 0.6),
            color: '#FF6E2E',
            textAlign: 'left',
            // width:windowWidth,
            // backgroundColor:'black'
          }}
          isBold>
          Fashion Store
        </CustomText>

        {/* <TextInputWithTitle
        iconName="lock"
        iconType={AntDesign}
        rightIcon
        secureText={true}
        titleText={'Confirm Password'}
        placeholder={'Confirm Password'}
        setText={setConfirmPassword}
        // marginTop={moderateScale(10,0.3)}
        value={confirmPassword}
        viewHeight={0.05}
        viewWidth={0.8}
        inputWidth={0.7}
        border={1}
        borderColor={'#D3D3D3'}
        backgroundColor={'white'}
        marginTop={moderateScale(25, 0.3)}
        color={'#D3D3D3'}
        placeholderColor={'#D3D3D3'}
        borderRadius={moderateScale(20, 0.6)}
       
      /> */}
        <SearchContainer
          width={windowWidth * 0.95}
          input
          inputStyle={{
            height: windowHeight * 0.05,
          }}
          style={{
            height: windowHeight * 0.06,
            marginTop: moderateScale(20, 0.3),
            borderRadius: moderateScale(20, 0.3),
            alignSelf: 'center',
          }}
          data={searchData}
          placeHolder={'What Do You need ?'}
          setData={setSearchData}
          rightIcon
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: windowWidth * 0.95,
            marginTop: moderateScale(10, 0.3),
          }}>
          <CustomText
            style={{
              //   backgroundColor: 'red',
              width: windowWidth * 0.25,
              fontSize: moderateScale(18, 0.6),
              color: 'black',
            }}>
            Categories
          </CustomText>
          <CustomText
            style={{
              //   backgroundColor: 'red',
              width: windowWidth * 0.17,
              color: '#FF6E2E',
              borderRadius: moderateScale(20, 0.6),
              backgroundColor: '#FBCEB1',
              fontSize: moderateScale(12, 0.6),
              //height:windowHeight*0.03,
              paddingVertical: moderateScale(5, 0.6),
            }}
            isBold>
            See all
          </CustomText>
        </View>
        <View
          style={{
            height: windowHeight * 0.09,
            width: windowWidth * 0.95,
            // backgroundColor:'red',
            marginTop: moderateScale(20, 0.3),
            flexDirection: 'row',
            // alignItems:'center',
            justifyContent: 'space-between',
          }}>
          {categories.map((item, index) => {
            console.log(
              '🚀 ~ file: HomeScreen.js:146 ~ {categories.map ~ item:',
              item,
            );
            return (
              <>
                <View style={{alignItems: 'center', width: windowWidth * 0.16}}>
                  <LinearGradient
                    style={{
                      height: windowHeight * 0.07,
                      width: windowHeight * 0.07,
                      backgroundColor:
                        selectedCategory == item?.name ? 'orange' : '#E5E4E2',
                      color: selectedCategory == item?.name ? 'white' : '#DDD2',
                      borderRadius: moderateScale(10, 0.6),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    colors={selectedCategory == item?.name ? ['#FF6E2E','#F28C28'] : ['#D3D3D3','#E5E4E2']}>
                    <CustomImage
                      source={
                        selectedCategory == item?.name
                          ? item?.image2
                          : item?.image
                      }
                      // style={{}}
                      resizeMode={'cover'}
                      onPress={() => {
                        setSelectedCategory(item?.name);
                      }}
                    />
                  </LinearGradient>
                  <CustomText
                    style={{width: windowWidth * 0.14, color: 'black'}}>
                    {item?.name}
                  </CustomText>
                </View>
              </>
            );
          })}
        </View>
        <View
          style={{
            height: windowHeight * 0.16,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ScrollView
            style={{
              flexDirection: 'row',
              // alignItems: 'center',
              // justifyContent: 'space-between',
              width: windowWidth * 0.95,
              marginTop: moderateScale(20, 0.3),
              height: windowHeight * 0.1,
            //   backgroundColor: 'black',
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {specialOffers.map((item, index) => {
              return (
                <LinearGradient style={{
                    width: windowWidth * 0.5,
                    height: windowHeight * 0.12,
                    borderRadius: moderateScale(20, 0.6),
                    // backgroundColor: 'orange',
                    marginLeft: moderateScale(10, 0.3),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }} colors={['#FF6E2E','#F28C28']}
                  start={{ x: 1, y: 1 }}
                  end={{ x: 1, y: 0 }}>
                <View
                //   style={{
                //     width: windowWidth * 0.5,
                //     height: windowHeight * 0.12,
                //     borderRadius: moderateScale(20, 0.6),
                //     // backgroundColor: 'orange',
                //     marginLeft: moderateScale(10, 0.3),
                //     alignItems: 'center',
                //     justifyContent: 'center',
                //   }}
                  >
                  <CustomText
                    style={{
                      color: 'white',
                      // backgroundColor: 'red',
                      textAlign: 'left',
                      width: windowWidth * 0.45,
                      fontSize: moderateScale(14, 0.6),
                    }}>
                    {item?.title}
                  </CustomText>
                  <View
                    style={{
                      flexDirection: 'row',
                      // backgroundColor: 'purple',
                      width: windowWidth * 0.45,
                      alignItems: 'center',
                    }}>
                    <CustomText
                      style={{
                        color: 'white',
                        // backgroundColor: 'red',
                        textAlign: 'left',
                        // width: windowWidth * 0.2,
                        fontSize: moderateScale(25, 0.6),
                      }}>
                      {item?.off}
                    </CustomText>
                    <CustomText
                      style={{
                        color: 'white',
                        // backgroundColor: 'red',
                        textAlign: 'left',
                        // width: windowWidth * 0.2,
                        fontSize: moderateScale(12, 0.6),
                      }}>
                      {'  '}
                      off
                    </CustomText>
                  </View>

                  <CustomText
                    style={{
                      color: 'white',
                      // backgroundColor: 'red',
                      textAlign: 'left',
                      width: windowWidth * 0.45,
                      fontSize: moderateScale(10, 0.6),
                    }}>
                    {item?.detail}
                  </CustomText>
                </View>
                </LinearGradient>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: windowWidth * 0.95,
            // marginTop: moderateScale(1   0, 0.3),
          }}>
          <CustomText
            style={{
              //   backgroundColor: 'red',
              width: windowWidth * 0.4,
              fontSize: moderateScale(18, 0.6),
              color: 'black',
            }}
            isBold>
            New Arrivals
          </CustomText>
          <CustomText
            style={{
              //   backgroundColor: 'red',
              width: windowWidth * 0.3,
              color: 'black',
              borderRadius: moderateScale(20, 0.6),
            //   backgroundColor: '#FBCEB1',
              fontSize: moderateScale(12, 0.6),
              //height:windowHeight*0.03,
              paddingVertical: moderateScale(5, 0.6),
            }}>
            See all collection
          </CustomText>
        </View>

        {/*       
      <View
        style={{
          width: windowWidth * 0.7,
          height: windowHeight * 0.4,
          alignItems: 'center',
          justifyContent:'space-between',
        }}>
        <CustomImage
          source={require('../Assets/Images/logo.png')}
          resizeMode={'contain'}
          style={{
            
            height: '100%',
          }}
        />
      </View>

      <CustomText
        style={{
          fontSize: moderateScale(12, 0.6),
          marginTop: moderateScale(0, 0.3),
          color:Color.veryLightGray,
          height:windowHeight*0.1,
          width:windowWidth * 0.8
        }}
        >
      Please check your email for password reset instruction
      </CustomText>
     


      <CustomButton
        text={'Login Again'}
        textColor={Color.white}
        width={windowWidth * 0.8}
        height={windowHeight * 0.06}
        marginTop={moderateScale(20, 0.3)}
        bgColor={['#FF6E2E','#FF7F50','#FAC898']}
        borderRadius={moderateScale(30, 0.3)}
        onPress={() => {
          navigationService.navigate('Signup');
        }}
        isGradient
      />

       */}
      </View>
    </>
  );
};

export default ResetInstruction;

const styles = StyleSheet.create({
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});
