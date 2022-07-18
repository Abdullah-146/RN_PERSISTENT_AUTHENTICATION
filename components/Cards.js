import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Cards = ({ description, title }) => {
  return (
    <View
      style={{
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View style={{ width: "85%", backgroundColor: "#EFF7FF" }}>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>{title} :</Text>
        <Text style={{ fontSize: 14 }}>{description} :</Text>
      </View>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({});
