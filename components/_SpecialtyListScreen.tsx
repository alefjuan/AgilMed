import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors } from "/home/alefjuan/projetosUtfpr/projMobile/AgilMed/agilmed/constants/Colors";

export default function SpecialtyListScreen() {
  const specialties = [
    "Cardiologia",
    "Pediatria",
    "Dermatologia",
    "Oftalmologia",
    "Psiquiatria",
    "Endocrinologia",
    "Ortopedia",
    "Geral"
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha a especialidade</Text>
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        {specialties.map((specialty, index) => (
          <TouchableOpacity key={index} style={styles.button}>
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
    paddingTop: 50,
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
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
