import { useNavigation } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputData from "../components/InputData";
import { db } from "../config/firebase";
import TaskService from "../config/service";

const AddContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });

  const navigation = useNavigation();

  handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const onSubmit = async () => {
    if (formData.name && formData.phoneNumber && formData.address) {
      try {
        await TaskService.addContact(formData).then(() => {
          Alert.alert("Kontak telah ditambahkan");
          navigation.navigate("Home");
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Mohon Lengkapi Data!");
    }
  };

  return (
    <View style={styles.page}>
      <InputData
        label={"Nama :"}
        placeholder={"Masukan Nama"}
        onChangeText={handleChange}
        value={formData.name}
        keys={"name"}
      />
      <InputData
        label={"No HP :"}
        placeholder={"Masukan Nomer HP"}
        onChangeText={handleChange}
        value={formData.phoneNumber}
        keys={"phoneNumber"}
        type={"number-pad"}
      />
      <InputData
        label={"Alamat :"}
        placeholder={"Masukan Alamat"}
        isTextArea={true}
        onChangeText={handleChange}
        value={formData.address}
        keys={"address"}
      />

      <TouchableOpacity style={styles.submit} onPress={onSubmit}>
        <Text style={styles.labelSubmit}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddContact;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 30,
  },
  submit: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  labelSubmit: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
