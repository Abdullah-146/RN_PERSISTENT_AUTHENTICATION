import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import Cards from "../components/Cards";
import { AuthCotext } from "../components/Context";
import axios from "axios";

console.log("hy");

const Home = () => {
  const [array, setarray] = useState([]);
  const { signOut } = useContext(AuthCotext);
  // useEffect(() => {
  //   const unsubscribe = () => {};
  //   return () => unsubscribe();
  // }, []);

  useLayoutEffect(() => {
    const unsubscribe = () => {};
    axios
      .get("https://jsonplaceholder.typicode.com/Posts")
      .then(
        (res) => setarray(res.data),
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => console.log(error));
    console.log("hello");

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        data={array}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => (
          <Cards description={item.body} title={item.title} />
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
