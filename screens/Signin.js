import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { AuthCotext } from "../components/Context";
import * as SQLite from "expo-sqlite";
import axios from "axios";
import { store, signIN } from "../redux/userSlice";
import { Provider, useSelector, useDispatch } from "react-redux";
import RNRestart from "react-native-restart";

const Signin = () => {
  const [selectedTab, setselectedTab] = useState(true);

  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);

  const dispactch = useDispatch();
  ///database

  let headers = {
    "Access-Control-Allow-Headers": "*",
    // "Access-Control-Allow-Origin": "*",
  };

  console.log(headers);

  const go = async () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(Email)) {
      axios
        .post("http://buddy.ropstambpo.com/api/login", {
          email: Email,
          password: Password,
          device_token: "zasdcvgtghnkiuhgfde345tewasdfghjkm",
        })
        .then(
          (res) => {
            if (res.data.data == null) {
              alert("Credentials not valid");
            } else if (res.data.data.user.email) {
              dispactch(signIN());
            } else {
              alert("Credentials not valid");
            }
          },

          (error) => console.log(error)
        )
        .catch((error) => console.log(error));
    } else {
      alert("EMAIL NOT VALID");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={{ width: "100%", alignItems: "center", marginTop: "20%" }}>
          <Image
            style={{ width: 100, height: 101, justifyContent: "center" }}
            source={require("../images/recordicon.png")}
          />
        </View>
        <View style={styles.memeberPostion}>
          <Text style={styles.memeber}> Already a member? </Text>
        </View>

        <Text style={{ marginLeft: 16, color: "#03ACA7" }}>
          Login back to access everything
        </Text>
        <View style={styles.tab}>
          <Pressable
            android_ripple={{ color: "black" }}
            onPress={() => setselectedTab(true)}
            style={({ pressed }) => ({
              flex: 1,
              backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
              borderColor: "#03ACA7",
              alignItems: "center",
              justifyContent: "center",
              borderBottomWidth: selectedTab ? 3 : 0,
            })}
          >
            <Text style={styles.email}>EMAIL</Text>
          </Pressable>
          <Pressable
            android_ripple={{ color: "black" }}
            onPress={() => setselectedTab(false)}
            style={({ pressed }) => ({
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
              borderColor: "#03ACA7",
              borderBottomWidth: selectedTab ? 0 : 3,
            })}
          >
            <Text style={styles.email}>PhoneNumber</Text>
          </Pressable>
        </View>
        <View style={{ marginLeft: 15, marginTop: 20 }}>
          <TextInput
            style={styles.TextInput}
            placeholder={selectedTab ? "Email" : "PhoneNumber"}
            onChangeText={setEmail}
            placeholderTextColor="#03ACA7"
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            onChangeText={setPassword}
            maxLength={8}
            placeholderTextColor="#03ACA7"
          />
        </View>
        <Pressable>
          <Text style={{ marginLeft: 19, color: "#19B4EA", marginTop: 15 }}>
            Forgot your Password?
          </Text>
        </Pressable>
        <LinearGradient
          colors={["#76C28D", "#03ACA7"]}
          style={{
            width: 100,
            height: 50,
            alignItems: "center",
            borderRadius: 10,
            alignSelf: "center",
            marginTop: 40,
          }}
        >
          <Pressable onPress={() => go()} style={styles.transition}>
            <Text>LOGIN</Text>
          </Pressable>
        </LinearGradient>
        <View style={{ alignItems: "center", marginTop: 13 }}>
          <Text style={{ color: "#C4C4C4" }}>or Login with</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          <View style={{ marginRight: 10 }}>
            <AntDesign name="google" size={40} color="black" />
          </View>
          <Entypo name="facebook-with-circle" size={40} color="black" />
          <View style={{ marginLeft: 10 }}>
            <AntDesign name="apple1" size={40} color="black" />
          </View>
        </View>
        <Pressable
          style={{ width: "100%", alignItems: "center", marginTop: "13%" }}
        >
          <Text style={{ color: "#19B4EA" }}>New to us? Register yourself</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  memeber: {
    fontSize: 20,
    fontWeight: "700",
  },
  memeberPostion: {
    marginLeft: 10,
    marginTop: "13%",
    marginBottom: 10,
  },
  email: {
    color: "#03ACA7",
    fontSize: 18,
  },
  emailpos: {},
  tab: {
    marginTop: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  TextInput: {
    fontSize: 20,
    padding: 10,
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
  },
  transition: {
    alignItems: "center",
    justifyContent: "center",

    flex: 1,
    width: 130,
    borderRadius: 10,
  },
});
