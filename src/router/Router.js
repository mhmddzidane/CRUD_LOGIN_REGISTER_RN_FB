import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import About from "../pages/AddContact";
import AddContact from "../pages/AddContact";
import DetailContact from "../pages/DetailContact";
import EditContact from "../pages/EditContact";

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddContact"
        component={AddContact}
        options={{ title: "Add Contact" }}
      />
      <Stack.Screen
        name="DetailContact"
        component={DetailContact}
        options={{ title: "Detail Contact" }}
      />
      <Stack.Screen
        name="EditContact"
        component={EditContact}
        options={{ title: "Edit Contact" }}
      />
    </Stack.Navigator>
  );
};

export default Router;
