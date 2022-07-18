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

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {
  // const [userToken, setUserToken] = useState(null);
  // const [loading, setLoading] = useState(true);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...prevState,
          userToken: action.token,
          userName: action.id,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          isLoading: false,
          userName: null,
          userToken: null,
        };
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const out = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
    } catch (e) {
      console.log(e);
    }
  };

  const authContext = useMemo(() => ({
    signIN: async () => {
      // setUserToken("abc");
      // setLoading(false);
      let userToken = "abc";
      try {
        await AsyncStorage.setItem("userToken", userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "LOGIN", token: userToken });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "LOGOUT" });
    },
  }));

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken", userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken, id: "abd" });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
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
    <AuthCotext.Provider value={authContext}>
      <NavigationContainer>
        {!loginState.userToken ? (
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
                        dispatch({ type: "LOGOUT" });
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
    </AuthCotext.Provider>
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
