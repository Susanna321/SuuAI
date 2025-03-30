import { View, Text, Button, Image } from "react-native";
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
    router.replace("/"); // ✅ Vie takaisin kirjautumissivulle
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Ota kuva suustasi</Text>

      <Button title="📷 Ota kuva" onPress={takePhoto} />

      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />}

      <Button title="Kirjaudu ulos" onPress={handleLogout} />
    </View>
  );
}
