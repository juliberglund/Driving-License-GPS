import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import { signsData } from "./signsData";
import { useRoute } from "@react-navigation/native";

export default function SignsCategory() {
  const route = useRoute();
  const { categoryId } = route.params;
  const category = signsData.find((cat) => cat.id === categoryId);

  const [selectedSign, setSelectedSign] = React.useState(null);

  if (!category) {
    return (
      <View style={styles.container}>
        <Text>Kategori hittades inte</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.name}</Text>
      <FlatList
        data={category.signs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setSelectedSign(item)}
          >
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.signName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!selectedSign} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContent}>
          {selectedSign && (
            <>
              <Image
                source={selectedSign.image}
                style={[styles.image, { height: 200 }]}
                resizeMode="contain"
              />
              <Text style={styles.modalTitle}>{selectedSign.name}</Text>
              <Text style={styles.modalDescription}>
                {selectedSign.description}
              </Text>
              <Button title="Stäng" onPress={() => setSelectedSign(null)} />
            </>
          )}
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#e0f7fa",
    borderRadius: 10,
    marginBottom: 15,
  },
  image: { width: 70, height: 70, marginRight: 15 },
  signName: { fontSize: 20, fontWeight: "600" },
  modalContent: {
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  modalTitle: { fontSize: 28, fontWeight: "bold", marginVertical: 20 },
  modalDescription: { fontSize: 18, textAlign: "center", marginBottom: 40 },
});
