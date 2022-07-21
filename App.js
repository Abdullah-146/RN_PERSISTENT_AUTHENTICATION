import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useReducer,
} from "react";
import {
  Text,
  View,
  LogBox,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import axios from "axios";
import { AuthCotext } from "./components/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, signIN } from "./redux/userSlice";
import Main from "./Main";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {
  // const [userToken, setUserToken] = useState(null);
  // const [loading, setLoading] = useState(true);

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  transition: {
    alignItems: "center",
    justifyContent: "center",

    flex: 1,
    width: 130,
    borderRadius: 10,
  },
});
