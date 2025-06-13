import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Prisplan({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prisplan</Text>
      <Text style={styles.text}>
        🎓 Du får 3 gratis lektioner.
        {"\n\n"}📅 Därefter: 99 kr/mån tills du avslutar.
        {"\n\n"}❌ Inga dolda avgifter.
        {"\n\n"}📱 Max 1 person per enhet.
      </Text>

      <Button title="Tillbaka" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 28, marginBottom: 20, textAlign: "center" },
  text: { fontSize: 18, lineHeight: 28, marginBottom: 30 },
});
