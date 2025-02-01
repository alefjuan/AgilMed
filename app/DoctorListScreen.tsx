import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { getDoctors } from "@/services/api";
import { Colors } from "/home/alefjuan/projetosUtfpr/projMobile/AgilMed/agilmed/constants/Colors";

type Doctor = {
  id: number;
  name: string;
  clinic_id: number;
  specialty_id: number;
};

export default function DoctorListScreen() {
  const router = useRouter();
  const { specialty, clinicName, specialty_id, clinic_id, client_id } =
    useGlobalSearchParams();

  console.log("Raw clinic_id:", clinic_id);
  console.log("Raw specialty_id:", specialty_id);

  const clinicId = Array.isArray(clinic_id) ? clinic_id[0] : clinic_id;
  const specialtyId = Array.isArray(specialty_id)
    ? specialty_id[0]
    : specialty_id;

  console.log("Parsed clinicId:", clinicId);
  console.log("Parsed specialtyId:", specialtyId);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        console.log(
          "Fetching doctors with clinicId:",
          clinicId,
          "and specialtyId:",
          specialtyId
        );
        const data = await getDoctors();
        console.log("Fetched doctors data:", data);
        // Filtra os médicos de acordo com a clínica e especialidade selecionadas
        const filteredDoctors = data.filter((doctor: Doctor) => {
          console.log(
            `Checking doctor: ${doctor.name}, clinic_id: ${doctor.clinic_id}, specialty_id: ${doctor.specialty_id}`
          );
          return (
            doctor.clinic_id === parseInt(clinicId) &&
            doctor.specialty_id === parseInt(specialtyId)
          );
        });
        console.log("Filtered doctors:", filteredDoctors);
        setDoctors(filteredDoctors);
      } catch (error) {
        console.error("Erro ao buscar médicos:", error);
      } finally {
        setLoading(false);
        console.log("Finished fetching doctors");
      }
    };

    fetchDoctors();
  }, [clinicId, specialtyId]);

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
      <Text style={styles.subtitle}>Especialidade: {specialty}</Text>
      <Text style={styles.subtitle}>Escolha o médico</Text>
      {doctors.map((doctor: Doctor) => (
        <TouchableOpacity
          key={doctor.id}
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: "/Appointment",
              params: {
                doctorName: doctor.name,
                doctor_id: doctor.id.toString(),
                specialty,
                clinicName,
                client_id,
              },
            })
          }
        >
          <Text style={styles.buttonText}>{doctor.name}</Text>
        </TouchableOpacity>
      ))}
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
