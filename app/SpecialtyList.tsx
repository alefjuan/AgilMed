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
import { getSpecialties } from "../services/api"; // Ajuste o caminho conforme necessário
import { Colors } from "/home/alefjuan/projetosUtfpr/projMobile/AgilMed/agilmed/constants/Colors";
import * as z from "zod";

type Specialty = {
  id: number;
  name: string;
};

const specialtySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export default function SpecialtyListScreen() {
  const router = useRouter();
  const { clinicName, clinic_id, client_id } = useGlobalSearchParams();
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await getSpecialties();

        const validatedData = z.array(specialtySchema).parse(data);

        setSpecialties(validatedData);
      } catch (error) {
        console.error("Erro ao buscar especialidades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
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
      <Text style={styles.title}>Clínica: {clinicName}</Text>
      <Text style={styles.subtitle}>Escolha a especialidade</Text>
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        {specialties.map((specialty) => (
          <TouchableOpacity
            key={specialty.id}
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/DoctorListScreen",
                params: {
                  specialty: specialty.name,
                  specialty_id: specialty.id.toString(),
                  clinicName,
                  clinic_id,
                  client_id,
                },
              })
            }
          >
            <Text style={styles.buttonText}>{specialty.name}</Text>
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
    marginBottom: 10,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.primary,
    marginBottom: 20,
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
