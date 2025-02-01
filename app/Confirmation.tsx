import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

export default function ConfirmationScreen() {
  const router = useRouter();
  const { specialty, clinicName, date, time, doctorName, id } =
    useGlobalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.successText}>Consulta agendada com sucesso!</Text>
        <FontAwesome name="check-circle" size={100} color={Colors.light.primary} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Text style={styles.boldText}>Clínica:</Text>{" "}
          <Text style={styles.highlightText}>{clinicName}</Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.boldText}>Data:</Text>{" "}
          <Text style={styles.highlightText}>{date}</Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.boldText}>Hora:</Text>{" "}
          <Text style={styles.highlightText}>{time}</Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.boldText}>Especialidade:</Text>{" "}
          <Text style={styles.highlightText}>{specialty}</Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.boldText}>Médico:</Text>{" "}
          <Text style={styles.highlightText}>{doctorName}</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={() => router.push("/MyAppointmentsScreen")}>
        <Text style={[styles.footerText, { textDecorationLine: "underline" }]}>
          Em caso de alterações, consulte "Meus agendamentos".
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/ClinicsScreen")}
        style={styles.homeButton}
      >
        <Text style={styles.homeButtonText}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: Colors.dark.inputBackground,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  successText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  highlightText: {
    color: Colors.light.primary,
  },
  footerText: {
    fontSize: 14,
    color: Colors.light.primary,
    textAlign: "center",
    marginVertical: 20,
  },
  homeButton: {
    backgroundColor: Colors.light.primary,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  homeButtonText: {
    color: Colors.dark.background,
    fontWeight: "700",
    textAlign: "center",
  },
});
