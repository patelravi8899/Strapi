import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../Store/store";
import { HYDRATE } from "next-redux-wrapper";
import { async } from "q";
import { fetchQuery } from "../../utils";
import axios from "axios";
import { addTocartThunk, getcartThunk, removeFromcartThunk } from "../Thunk/Thunk";

// Type for our state
export interface CartState {
  // products: [
  //   {
  //     slug: string;
  //     quantity: number;
  //   }
  // ];
  status: string;
  slugs: Array<string>;
  slugsId:Array<{slugName:string,id:Array<number>}>;
  totalPrice: number;
}

// Initial state
const initialState: CartState = {
  // products: [
  //   {
  //     slug: "",
  //     quantity: 0,
  //   },
  // ],
  status: "",
  slugs: [],
  slugsId:[],
  totalPrice: 0,
};



// Actual Slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to set the authentication status
    addTocart(state, { payload }) {
      // const newSlugs:string = payload.slug
      state.slugs.push(payload);
    },
    setTotal(state,{payload}){
      state.totalPrice = payload
    }
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder
      .addCase(addTocartThunk.pending, (state, { payload }) => {
        state.status = "pending";
      })
      .addCase(addTocartThunk.fulfilled, (state, { payload }) => {
        state.status = "fulfilled";
        console.log(payload)
       state.slugs.push(payload.data.attributes.productSlug)

       const index = state.slugsId.findIndex(item=>item.slugName === payload.data.attributes.productSlug)
       if(index != -1){
        state.slugsId[index].id.push(payload.data.id)
       }else{
        state.slugsId.push({slugName:payload.data.attributes.productSlug, id:[payload.data.id]})
       }
      })
      .addCase(addTocartThunk.rejected, (state, { payload }) => {
        state.status = "rejected";
      })
      .addCase(getcartThunk.pending, (state, { payload }) => {
        state.status = "pending";
      })
      .addCase(getcartThunk.fulfilled, (state, { payload }) => {
        state.status = "fulfilled";
        console.log(payload)
        if(state.slugs.length !== payload.data.length){
        payload.data.forEach((element:any)=>{
          console.log(element.attributes.productSlug)
          const index:number = state.slugsId.findIndex(item=>item.slugName === element.attributes.productSlug)
          if(index != -1) state.slugsId[index].id.push(element.id)
          else state.slugsId.push({slugName:element.attributes.productSlug,id:[element.id]})
          state.slugs.push(element.attributes.productSlug)
        })
      }
      })
      .addCase(getcartThunk.rejected, (state, { payload }) => {
        state.status = "rejected";
      })
      .addCase(removeFromcartThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removeFromcartThunk.fulfilled, (state, { payload }) => {
        state.status = "fulfilled";
        if(payload.data.id){
          state.slugs.splice(state.slugs.findIndex(item=>item === payload.data.attributes.productSlug),1)
          state.slugsId.filter(item=>item.slugName === payload.data.attributes.productSlug)[0].id.splice(0,1)
        }
        console.log(payload)
      })
      .addCase(removeFromcartThunk.rejected, (state, { payload }) => {
        state.status = "rejected";
      });
  },
  // extraReducers: {
  //   [addTocartThunk.pending]: (state) => {
  //     state.status = "pending";
  //   },
  //   [addTocartThunk.fulfilled]: (state, { payload }) => {
  //     state.status = "fulfilled";
  //     console.log(payload)
  //     // state.slugs
  //   },
  //   [addTocartThunk.rejected]: (state, { payload }) => {
  //     state.status = "rejected";
  //   },
  //   [getcartThunk.pending]: (state) => {
  //     state.status = "pending";
  //   },
  //   [getcartThunk.fulfilled]: (state, { payload }) => {
  //     state.status = "fulfilled";
  //     console.log(payload)
  //     payload.data.forEach((element:any)=>{
  //       console.log(element.attributes.productSlug)
  //       state.slugs.push(element.attributes.productSlug)
  //     })
  //   },
  //   [getcartThunk.rejected]: (state, { payload }) => {
  //     state.status = "rejected";
  //   },
  // },
});

export const { addTocart,setTotal } = cartSlice.actions;

export const getCartInfo = (state: AppState) => state.cart;

export default cartSlice.reducer;
