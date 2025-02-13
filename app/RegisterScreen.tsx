import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Colors";
import * as z from "zod";

// Defina o esquema de validação com Zod
const formDataSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  cpf: z
    .string()
    .regex(/^\d{11}$/, "CPF deve conter 11 dígitos numéricos"),
  password: z.string().min(5, "Senha deve ter no mínimo 6 caracteres"),
  telephone: z.string().optional(),
});

type FormData = z.infer<typeof formDataSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    cpf: "",
    password: "",
    telephone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSignup = async () => {
    try {
      // Valide os dados antes de enviá-los
      formDataSchema.parse(formData);

      setLoading(true);
      const response = await fetch(
        "https://backend-agilmed.onrender.com/clients",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
        router.push("/");
      } else {
        const errorData = await response.json();
        Alert.alert("Erro", errorData.message || "Erro ao realizar cadastro.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        Alert.alert("Erro de validação", error.errors[0].message);
      } else {
        Alert.alert("Erro", "Não foi possível realizar o cadastro.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#A9A9A9"
        onChangeText={(value) => handleInputChange("name", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A9A9A9"
        keyboardType="email-address"
        onChangeText={(value) => handleInputChange("email", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#A9A9A9"
        keyboardType="numeric"
        onChangeText={(value) => handleInputChange("cpf", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone (opcional)"
        placeholderTextColor="#A9A9A9"
        keyboardType="phone-pad"
        onChangeText={(value) => handleInputChange("telephone", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#A9A9A9"
        secureTextEntry
        onChangeText={(value) => handleInputChange("password", value)}
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: Colors.dark.inputBackground,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: Colors.light.primary,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#A9A9A9",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
