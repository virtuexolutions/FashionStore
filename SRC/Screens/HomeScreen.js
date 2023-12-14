import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList, Icon, ScrollView} from 'native-base';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import SearchContainer from '../Components/SearchContainer';
import LinearGradient from 'react-native-linear-gradient';
import ProductCard from '../Components/ProductCard';
import navigationService from '../navigationService';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useDispatch, useSelector} from 'react-redux';
import CategoriesModal from '../Components/CategoriesModal';
import NoData from '../Components/NoData';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const token = useSelector(state => state.authReducer.token);
  const cardData = useSelector(state => state.commonReducer.item);

  const [searchData, setSearchData] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [products, setProducts] = useState([]);
  console.log(
    '🚀 ~ file: HomeScreen.js:36 ~ HomeScreen ~ products:',
    products.length,
  );
  const scrollViewRef = useRef();
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoriesData);
  const [categoryId, setCategoryId] = useState(null);
  console.log(
    '🚀 ~ file: HomeScreen.js:45 ~ HomeScreen ~ categoryId:',
    categoryId,
  );
  const [loadMore, setLoadMore] = useState(false);
  const [categoryType, setCategoryType] = useState('');
  console.log(
    '🚀 ~ file: HomeScreen.js:48 ~ HomeScreen ~ categoryType:',
    categoryType,
  );
  const [pageNum, setPageNum] = useState(1);
  console.log('🚀 ~ file: HomeScreen.js:45 ~ HomeScreen ~ pageNum:', pageNum);
  const [getMore, setGetMore] = useState(false);

  const searchProduct = async value => {
    const url =
      categoryType == 'category'
        ? `auth/product_category/${categoryId}?page=${pageNum}`
        : categoryType == 'sub'
        ? `auth/product_sub_category/${categoryId}?page=${pageNum}`
        : categoryType == 'child' &&
          `auth/product_child_category/${categoryId}?page=${pageNum}`;
    console.log('Url is heree =========', url);
    value == 'loadMore' ? setLoadMore(true) : setisLoading(true);
    const response = await Get(url, token);
    value == 'loadMore' ? setLoadMore(false) : setisLoading(false);

    if (response != undefined) {
      value == 'loadMore'
        ? setProducts(prev => [...prev, response?.data?.data?.data])
        : setProducts(response?.data?.data?.data);
    }
    console.log(
      '🚀 ~ file: HomeScreen.js:44 ~ searchProduct ~ response:',
      response?.data,
    );
  };

  const getCategories = async () => {
    const url = 'auth/category/list';
    setisLoading(true);
    const response = await Get(url, token);
    setisLoading(false);
    if (response != undefined) {
      setCategoriesData(response?.data?.data);
    }
  };

  const getData = async type => {
    console.log('🚀 ~ file: HomeScreen.js:79 ~ getData ~ type:', type);
    const url = `auth/products?page=${pageNum}`;
    type == 'LoadMore' ? setLoadMore(true) : setisLoading(true);
    const response = await Get(url, token);
    type == 'LoadMore' ? setLoadMore(false) : setisLoading(false);

    if (response != undefined) {
      // console.log(
      //   '🚀 ~ file: HomeScreen.js:82 ~ getData ~ response:',
      //   response?.data,
      // );
      if (type == 'LoadMore') {
        setProducts(prev => [...prev, ...response?.data?.data?.data]);
      } else {
        setProducts(response?.data?.data?.data);
      }
    }
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 10;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const handleScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const maxOffset =
      event.nativeEvent.contentSize.height -
      event.nativeEvent.layoutMeasurement.height;
    console.log(
      '🚀 ~ file: HomeScreen.js:88 ~ handleScroll ~ currentOffset:',
      currentOffset,
      maxOffset,
    );

    if (currentOffset >= maxOffset) {
      setPageNum(prev => prev + 1);
    }
  };

  useEffect(() => {
    setPageNum(1);
  }, [categoryId]);

  useEffect(() => {
    if (pageNum > 1) {
      getData('LoadMore');
    }
  }, [pageNum]);

  useEffect(() => {
    getData('initial');
    getCategories();
  }, []);

  useEffect(() => {
    if (categoryId != null && categoryType != '') {
      pageNum == 1 ? searchProduct() : searchProduct('loadMore');
    }
  }, [pageNum, categoryType]);

  const categories = [
    {
      name: 'All',
      image2: require('../Assets/Images/perfume1.png'),
      image: require('../Assets/Images/perfume.png'),
      onPress: () => {
        console.log('here');
      },
    },
    {
      name: 'Dress',
      image: require('../Assets/Images/face-cream.png'),
      image2: require('../Assets/Images/face-cream1.png'),
      onPress: () => {
        console.log('here');
        navigationService.navigate('Dresses');
      },
    },
    {
      name: 'T-shirt',
      image: require('../Assets/Images/makeup.png'),
      image2: require('../Assets/Images/makeup1.png'),
      onPress: () => {
        console.log('here');
      },
    },
    {
      name: 'jeans',
      image: require('../Assets/Images/hair-care.png'),
      image2: require('../Assets/Images/hair-care1.png'),
      onPress: () => {
        console.log('here');
      },
    },
    {
      name: 'shoes',
      image: require('../Assets/Images/spa.png'),
      image2: require('../Assets/Images/spa1.png'),
      onPress: () => {
        console.log('here');
      },
    },
    {
      name: 'shoes',
      image: require('../Assets/Images/candles.png'),
      image2: require('../Assets/Images/candles1.png'),
      onPress: () => {
        console.log('here');
      },
    },
    {
      name: 'shoes',
      image: require('../Assets/Images/surprise.png'),
      image2: require('../Assets/Images/surprise1.png'),
      onPress: () => {
        console.log('here');
      },
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

  const newArrivals = [
    {
      id: 1,
      Title: 'Oversize Dress',
      subTitle: 'Oversize',
      price: 14.0,
      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
      qty: 1,
      colors: [
        '#4e86c2',
        '#2c4973',
        '#1ABFBC',
        '#C8CDD2',
        '#ECECEC',
        '#313436',
      ],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      cotton: 1,
      selectedSize: '',
      selectedColor: '',
      totalQty: 18,
      images: [
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
    },
    {
      id: 2,
      Title: 'Blue Dress',
      subTitle: 'Slim Fit',
      price: 15.0,
      img: require('../Assets/Images/Image.png'),
      like: false,
      qty: 1,
      colors: [
        '#4e86c2',
        '#2c4973',
        '#1ABFBC',
        '#C8CDD2',
        '#ECECEC',
        '#313436',
      ],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      cotton: 1,
      selectedSize: '',
      selectedColor: '',
      totalQty: 18,
      images: [
        require('../Assets/Images/Image.png'),
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
    },
    {
      id: 3,
      Title: 'Elegant Dress',
      subTitle: 'Slim Fit',
      price: 4.5,
      img: require('../Assets/Images/image3.png'),
      like: true,
      qty: 1,
      colors: [
        '#4e86c2',
        '#2c4973',
        '#1ABFBC',
        '#C8CDD2',
        '#ECECEC',
        '#313436',
      ],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      cotton: 1,
      selectedSize: '',
      selectedColor: '',
      totalQty: 18,
      images: [
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
    },
    {
      id: 4,
      Title: 'White Dress',
      subTitle: 'Oversize',
      price: 6.9,
      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
      qty: 1,
      colors: [
        '#4e86c2',
        '#2c4973',
        '#1ABFBC',
        '#C8CDD2',
        '#ECECEC',
        '#313436',
      ],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      cotton: 1,
      selectedSize: '',
      selectedColor: '',
      totalQty: 18,
      images: [
        require('../Assets/Images/Mask3.png'),
        require('../Assets/Images/Image.png'),
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
    },
    {
      id: 5,
      Title: 'Red Dress',
      subTitle: 'Oversize',
      price: 8.94,
      img: require('../Assets/Images/Image.png'),
      like: false,
      qty: 1,
      colors: [
        '#4e86c2',
        '#2c4973',
        '#1ABFBC',
        '#C8CDD2',
        '#ECECEC',
        '#313436',
      ],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      cotton: 1,
      selectedSize: '',
      selectedColor: '',
      totalQty: 18,
      images: [require('../Assets/Images/Mask2.png')],
    },
    {
      id: 6,
      Title: 'Black Dress',
      subTitle: 'Oversize',
      price: 18.5,
      img: require('../Assets/Images/Image.png'),
      like: true,
      qty: 1,
      colors: [
        '#4e86c2',
        '#2c4973',
        '#1ABFBC',
        '#C8CDD2',
        '#ECECEC',
        '#313436',
      ],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      cotton: 1,
      selectedSize: '',
      selectedColor: '',
      totalQty: 18,
      images: [
        require('../Assets/Images/Image.png'),
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
    },
  ];

  return (
    <>
      <CustomStatusBar backgroundColor={'#FDFDFD'} barStyle={'dark-content'} />
      <Header
        showLeft={true}
        leftName={'menu'}
        leftType={Feather}
        title={'Home'}
        showRight={true}
        rightName={'shopping-bag'}
        rightType={Feather}
        textStyle={{fontSize: moderateScale(18, 0.6)}}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            setPageNum(prev => prev + 1);
            setGetMore(true);
          }
        }}
        scrollEventThrottle={400}
        style={{
          height: windowHeight,
          width: windowWidth,
          alignSelf: 'center',
          // paddingBottom:moderateScale(10,.6),
          backgroundColor: '#FDFDFD',
        }}
        contentContainerStyle={{
          paddingHorizontal: moderateScale(10, 0.6),
        }}>
        <CustomText
          style={{
            fontSize: moderateScale(24, 0.6),
            color: Color.themeColor,
            textAlign: 'left',
            width: windowWidth,
            height: windowHeight * 0.04,
          }}
          isBold>
          Fashion Store
        </CustomText>

        <SearchContainer
          width={windowWidth * 0.95}
          input
          inputStyle={{
            height: windowHeight * 0.05,
          }}
          style={{
            height: windowHeight * 0.06,
            marginTop: moderateScale(13, 0.3),
            borderRadius: moderateScale(20, 0.3),
            alignSelf: 'center',
          }}
          data={searchData}
          placeHolder={'What Do You need ?'}
          setData={setSearchData}
          rightIcon
          setCategoryModal={setCategoryModalVisible}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: windowWidth * 0.95,
            marginTop: moderateScale(23, 0.3),
          }}>
          <CustomText
            style={{
              fontSize: moderateScale(16, 0.6),
              color: 'black',
            }}
            isBold>
            Categories
          </CustomText>
          <CustomText
            onPress={() => {
              navigationService.navigate('SeeAllScreen');
            }}
            style={{
              color: Color.themeColor,
              borderRadius: moderateScale(20, 0.6),
              backgroundColor: '#FBCEB1',
              fontSize: moderateScale(12, 0.6),
              padding: moderateScale(5, 0.6),
            }}
            isBold>
            See all
          </CustomText>
        </View>
        <FlatList
          data={categoriesData}
          onEndReached={() => {}}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: moderateScale(10, 0.6)}}
          renderItem={({item, index}) => {
            return (
              <>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    width: windowWidth * 0.16,
                    marginHorizontal: moderateScale(3, 0.3),
                  }}
                  onPress={() => {
                    setSelectedCategory(item?.title);
                    setCategoryType('category');
                    setCategoryId(item?.id);
                    categories[index]?.onPress;
                    item?.sub_categories.length > 0 &&
                      setCategoryModalVisible(true);
                  }}>
                  <LinearGradient
                    style={{
                      height: moderateScale(52, 0.6),
                      width: moderateScale(52, 0.6),
                      borderRadius: moderateScale(10, 0.6),
                      marginHorizontal: moderateScale(10, 0.6),
                      padding: moderateScale(5, 0.6),
                    }}
                    colors={
                      selectedCategory == item?.title
                        ? Color.themeBgColor
                        : ['#F4F4F4', '#F4F4F4']
                    }>
                    <CustomImage
                      source={
                        selectedCategory == item?.title
                          ? categories[index]?.image
                          : categories[index]?.image2
                      }
                      style={{width: '100%', height: '100%'}}
                      onPress={() => {
                        setSelectedCategory(item?.title);
                        setCategoryType('category');
                        setCategoryId(item?.id);
                        categories[index]?.onPress;
                        item?.sub_categories.length > 0 &&
                          setCategoryModalVisible(true);
                      }}
                    />
                  </LinearGradient>
                  <CustomText style={{color: 'black'}}>
                    {item?.title}
                  </CustomText>
                </TouchableOpacity>
              </>
            );
          }}
        />

        <View
          style={{
            height: windowHeight * 0.16,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ScrollView
            style={{
              flexDirection: 'row',
              width: windowWidth,
              marginTop: moderateScale(20, 0.3),
              height: windowHeight * 0.1,
            }}
            contentContainerStyle={{
              paddingHorizontal: moderateScale(10, 0.6),
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {specialOffers.map((item, index) => {
              return (
                <LinearGradient
                  style={styles.icons}
                  colors={Color.themeBgColor}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}>
                  <View>
                    <CustomText
                      style={{
                        color: 'white',
                        textAlign: 'left',
                        width: windowWidth * 0.45,
                        fontSize: moderateScale(14, 0.6),
                      }}>
                      {item?.title}
                    </CustomText>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: windowWidth * 0.45,
                        alignItems: 'center',
                      }}>
                      <CustomText
                        style={{
                          color: 'white',
                          textAlign: 'left',
                          fontSize: moderateScale(25, 0.6),
                        }}>
                        {item?.off}
                      </CustomText>
                      <CustomText
                        style={{
                          color: 'white',
                          textAlign: 'left',
                          fontSize: moderateScale(12, 0.6),
                        }}>
                        off
                      </CustomText>
                    </View>

                    <CustomText
                      style={{
                        color: 'white',
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
          }}>
          <CustomText
            style={{
              fontSize: moderateScale(16, 0.6),
              color: 'black',
            }}
            isBold>
            New Arrivals
          </CustomText>
          <CustomText
            style={{
              color: 'black',
              borderRadius: moderateScale(20, 0.6),
              fontSize: moderateScale(12, 0.6),
              paddingVertical: moderateScale(5, 0.6),
            }}>
            See all collection
          </CustomText>
        </View>

        {isLoading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: windowHeight * 0.4,
            }}>
            <ActivityIndicator color={Color.themeColor} size={'large'} />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{
              alignSelf: 'center',
              paddingBottom: moderateScale(50, 0.6),
              marginTop: moderateScale(5, 0.3),
            }}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={products}
            renderItem={({item, index}) => {
              return <ProductCard item={item} key={index} />;
            }}
            ListEmptyComponent={() => {
              return (
                <NoData
                  style={{
                    width: windowWidth * 0.95,
                    height: windowHeight * 0.4,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              );
            }}
            ListFooterComponent={() => {
              return (
                loadMore && (
                  <View
                    style={{
                      alignSelf: 'center',
                      marginTop: moderateScale(10, 0.3),
                    }}>
                    <ActivityIndicator
                      size={moderateScale(25, 0.6)}
                      color={Color.themeColor}
                    />
                  </View>
                )
              );
            }}
          />
        )}
        <CategoriesModal
          setCategoryId={setCategoryId}
          setCategoryType={setCategoryType}
          isVisible={categoryModalVisible}
          setIsVisible={setCategoryModalVisible}
          categoryData={categoriesData?.find(
            item => item?.title == selectedCategory,
          )}
        />
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  categoryContainer: {
    height: windowHeight * 0.09,
    backgroundColor: 'green',
    marginTop: moderateScale(20, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icons: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.12,
    borderRadius: moderateScale(20, 0.6),
    marginRight: moderateScale(10, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
  },
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
});
