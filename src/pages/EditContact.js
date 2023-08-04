import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import InputData from "../components/InputData";
import TaskService from "../config/service";
import { useNavigation } from "@react-navigation/native";

const EditContact = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();

  const [contact, setContact] = useState();

  const getTask = async () => {
    try {
      const data = await TaskService.getTask(id);
      setContact({
        name: data.data().name,
        phoneNumber: data.data().phoneNumber,
        address: data.data().address,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTask();
  }, [id]);

  handleChange = (key, value) => {
    setContact((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const onSubmit = async () => {
    if (contact.name && contact.phoneNumber && contact.address) {
      try {
        await TaskService.updateContact(id, contact).then(() => {
          Alert.alert("Kontak telah Diupdate");
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
        value={contact?.name}
        keys={"name"}
      />
      <InputData
        label={"No HP :"}
        placeholder={"Masukan Nomer HP"}
        onChangeText={handleChange}
        value={contact?.phoneNumber}
        keys={"phoneNumber"}
        type={"number-pad"}
      />
      <InputData
        label={"Alamat :"}
        placeholder={"Masukan Alamat"}
        isTextArea={true}
        onChangeText={handleChange}
        value={contact?.address}
        keys={"address"}
      />

      <TouchableOpacity style={styles.submit} onPress={onSubmit}>
        <Text style={styles.labelSubmit}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditContact;

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
