import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CardContact from "../components/CardContact";
import TaskService from "../config/service";

const Home = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);

  const getTasks = async () => {
    try {
      const data = await TaskService.getAllTasks();
      setContacts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.log(err);
      return;
    }
  };

  useEffect(() => {
    getTasks();

    const fetchOnFocus = () => {
      getTasks();
    };

    const unsubscribe = navigation.addListener("focus", fetchOnFocus);

    return unsubscribe;
  }, []);

  return (
    <View>
      <ScrollView>
        <View style={styles.page}>
          <StatusBar animated={true} backgroundColor="black" />
          <View style={styles.header}>
            <Text style={styles.title}>Daftar Kontak</Text>
            <View style={styles.garis} />
          </View>
          <View style={styles.listKontak}>
            {contacts ? (
              contacts?.map((contact) => (
                <CardContact
                  contact={contact}
                  key={contact.id}
                  getTasks={getTasks}
                />
              ))
            ) : (
              <Text>No Contact</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddContact")}
          style={styles.btnPlus}
        >
          <FontAwesomeIcon icon={faPlus} size={20} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  garis: {
    borderWidth: 1,
    marginTop: 10,
  },
  listKontak: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 30,
  },
  btnPlus: {
    padding: 20,
    borderRadius: 30,
    backgroundColor: "skyblue",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
