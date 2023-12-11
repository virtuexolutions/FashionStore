import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationService from './navigationService';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './Screens/LoginScreen';
// import EnterPhone from './Screens/EnterPhone';
// import VerifyNumber from './Screens/VerifyNumber';
import ResetPassword from './Screens/ResetPassword';
import Signup from './Screens/Signup';
import ResetInstruction from './Screens/ResetInstructions';
import HomeScreen from './Screens/HomeScreen';
// import MyAccounts from './Screens/MyAccounts';
// import ChangePassword from './Screens/ChangePassword';
// import Support from './Screens/Support';
// import FriendRequest from './Screens/FriendRequest';
// import SeeAllScreen from './Screens/SeeAllScreen';
// import SelectedChat from './Screens/SelectedChat';
import Dresses from './Screens/Dresses';
import EnterPhone from './Screens/EnterPhone';
import VerifyNumber from './Screens/VerifyNumber';
import GetStarted from './Screens/GetStarted';
import WelcomeScreen from './Screens/WelcomeScreen';
import DressesDetail from './Screens/DressesDetail';
import CheckOutScreen from './Screens/CheckOutScreen';
import Drawer from './Screens/Drawer';
import ChangePassword from './Screens/ChangePassword';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FormScreen from './Screens/FormScreen';
import OrderScreen from './Screens/OrderScreen';
import Profile from './Screens/Profile';
import OrderDetails from './Screens/OrderDetails';


const AppNavigator = () => {
  // const isLogin = false;
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);

  // console.log('token>>>>', token);
  // console.log('isVerified', isGoalCreated);

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const firstScreen =
        token != null
        ? 'MyDrawer'
        : walkThrough == true ?
        'GetStarted' : 
        
        'WelcomeScreen';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
          <RootNav.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <RootNav.Screen name="FormScreen" component={FormScreen} />
          <RootNav.Screen name="OrderScreen" component={OrderScreen} />
          <RootNav.Screen name="OrderDetails" component={OrderDetails} />
          <RootNav.Screen name="CheckOutScreen" component={CheckOutScreen} />
          <RootNav.Screen name="DressesDetail" component={DressesDetail} />
          <RootNav.Screen name="Dresses" component={Dresses} />
          <RootNav.Screen name="GetStarted" component={GetStarted} />
          <RootNav.Screen name="ResetInstruction" component={ResetInstruction} />
          <RootNav.Screen name="MyDrawer" component={MyDrawer} />
          {/* <RootNav.Screen name="HomeScreen" component={HomeScreen} /> */}
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="EnterPhone" component={EnterPhone} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="Signup" component={Signup} />

         {/* 
          <RootNav.Screen
            name="NegotiatorPortfolio"
            component={NegotiatorPortfolio}
          />
          <Tabs.Screen name={'ChatScreen'} component={ChatScreen} />
      <Tabs.Screen name={'Settings'} component={Settings} /> */}

        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};


export const MyDrawer = () => {
  const DrawerNavigation = createDrawerNavigator();
  const firstScreen = 'HomeScreen';
  return (
    <DrawerNavigation.Navigator
      drawerContent={props => <Drawer {...props} />}
      initialRouteName={'HomeScreen'}
      screenOptions={{
        headerShown: false,
      }}>
      <DrawerNavigation.Screen name="HomeScreen" component={HomeScreen} />    
      <DrawerNavigation.Screen name="Profile" component={Profile} />    
      <DrawerNavigation.Screen name="ChangePassword" component={ChangePassword} />
    </DrawerNavigation.Navigator>
  );
};



export default AppNavigator;
