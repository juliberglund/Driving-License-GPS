import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { signsData } from "./signsData";
import { useNavigation } from "@react-navigation/native";

export default function Signs() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={() =>
        navigation.navigate("SignsCategory", { categoryId: item.id })
      }
    >
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Välj en kategori</Text>
      <FlatList
        data={signsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  categoryButton: {
    padding: 15,
    backgroundColor: "#2196F3",
    marginVertical: 8,
    borderRadius: 8,
  },
  categoryText: { color: "#fff", fontSize: 18, textAlign: "center" },
});
