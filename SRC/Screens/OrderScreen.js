import {
  FlatList,
  View,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Image,
  ActivityIndicator,
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
  const cardData = useSelector(state => state.commonReducer.item);
  const [finalAmount, setFinalAmount] = useState(0);
  const [productsForCard, setProdctsForCart] = useState([]);
  const subTotal = route?.params?.subTotal;
  const [underline, setUnderline] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrder = async () => {
    const url = 'auth/order/list';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      setOrders(response?.data?.order_info);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <CustomStatusBar backgroundColor={'#FDFDFD'} barStyle={'dark-content'} />
      <Header
        showLeft={true}
        leftName={'arrow-left'}
        leftType={Feather}
        title={'Orders'}
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
      {isLoading ? (
        <View
          style={{
            height: windowHeight * 0.8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={Color.themeColor} />
        </View>
      ) : (
        <FlatList
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  justifyContent: 'center',
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
      )}
    </>
  );
};

export default OrderScreen;

const styles = ScaledSheet.create({
  rowview: {
    flexDirection: 'row',
    backgroundColor: Color.white,
    width: windowWidth * 0.99,
    paddingHorizontal: moderateScale(25, 0.6),
    paddingVertical: moderateScale(15, 0.6),
  },
  text1: {
    fontSize: moderateScale(14, 0.3),
    color: Color.black,
    padding: moderateScale(10, 0.6),
    textAlign: 'left',
  },
  text2: {
    fontSize: moderateScale(14, 0.3),
    color: Color.black,
    padding: moderateScale(9, 0.6),
    textAlign: 'left',
    fontSize: moderateScale(12, 0.3),
  },
  heading: {
    fontSize: moderateScale(20, 0.3),
    textAlign: 'left',
    width: windowWidth * 0.9,
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
    padding: moderateScale(10, 0.3),
    marginTop: moderateScale(10, 0.3),
  },
  innerContainer: {
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
