import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAppointments, deleteAppointment } from '../services/api';
import { Colors } from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

type Appointment = {
  id: number;
  date: string;
  time: string;
  clinic_name?: string;
  specialty_name?: string;
  doctor_name?: string;
};

export default function MyAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clientName, setClientName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const clientId = await AsyncStorage.getItem('client_id');
        const name = await AsyncStorage.getItem('client_name');
        setClientName(name);
        if (clientId) {
          const clientAppointments = await getAppointments(clientId);
          setAppointments(clientAppointments);
        } else {
          console.error('ID do cliente não encontrado no AsyncStorage');
        }
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (appointmentId: number) => {
    try {
      await deleteAppointment(appointmentId);
      setAppointments(prev => prev.filter(appointment => appointment.id !== appointmentId));
      Alert.alert("Sucesso", "Agendamento excluído com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Houve um problema ao excluir o agendamento.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Agendamentos</Text>
      {clientName && <Text style={styles.clientName}>Cliente: {clientName}</Text>}
      
      {loading ? (
        <ActivityIndicator size="large" color={Colors.light.primary} />
      ) : appointments.length > 0 ? (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Data:</Text> {new Date(item.date).toLocaleDateString()}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Hora:</Text> {item.time}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Clínica:</Text> {item.clinic_name}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Especialidade:</Text> {item.specialty_name}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Doutor:</Text> {item.doctor_name}
              </Text>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => handleDelete(item.id)}
              >
                <FontAwesome name="trash" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noAppointments}>Nenhum agendamento encontrado.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  clientName: {
    fontSize: 16,
    color: Colors.light.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.dark.inputBackground,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noAppointments: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});
