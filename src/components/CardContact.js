import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import TaskService from "../config/service";

const CardContact = ({ contact, getTasks }) => {
  const navigation = useNavigation();

  const removeContact = (id) => {
    Alert.alert("Info", "Anda yakin ingin menghapus kontak ini?", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel pressed"),
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () =>
          TaskService.deleteContact(id).then(() => {
            getTasks();
          }),
      },
    ]);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("DetailContact", { id: contact.id })}
    >
      <View>
        <Text style={styles.nama}>{contact.name}</Text>
        <Text style={styles.noHp}>No HP : {contact.phoneNumber}</Text>
      </View>
      <View style={styles.icon}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditContact", { id: contact.id })}
        >
          <FontAwesomeIcon icon={faEdit} color={"blue"} size={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeContact(contact.id)}>
          <FontAwesomeIcon icon={faTrash} color={"red"} size={25} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CardContact;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  nama: {
    fontWeight: "bold",
    fontSize: 16,
  },
  noHp: {
    fontSize: 12,
    color: "gray",
  },
  icon: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
});
