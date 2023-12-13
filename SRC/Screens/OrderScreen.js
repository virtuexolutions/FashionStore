import {
  FlatList,
  View,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CartItem from '../Components/CartItem';
import {useState} from 'react';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import CustomText from '../Components/CustomText';
import OrderCard from '../Components/OrderCard';
import {Get} from '../Axios/AxiosInterceptorFunction';
import NoData from '../Components/NoData';

const OrderScreen = ({route}) => {
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ file: OrderScreen.js:27 ~ OrderScreen ~ token  :', token);
  const cardData = useSelector(state => state.commonReducer.item);
  const [finalAmount, setFinalAmount] = useState(0);
  const [productsForCard, setProdctsForCart] = useState([]);
  const subTotal = route?.params?.subTotal;
  const [underline, setUnderline] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // console.log('alert ============>')

  const getOrder = async () => {
    const url = 'auth/order/list';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
       console.log(
        '🚀 ~ file: OrderScreen.js:36 ~ getOrder ~ response:',
        response?.data,
      );
      setOrders(response?.data?.order_info);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  // const dummyarray = [
  //   {
  //     orderId: 454643,
  //     date: '12-nov-23',
  //     time: '12:55pm',
  //     status: 'completed',
  //     item: [
  //       {
  //         image: require('../Assets/Images/image3.png'),
  //         qty: 2,
  //         price: 40,
  //         title: 'ABC',
  //       },
  //       {
  //         image: require('../Assets/Images/image3.png'),
  //         qty: 5,
  //         price: 20,
  //         title: 'ABC',
  //       },
  //       {
  //         image: require('../Assets/Images/Image2.png'),
  //         qty: 2,
  //         price: 50,
  //         title: 'ABC',
  //       },
  //       {
  //         image: require('../Assets/Images/image3.png'),
  //         qty: 1,
  //         price: 40,
  //         title: 'ABC',
  //       },
  //       {
  //         image: require('../Assets/Images/Image2.png'),
  //         qty: 2,
  //         price: 50,
  //         title: 'ABC',
  //       },
  //       {
  //         image: require('../Assets/Images/image3.png'),
  //         qty: 1,
  //         price: 40,
  //         title: 'ABC',
  //       },
  //     ],
  //     price: 360,
  //   },
  //   {
  //     orderId: 454643,
  //     date: '12-nov-23',
  //     time: '12:55pm',
  //     status: 'cancelled',
  //     price: 360,
  //     item: [
  //       {
  //         image: require('../Assets/Images/image3.png'),
  //         qty: 2,
  //         price: 40,
  //         title: 'ABC',
  //       },
  //       {
  //         image: require('../Assets/Images/image3.png'),
  //         qty: 5,
  //         price: 20,
  //         title: 'ABC',
  //       },
  //       {
  //         image: require('../Assets/Images/Image2.png'),
  //         qty: 2,
  //         price: 50,
  //         title: 'ABC',
  //       },
  //       {
  //         image: require('../Assets/Images/image3.png'),
  //         qty: 1,
  //         price: 40,
  //         title: 'ABC',
  //       },
  //       {
  //         image: require('../Assets/Images/Image2.png'),
  //         qty: 2,
  //         price: 50,
  //         title: 'ABC',
  //       },
  //       {
  //         image: require('../Assets/Images/image3.png'),
  //         qty: 1,
  //         price: 40,
  //         title: 'ABC',
  //       },
  //     ],
  //   },
  //   {
  //     orderId: 454643,
  //     date: '12-nov-23',
  //     time: '12:55pm',
  //     status: 'completed',
  //     item: [
  //       {
  //         image: require('../Assets/Images/image3.png'),
  //         qty: 2,
  //         price: 40,
  //         title: 'ABC',
  //       },
  //       {
  //         image: require('../Assets/Images/image3.png'),
  //         qty: 5,
  //         price: 20,
  //         title: 'ABC',
  //       },
  //       {
  //         image: require('../Assets/Images/Image2.png'),
  //         qty: 2,
  //         price: 50,
  //         title: 'ABC',
  //       },
  //       {
  //         image: require('../Assets/Images/Image2.png'),
  //         qty: 2,
  //         price: 50,
  //         title: 'ABC',
  //       },
  //       {
  //         image: require('../Assets/Images/image3.png'),
  //         qty: 1,
  //         price: 40,
  //         title: 'ABC',
  //       },
  //       {
  //         image: require('../Assets/Images/image3.png'),
  //         qty: 1,
  //         price: 40,
  //         title: 'ABC',
  //       },
  //     ],
  //     price: 360,
  //   },
  // ];

  return (
    <>
      <CustomStatusBar backgroundColor={'#FDFDFD'} barStyle={'dark-content'} />
      <Header
        showLeft={true}
        leftName={'arrow-left'}
        leftType={Feather}
        title={'Orders'}
        //   showRight={true}
        //   rightName={'shopping-bag'}
        //   rightType={Feather}
      />

      <View style={styles.rowview}>
        <TouchableOpacity onPress={() => setUnderline('Current')}>
          <CustomText
            style={[
              styles.text1,
              {
                borderBottomWidth: underline == 'Current' ? 1 : 0,
                borderColor:
                  underline == 'Current' ? Color.themeColor : 'white',
              },
            ]}>
            Current
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUnderline('History')}>
          <CustomText
            style={[
              styles.text1,
              {
                borderBottomWidth: underline == 'History' ? 1 : 0,
                borderColor:
                  underline == 'History' ? Color.themeColor : 'white',
              },
            ]}>
            History
          </CustomText>
        </TouchableOpacity>
      </View>

      {/* <OrderCard /> */}

      <FlatList
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                justifyContent: 'center',
                // backgroundColor:'red',
                height: windowHeight * 0.7,
              }}>
              <NoData
                style={{
                  width: windowWidth * 0.95,
                  height: windowHeight * 0.28,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        data={orders}
        style={{
          height: '90%',
          backgroundColor: 'white',
          width: windowWidth,
        }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: moderateScale(20, 0.3),
        }}
        renderItem={({item, index}) => {
          return <OrderCard data={item} />;
        }}
      />
    </>
  );
};

export default OrderScreen;

const styles = ScaledSheet.create({
  rowview: {
    flexDirection: 'row',
    backgroundColor:Color.white,
    width: windowWidth * 0.99,
    paddingHorizontal: moderateScale(25, 0.6),
    paddingVertical: moderateScale(15, 0.6),
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
  heading: {
    fontSize: moderateScale(20, 0.3),
    textAlign: 'left',
    width: windowWidth * 0.9,
    // backgroundColor : 'red'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.9,
    marginTop: moderateScale(10, 0.3),
    borderBottomWidth: 1,
    borderColor: Color.lightGrey,
    paddingBottom: moderateScale(10, 0.3),
  },
  subHeading: {
    fontSize: moderateScale(16, 0.3),
  },
  userTypeContainer: {
    // width: windowWidth * 0.7,
    // backgroundColor : Color.red,
    padding: moderateScale(10, 0.3),
    marginTop: moderateScale(10, 0.3),
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  innerContainer: {
    // width: '48%',
    // backgroundColor : 'green',
    // paddingVertical : moderateScale(5,0.3),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(5, 0.3),
  },
  circle: {
    height: moderateScale(13, 0.3),
    width: moderateScale(13, 0.3),
    borderRadius: moderateScale(6.5, 0.3),
    borderWidth: 1,
    backgroundColor: Color.white,
    borderColor: Color.green,
    marginLeft: moderateScale(15, 0.3),
  },
  txt2: {
    fontSize: moderateScale(12, 0.3),
  },
});
