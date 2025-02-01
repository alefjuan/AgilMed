import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";
import api from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      loginSchema.parse({ email, password });

      const response = await api.post("/login", { email, password });
      const clientId = response.data.client.id;
      const clientName = response.data.client.name;
      await AsyncStorage.setItem('client_id', clientId.toString());
      await AsyncStorage.setItem('client_name', clientName);
      Alert.alert("Sucesso", `Bem-vindo, ${clientName}! Login realizado com sucesso!`, [{ text: "OK" }]);
      router.push({
        pathname: "/ClinicsScreen",
        params: { client_id: clientId },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        Alert.alert("Erro de validação", error.errors[0].message);
      } else {
        Alert.alert("Erro", "Usuário ou senha incorretos", [{ text: "OK" }]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/login/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>ÁgilMed</Text>
        <Text style={styles.subtitle}>Sua saúde a qualquer hora</Text>
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/images/login/person.png")}
          style={styles.icons}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#555"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/images/login/password.png")}
          style={styles.icons}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#555"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.rememberContainer}>
        <FontAwesome name="check-square" size={18} color="white" />
        <Text style={styles.rememberText}>Lembrar de mim</Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Esqueceu a senha?</Text>
        <Text style={styles.footerText}>
          É novo?{" "}
          <Text
            style={styles.signUp}
            onPress={() => router.push("/RegisterScreen")}
          >
            Cadastre-se
          </Text>
        </Text>
      </View>
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 10,
  },
  icons: {
    width: 24,
    height: 24,
  },
  title: {
    color: Colors.light.primary,
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: Colors.light.primary,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark.inputBackground,
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginVertical: 10,
  },
  rememberText: {
    color: Colors.light.primary,
    marginLeft: 5,
  },
  loginButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 20,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    alignItems: "center",
    color: Colors.light.primary,
  },
  footerText: {
    color: Colors.light.primary,
    marginVertical: 5,
  },
  signUp: {
    color: Colors.light.primary,
    fontWeight: "bold",
  },
});
