import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  cart:[],
  categories: [],
  categoryProperties: [],
  financeBreakDown: [],
  notification : false,
 
  selectedRole : '',
  
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


    AddToCart(state, action) {
      // console.log("data12",state.cart);
      state.cart.push(action.payload);
    },

    RemoveToCart(state, action) {
      const itemId = action.payload.id;
      state.cart = state.cart.filter((item, index) => item.id !== itemId);
    },


    
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
  RemoveToCart
} = CommonSlice.actions;

export default CommonSlice.reducer;
