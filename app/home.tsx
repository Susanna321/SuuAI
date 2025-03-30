import { View, Text, Button, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function HomeScreen() {
  const router = useRouter();
  const auth = getAuth();
  const [image, setImage] = useState<string | null>(null);

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Kameran käyttö estetty.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/"); // Vie takaisin kirjautumissivulle
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Ota kuva suustasi</Text>
        <View style={styles.buttonContainer}>
        <Button title="📷 Ota kuva" onPress={takePhoto} />
        </View>

      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />}
      <View style={styles.buttonContainer}>
      <Button title="Kirjaudu ulos" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#d8f3dc"
      },
    buttonContainer: {
        marginVertical: 10,
      },
});
