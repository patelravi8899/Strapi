import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import {cartSlice} from "../Slice/cart";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

// const combinedReducer = combineReducers({
//   [cartSlice.name]: cartSlice.reducer,
// });

const makeStore = () =>
  configureStore({
    reducer: {
      [cartSlice.name]: cartSlice.reducer,
    },
    devTools: true,
  });

// const masterReducer = (state: any, action: any) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload,
//       [cartSlice.name]: cartSlice.getInitialState.,
//       // counter: {
//       //     count: state.counter.count + action.payload.counter.count,
//       // },
//       // users: {
//       //     users: [...action.payload.users.users, ...state.users.users]
//       // }
//     };
//     return nextState;
//   } else {
//     return combinedReducer(state, action);
//   }
// };

// const makeStore = () => {
//   configureStore({
//     reducer: masterReducer,
//     devTools: true,
//   });
// };

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
