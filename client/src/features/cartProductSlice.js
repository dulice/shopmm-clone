import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const cartItems = JSON.parse(localStorage.getItem('cartItems'));
const price = JSON.parse(localStorage.getItem('productsPrice'));
const sumPrice = JSON.parse(localStorage.getItem('totalPrice'));
const userAddress = JSON.parse(localStorage.getItem('address')) || {};

export const discountAmount = (price, discount) => {
    let result = price - (price * discount) / 100;
    if(discount > 0 ) {
      return result;
    } else {
      return price;
    }
  };

  export const randomProduct = (arr, num) => {
    const randomArr = arr.sort(() => 0.5 - Math.random());
    return randomArr.slice(arr, num);
  };

const priceDetail = (state) => {
    let price = 0;
    const priceArr = state.items.map(item => {
        let itemPrice = discountAmount(item.price, item.discount) * item.quantity;
        price += itemPrice;
        return price;
    });
    state.productsPrice = priceArr[priceArr.length - 1] || 0 ;
    state.shippingFees = 2990;
    state.totalPrice = price + state.shippingFees;
    localStorage.setItem('productsPrice', JSON.stringify(state.productsPrice));
    localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
}

const cartProductSlice = createSlice({
    name: "cartItems",
    initialState: {
        items: cartItems ? cartItems : [],
        productsPrice: price ? price : 0,
        shippingFees: 2990,
        totalPrice: sumPrice ? sumPrice : 0,
        address: userAddress ? userAddress : {},
    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existIndex = state.items.findIndex(item => item._id === newItem._id);
            if(existIndex >= 0) {
                state.items[existIndex].quantity += 1;
            } else {
                const tempItem = {...newItem, quantity: 1}
                state.items.push(tempItem);
                toast.success(`Add "${tempItem.productName}" into cart.`);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items));
            priceDetail(state);
            
        },
        removeFromCart: (state, action) => {
            const currentItem = state.items.find(item => item._id === action.payload._id);
            if(state.items.length >= 0 ) {
                localStorage.removeItem("productsPrice");
            }
            if(currentItem.quantity > 1) {
                currentItem.quantity -= 1
                state.items = [...state.items];
            } else {
                const filterItem = state.items.filter(item => item._id !== action.payload._id);
                state.items = filterItem;
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items));
            priceDetail(state);            
        },
        addAddress: (state, action) => {
            state.address = action.payload;
            localStorage.setItem("address", JSON.stringify(state.address));
        },
        resetItems: (state, action) => {
            state.items = [];
            state.productsPrice = 0;
            state.totalPrice = 0;
            state.address = {};
            localStorage.removeItem('cartItems');
            localStorage.removeItem('productsPrice');
            localStorage.removeItem('totalPrice');
            localStorage.removeItem('address');
        }
    }
})

export const { addToCart, removeFromCart, addAddress, resetItems } = cartProductSlice.actions;
export default cartProductSlice.reducer;