import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useGlobalSearchParams, useRouter } from 'expo-router';

export default function ConfirmationScreen() {
  const router = useRouter();
  const { specialty, date, time, doctor, id } = useGlobalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.successText}>Consulta agendada com sucesso!</Text>
        <Image source={require('../assets/images/confirmation/check.png')} style={styles.card} />
      </View>
      <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{date}</Text>
          <Text style={styles.infoText}>{time}</Text>
          <Text style={styles.infoText}>{specialty}</Text>
          <Text style={styles.infoText}>{doctor}</Text>
          <Text style={styles.infoText}>Id: {id}</Text>
        </View>

        <Text style={styles.footerText}>
          Em caso de alterações, consulte "Meus agendamentos".
        </Text>
      <TouchableOpacity onPress={() => router.push('/')} style={styles.homeButton}>
        <Text style={styles.homeButtonText}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#4FB0C6',
    borderEndEndRadius:20,
    borderStartEndRadius:20,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center', 
    height:"60%"
    
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 20,
  },
  icon: {
    fontSize: 40,
    marginBottom: 20,
    
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginVertical: 5,
  },
  footerText: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
  },
  homeButton: {
    marginTop: 20,
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 10,
  },
  homeButtonText: {
    color: '#1E1E1E',
    fontWeight: '600',
  },
  check: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
