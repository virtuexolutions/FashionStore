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
      
      const itemId = action.payload.id;
      const item = state.cart.find(item => item.id === itemId);
      if(item){
        item.qty++ ;
      }
      else{
        
        state.cart.push(action.payload);

      }
 
    },

    RemoveToCart(state, action) {
      const itemId = action.payload.id;
      state.cart = state.cart.filter((item, index) => item.id !== itemId);
    },

    

    increamentQuantity(state, action) {
      const itemId = action.payload.id;
      const itemAddCart = state.cart.find(item => item.id === itemId);

      if (itemAddCart) {
        itemAddCart.qty++;
      }
    },
    decrementQuantity(state, action) {
      const itemId = action.payload.id;
      const itemAddCart = state.cart.find(item => item.id === itemId);

      if (itemAddCart) {
        if(itemAddCart.qty>=1){
          itemAddCart.qty--;

        }
        else if(itemAddCart==1){
          state.cart = state.cart.filter((item, index) => item.id !== action.payload.id);
        }
      }
    },
    setColor(state,action){
      console.log(action.payload)
      const itemId = action.payload.id;
      const item = state.cart.find(item => item.id === itemId);
       if(item){

         item.selectedColor = action.payload.colors
       }
    },
    setSize(state,action){
      console.log(action.payload)
      const itemId = action.payload.id;
      const item = state.cart.find(item => item.id === itemId);
       if(item){

         item.selectedSize = action.payload.size
       }
    }, 
    setCotton(state, action){
      const itemId = action.payload.id;
      const item = state.cart.find(item => item.id === itemId);
      if(item){
        item.cotton += action.payload.val; 
      }
    },
    setLiked(state,action){
      console.log(action.payload)
      const itemId = action.payload.id;
      const item = state.cart.find(item => item.id === itemId);
      if(item){
        item.like = action.payload.liked
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
  RemoveToCart,
  setColor,
  setSize,
  setCotton,
  setLiked
} = CommonSlice.actions;

export default CommonSlice.reducer;
