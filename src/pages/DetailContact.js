import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TaskService from "../config/service";

const DetailContact = ({ route }) => {
  const { id } = route.params;

  const [contact, setContact] = useState();

  const getTask = async () => {
    try {
      const data = await TaskService.getTask(id);
      setContact(data.data());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTask();
  }, [id]);

  return (
    <View style={styles.pages}>
      <Text>Nama : </Text>
      <Text style={styles.text}>{contact?.name}</Text>
      <Text>No HP : </Text>
      <Text style={styles.text}>{contact?.phoneNumber}</Text>
      <Text>Alamat : </Text>
      <Text style={styles.text}>{contact?.address}</Text>
    </View>
  );
};

export default DetailContact;

const styles = StyleSheet.create({
  pages: {
    padding: 20,
    margin: 30,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
