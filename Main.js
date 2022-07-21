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
import { store, signIN, signOUT, Retrive, load } from "./redux/userSlice";
import RNRestart from "react-native-restart";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {
  // const [userToken, setUserToken] = useState(null);
  // const [loading, setLoading] = useState(true);

  const dispactch = useDispatch();
  const token = useSelector((state) => state.userToken);
  const loading = useSelector((state) => state.isLoading);

  const [token2, settoken] = useState(token);
  console.log(token2);
  const [loading2, setLoading] = useState(loading);

  const out = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
    } catch (e) {
      console.log(e);
    }
    settoken(null);
  };

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        let res = await AsyncStorage.getItem("userToken", userToken);
        settoken(res);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }, 1000);
  }, []);

  if (loading && loading2) {
    return (
      <Text
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 200,
        }}
      >
        Loading...
      </Text>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        {!(token || token2) ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="signIn" component={Signin} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#EFF7FF",
                shadowOpacity: 0,
                elevation: 0,
              },
              headerTintColor: "black",
            }}
          >
            <Stack.Screen
              name="home"
              options={{
                title: "Hompage",
                headerRight: () => (
                  <LinearGradient
                    colors={["#76C28D", "#03ACA7"]}
                    style={{
                      width: 71,
                      height: 34,
                      alignItems: "center",
                      borderRadius: 10,
                      marginRight: 16,
                    }}
                  >
                    <Pressable
                      style={styles.transition}
                      onPress={() => {
                        dispactch(signOUT());
                        out();
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 12,
                          fontWeight: "600",
                        }}
                      >
                        LOGOUT
                      </Text>
                    </Pressable>
                  </LinearGradient>
                ),
              }}
              component={Home}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
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
