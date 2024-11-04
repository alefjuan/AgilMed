import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from "../constants/Colors";
import { useNavigation } from '@react-navigation/native';
import SpecialtyListScreen from './SpecialtyListScreen';


export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (username === 'root' && password === 'root') {
      // Navegar para a próxima tela se usuário e senha forem 'root'
      navigation.navigate('SpecialtyListScreen' as never);
    } else {
      // Exibe um alerta se as credenciais estiverem incorretas
      Alert.alert('Erro', 'Usuário ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo e Título */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/login/logo.png')} style={styles.logo} />
        <Text style={styles.title}>ÁgilMed</Text>
        <Text style={styles.subtitle}>Sua saúde a qualquer hora</Text>
      </View>

      {/* Campo de Usuário */}
      <View style={styles.inputContainer}>
        <Image source={require('../assets/images/login/person.png')} style={styles.icons} />
        <TextInput
          placeholder="Usuário"
          placeholderTextColor="#555"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Campo de Senha */}
      <View style={styles.inputContainer}>
        <Image source={require('../assets/images/login/password.png')} style={styles.icons} />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#555"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Lembrar de mim */}
      <View style={styles.rememberContainer}>
        <FontAwesome name="check-square" size={18} color="white" />
        <Text style={styles.rememberText}>Lembrar de mim</Text>
      </View>

      {/* Botão Entrar */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Esqueci minha senha e Cadastro */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Esqueceu a senha?</Text>
        <Text style={styles.footerText}>É novo? <Text style={styles.signUp}>Cadastre-se</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 10,
  },
  icons: {
    width: 24,
    height: 24
  },
  title: {
    color: Colors.light.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.light.primary,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.inputBackground,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  rememberText: {
    color: Colors.light.primary,
    marginLeft: 5
  },
  loginButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 20,

  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    color: Colors.light.primary
    
  },
  footerText: {
    color: Colors.light.primary,
    marginVertical: 5,
  },
  signUp: {
    color: Colors.light.primary,
    fontWeight: 'bold',
  },
});
