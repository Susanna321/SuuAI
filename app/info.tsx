import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/header";

export default function TietojaScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Tietoja sovelluksesta</Text>
      <Text style={styles.text}>Tämä sovellus tallentaa kuvia paikallisesti.</Text>
      
      <View style={styles.buttonContainer}>
      <Button title="Takaisin" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#d8f3dc"
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
      },
      buttonContainer: {
        marginVertical: 10,
      },
      text: {
        marginBottom: 20,
        marginVertical: 10,
      },
});
