// Homepage.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity, // <-- detta finns inte här
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Homepage() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");

  const handleContinue = () => {
    if (!name || !phone || !email || !card) {
      Alert.alert("Alla fält måste fyllas i.");
      return;
    }
    Alert.alert("Tack!", "Du har nu tillgång till dina 3 gratis lektioner.");
    navigation.navigate("ChooseActivity");
    // TODO: spara användardata, aktivera lektioner, starta prenumeration etc
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrering</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Prisplan")}>
        <Text style={styles.link}>Prisplan</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Namn"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Telefonnummer"
        keyboardType="phone-pad"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        placeholder="E-post"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Kortnummer (för debitering 99 kr/mån efter 3 lektioner)"
        keyboardType="numeric"
        style={styles.input}
        value={card}
        onChangeText={setCard}
      />

      <Button title="Fortsätt" onPress={handleContinue} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 28, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  link: {
    fontSize: 16,
    color: "#ACECAA",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "cursive",
  },
});
