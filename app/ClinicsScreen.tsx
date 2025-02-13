import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { getClinics } from "../services/api";
import { Colors } from "../constants/Colors";
import * as z from "zod";

type Clinic = {
  id: number;
  name: string;
};

const clinicSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export default function ClinicsScreen() {
  const router = useRouter();
  const { client_id } = useGlobalSearchParams();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const data = await getClinics();

        const validatedData = z.array(clinicSchema).parse(data);

        setClinics(validatedData);
      } catch (error) {
        console.error("Erro ao buscar clínicas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha a clínica</Text>
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        {clinics.map((clinic) => (
          <TouchableOpacity
            key={clinic.id}
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/SpecialtyList",
                params: {
                  clinicName: clinic.name,
                  clinic_id: clinic.id.toString(),
                  client_id: client_id,
                },
              })
            }
          >
            <Text style={styles.buttonText}>{clinic.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    color: Colors.light.primary,
    marginBottom: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    width: 300,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
