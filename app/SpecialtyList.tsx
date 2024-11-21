import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Colors } from '/home/alefjuan/projetosUtfpr/projMobile/AgilMed/agilmed/constants/Colors';
import { useRouter } from 'expo-router';

export default function SpecialtyListScreen() {
  const router = useRouter(); 

  const specialties = [
    'Cardiologia',
    'Pediatria',
    'Dermatologia',
    'Oftalmologia',
    'Psiquiatria',
    'Endocrinologia',
    'Ortopedia',
    'Geral',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha a especialidade</Text>
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        {specialties.map((specialty, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => router.push(`/appointment?specialty=${specialty}`)}
          >
            <Text style={styles.buttonText}>{specialty}</Text>
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
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    color: Colors.light.primary,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    width: 300,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
