import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  categories: [],
  categoryProperties: [],
  financeBreakDown: [],
  notification: false,
  selectedRole: '',
  item: [],
  quantity: 1,
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
    setNotification(state, action) {
      state.notification = action.payload;
    },
    setSelectedRole(state, action) {
      state.selectedRole = action.payload;
    },
    AddToCart(state, action) {
     
      state.item.push({...action.payload, size_id : {} });
    },
    EmptyCart(state, action) {
      state.item = [];
    },
    RemoveFromCart(state, action) {
      state.item = state.item.filter(
        (item, index) => item?.id != action.payload?.id,
      );
    },
    increamentQuantity(state, action) {
      const increment = state.item.findIndex(
        (item, index) => item?.id == action.payload,
      );
      if (increment != -1) {
        if (state.item[increment].stock >= state.item[increment].quantity){
          state.item[increment].quantity++;
        }
      }
    },
    decrementQuantity(state, action) {
      const decrement = state.item.findIndex(
        (item, index) => item?.id == action.payload,
      );
      if (decrement != -1) {
        if (state.item[decrement].quantity > 1) {
          state.item[decrement].quantity--;
        }
      }
    },
    selectedProductSize(state, action){
      let item = state.item.find(item=> item?.id == action.payload.id)
      if(item){
        item.size_id = action.payload.item
        
      }
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
  selectedProductSize,
  setLiked,
  EmptyCart,
} = CommonSlice.actions;

export default CommonSlice.reducer;
