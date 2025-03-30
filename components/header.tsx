import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>SuuAI</Text>
      <TouchableOpacity onPress={() => router.push("../info")}>
        <Text style={styles.headerLink}>Tietoja</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#52B788",
    },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "auto",
    height: 60,
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#52B788",
  },
  headerTitle: {
    fontSize: 22,
    color: "#1B4332",
    fontWeight: "bold",
  },
  headerLink: {
    fontSize: 16,
    color: "#081C15",
    textDecorationLine: "underline",
    paddingRight: 10,
  },
});
