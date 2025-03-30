import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase"; // Firebase-config
import Header from "../components/header";

export default function LoginScreen() {
  const router = useRouter();
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/home"); // Vie käyttäjän Home-sivulle
    } catch (error: any) {  // 🔹 Lisätty "any" -tyyppi
      setError("Kirjautuminen epäonnistui: " + (error.message || "Tuntematon virhe"));
    }
  };
  

  const handleGoToRegister = () => {
    router.replace("/register"); // Siirtyy rekisteröitymissivulle
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Kirjaudu sisään</Text>
      <TextInput
        style={styles.input}
        placeholder="Sähköposti"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Salasana"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
      <Button title="Kirjaudu" onPress={handleLogin} />
      </View>

      <View style={styles.buttonContainer}>
      <Button title="Ei tiliä? Rekisteröidy" onPress={handleGoToRegister} />
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
    color: "#081C15",
  },
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2D6A4F",
    borderRadius: 5,
    color: "#081C15",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
