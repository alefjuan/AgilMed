import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    if (name && email && cpf && password && phone) {
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [{ text: 'OK' }]);
      router.push('/');
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      
      {/* Nome */}
      <TextInput
        placeholder="Nome"
        placeholderTextColor="#555"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      {/* Email */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#555"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* CPF */}
      <TextInput
        placeholder="CPF"
        placeholderTextColor="#555"
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />

      {/* Telefone */}
      <TextInput
        placeholder="Telefone"
        placeholderTextColor="#555"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {/* Senha */}
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#555"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push('/')} style={styles.loginRedirect}>
        <Text style={styles.loginRedirectText}>Já possui conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    color: '#FFF',
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
  },
  registerButton: {
    backgroundColor: '#4FB0C6',
    borderRadius: 10,
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginRedirect: {
    marginTop: 20,
  },
  loginRedirectText: {
    color: '#FFF',
    textDecorationLine: 'underline',
  },
});
