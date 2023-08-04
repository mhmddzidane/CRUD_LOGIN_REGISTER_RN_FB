import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const InputData = ({
  label,
  placeholder,
  type,
  isTextArea,
  onChangeText,
  value,
  keys,
}) => {
  if (isTextArea) {
    return (
      <>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          placeholder={placeholder}
          style={styles.textArea}
          keyboardType={type}
          multiline={true}
          numberOfLines={4}
          value={value}
          onChangeText={(text) => onChangeText(keys, text)}
        />
      </>
    );
  }

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.textInput}
        keyboardType={type}
        value={value}
        onChangeText={(text) => onChangeText(keys, text)}
      />
    </>
  );
};

export default InputData;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: "top",
  },
});
