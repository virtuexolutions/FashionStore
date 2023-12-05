import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  categories: [],
  categoryProperties: [],
  financeBreakDown: [],
  notification : false, 
  selectedRole : '',
  item:[]
  
};

const CommonSlice = createSlice({
  name: 'commonReducer',
  initialState: initialState,
  reducers: {
    setCategoryProperties(state, action) {
      state.categoryProperties = action?.payload;
      // console.log("reduxxxx", state.categoryProperties);
    },
    setUserData(state, action) {
      state.userData = action?.payload;
      // state.userData = action?.payload?.userData;
    },
    setUserLogOut(state, action) {
      state.userData = {};
    },
    setServiceCategories(state, action) {
      state.categories = action?.payload;
    },
    setFinanceBreakDown(state, action) {
      state.financeBreakDown = action.payload;
    },
    setNotification(state,action){
      state.notification = action.payload
    },
    setSelectedRole(state,action){
      state.selectedRole = action.payload
    },
    AddToCart(state,action){
      console.log("🚀 ~ file: common.js:42 ~ AddToCart ~ action:", action.payload)
      state.item.push(action.payload)
    },
    RemoveFromCart(state,action){
    state.item =  state.item.filter((item,index) => item?.id != action.payload?.id)
      // console.log("🚀 ~ file: common.js:47 ~ RemoveFromCart ~ action.payload:", action.payload)
    }
     
  },
});


export const {
  setUserData,
  setUserLogOut,
  setServiceCategories,
  setCategoryProperties,
  setFinanceBreakDown,
  setNotification,
  setSelectedRole,
  increamentQuantity,
  decrementQuantity,
  AddToCart,
  RemoveFromCart,
  setColor,
  setSize,
  setCotton,
  setLiked,
  EmptyCart
} = CommonSlice.actions;

export default CommonSlice.reducer;
