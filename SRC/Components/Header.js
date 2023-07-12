import React, {useEffect, useState} from 'react';
import {Icon} from 'native-base';
import {
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  DrawerActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
const {height, width} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import navigationService from '../navigationService';
import Entypo from 'react-native-vector-icons/Entypo';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserData, setUserLogOut} from '../Store/slices/common';

const Header = props => {
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  // console.log('🚀 ~ file: Header.js:42 ~ Header ~ token:', token);
  const [isLoveNotesVisible, setLoveNotesVisible] = useState(false);
  const notification = useSelector(state => state.commonReducer.notification);
  const navigationN = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [drawerModal, setDrawerModal] = useState(false);
  // const [switchEnabled, setSwitchEnabled] = useState(false);
  const [isSpotLightVisible, setSpotLightVisible] = useState(false);
  const [discreteModal, setDiscreteModal] = useState(false);
 
  const [isVisible, setIsVisible] = useState(false);
  const [isBoostModalvisible, setBoostModalvisible] = useState(false);
  const [notificationData, setNotificationData] = useState([]);



  const {
    title,
    textStyle,
    showLeft,
    leftName,
    leftPress,
    showRight,
    rightName,
    rightPress,
    leftType,
    alignRight,
    rightType,
  } = props;

  const [searchText, setSearchText] = useState('');
  const user = useSelector(state => state.commonReducer.userData);
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  useEffect(() => {
    rightName == 'bell' && getNotifications();
  }, [focused]);

  return (
    <View style={styles.header2}>
      {title && (
        <CustomText
          style={[
            styles.text,
            textStyle,
            alignRight && {textAlign: 'right', width: windowWidth * 0.9},
          ]} isBold>
          {title}
        </CustomText>
      )}
      {showLeft && (
        <Icon
          name={leftName}
          as={leftType ? leftType : AntDesign}
          size={moderateScale(25, 0.3)}
          color={Color.black}
          onPress={
            leftName == 'menu'
              ? () => {
                  setDrawerModal(true);
                }
              : leftPress
              ? leftPress
              : () => {
                  navigationN.goBack();
                }
          }
          style={{
            position: 'absolute',
            left: moderateScale(10, 0.3),
          }}
        />
      )}
      {showRight &&
        (rightName ? (
          <Icon
            name={rightName}
            as={rightType ? rightType : FontAwesome}
            size={moderateScale(22, 0.3)}
            color={Color.black  }
            onPress={
              rightName == 'bell'
                ? () => {
                    setIsVisible(true);
                  }
                : rightPress
            }
            style={{
              position: 'absolute',
              right: moderateScale(10, 0.3),
              zIndex: 1,
            }}
          />
        ) : (
          <View
            style={{
              position: 'absolute',
              right: moderateScale(15, 0.3),
              width: windowWidth * 0.1,
              height: windowHeight * 0.055,
              // backgroundColor : 'red'
            }}>
            <CustomImage
              source={require('../Assets/Images/logo.png')}
              resizeMode={'stretch'}
              style={{
                width: '100%',
                height: '100%',
                // justifyContent: 'center',
                // alignSelf:'center',
              }}
            />
          </View>
        ))}
    </View>
    
      
  );
};
const styles = ScaledSheet.create({
  header2: {
    width: windowWidth,
    height: windowHeight * 0.09,
    // paddingTop: moderateScale(20, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDFDFD',
  },
  text: {
    fontSize: moderateScale(15, 0.6),
    textAlign: 'center',
  },
  modalContainer: {
    borderTopRightRadius: moderateScale(30, 0.6),
    borderBottomRightRadius: moderateScale(30, 0.6),

    alignSelf: 'flex-start',
    width: windowWidth * 0.8,
    maxHeight: windowHeight,
    backgroundColor: 'white',
    marginLeft: moderateScale(-20, 0.3),
  },
  modalContainer1: {
    borderTopLeftRadius: moderateScale(30, 0.6),
    borderBottomLeftRadius: moderateScale(30, 0.6),

    alignSelf: 'flex-end',
    width: windowWidth * 0.8,
    maxHeight: windowHeight,
    backgroundColor: 'white',
    marginRight: moderateScale(-20, 0.3),
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(20, 0.3),
  },
  heading: {
    fontSize: moderateScale(17, 0.6),
    color: Color.veryLightGray,
  },
  containerMini: {
    width: '29%',
    // height: windowHeight * 0.1,
    paddingVertical: moderateScale(5, 0.6),
    backgroundColor: 'white',
    borderRadius: moderateScale(15, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 9,
    marginRight: moderateScale(10, 0.6),
    marginTop: moderateScale(10, 0.6),
  },
});
export default Header;
