import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity, Alert, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('client_id');
    await AsyncStorage.removeItem('client_name');
    Alert.alert("Logout", "Você foi deslogado com sucesso.");
    router.replace('/'); // Redireciona para a tela de login
  };

  const headerRight = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => router.push('./MyAppointmentsScreen')} style={{ marginRight: 15 }}>
        <FontAwesome name="calendar" size={24} color="#6DAEAE" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
        <FontAwesome name="sign-out" size={24} color="#6DAEAE" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="SpecialtyList" options={{ title: "Lista de Especialidades", headerRight }} />
        <Stack.Screen name="Appointment" options={{ title: "Agendamento", headerRight }} />
        <Stack.Screen name="RegisterScreen" options={{ title: "Cadastre-se" }} />
        <Stack.Screen name="Confirmation" options={{ title: "Confirmação", headerRight }} />
        <Stack.Screen name="ClinicsScreen" options={{ title: "Clínicas", headerRight }} />
        <Stack.Screen name="DoctorListScreen" options={{ title: "Lista de Médicos", headerRight }} />
        <Stack.Screen name="MyAppointmentsScreen" options={{ title: "Meus Agendamentos", headerRight }} />
      </Stack>
    </ThemeProvider>
  );
}