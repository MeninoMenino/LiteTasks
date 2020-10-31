import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Paragraph } from "react-native-paper";

import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

export default function TaskList({ data, handleDelete }) {
  return (
    <Animatable.View
      style={styles.container}
      animation="bounceIn"
      useNativeDriver
    >
      <TouchableOpacity onPress={() => handleDelete(data)}>
        <Ionicons name="md-checkmark-circle" size={30} color="#121212" />
      </TouchableOpacity>
      <View style={styles.textContent}>
        <View>
          <Paragraph style={styles.task}>{data.task}</Paragraph>
        </View>
        <View>
          <Text style={styles.taskDateTime}>{data.dateTime}</Text>
        </View>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 7,
    elevation: 1.5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  task: {
    flex: 1,
    color: "#121212",
    fontSize: 20,
    paddingLeft: 8,
    paddingRight: 28,
  },
  taskDateTime: {
    color: "#929693",
    fontSize: 15,
    paddingLeft: 8,
  },
});
