import { View, Text, Button, Image, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function HomeScreen() {
  const router = useRouter();
  const auth = getAuth();
  const [images, setImages] = useState<string[]>([]);

  const imageDir = FileSystem.documentDirectory + "images/";

  // Tarkista, onko kansio olemassa ja luo, jos ei ole
  const ensureDirExist = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imageDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imageDir, { intermediates: true });
    }
  };

  // Ota kuva ja tallenna se
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Kameran käyttö estetty.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      await ensureDirExist();
      const fileName = `suukuva_${Date.now()}.jpg`;
      const newUri = imageDir + fileName;

      await FileSystem.moveAsync({
        from: result.assets[0].uri,
        to: newUri,
      });

      // Päivitä kuvat listaamalla kansiossa olevat kuvat
      loadImages();
    }
  };

  // Lataa kaikki tallennetut kuvat
  const loadImages = async () => {
    await ensureDirExist();
    const files = await FileSystem.readDirectoryAsync(imageDir);
    const fileUris = files.map((file) => imageDir + file);
    setImages(fileUris);
  };

  // Poista kuva
  const deleteImage = async (uri: string) => {
    await FileSystem.deleteAsync(uri);
    loadImages(); // Lataa kuvat uudelleen
  };

  // Lataa kuvat alussa
  useEffect(() => {
    loadImages();
  }, []);

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

      <ScrollView style={styles.imageList}>
        {images.length > 0 ? (
          images.map((uri, index) => (
            <View key={index} style={styles.imageItem}>
              <Image source={{ uri }} style={styles.image} />
              <Button title="Poista" onPress={() => deleteImage(uri)} />
            </View>
          ))
        ) : (
          <Text>Ei kuvia löytynyt.</Text>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Kirjaudu ulos" onPress={handleLogout} />
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
    backgroundColor: "#d8f3dc",
  },
  buttonContainer: {
    marginVertical: 10,
  },
  imageList: {
    width: "100%",
    marginTop: 20,
  },
  imageItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});
