import { createSlice, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    isLoading: true,
    userName: null,
    userToken: null,
  },
  reducers: {
    signIN: (state, action) => {
      // setUserToken("abc");
      // setLoading(false);
      let userToken = "abc";
      state.isLoading = false;
      state.userToken = userToken;
      try {
        AsyncStorage.setItem("userToken", userToken);
      } catch (e) {
        console.log(e);
      }
    },
    signOUT: (state, action) => {
      // setUserToken("abc");
      // setLoading(false);

      state.isLoading = false;
      state.userToken = null;
    },
  },
});

export const { signIN, signOUT, Retrive } = counterSlice.actions;

export const store = configureStore({
  reducer: counterSlice.reducer,
});
