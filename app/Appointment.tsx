import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { Colors } from "/home/alefjuan/projetosUtfpr/projMobile/AgilMed/agilmed/constants/Colors";
import { createAppointment, getAvailableTimes } from "../services/api";
import * as z from "zod";

const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// Defina o esquema de validação com Zod
const appointmentSchema = z.object({
  doctorName: z.string().nonempty("Nome do médico é obrigatório"),
  clinicName: z.string().nonempty("Nome da clínica é obrigatório"),
  specialty: z.string().nonempty("Especialidade é obrigatória"),
  date: z.string().nonempty("Data é obrigatória").regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido"),
  time: z.string().nonempty("Horário é obrigatório").regex(/^\d{2}:\d{2}:\d{2}$/, "Formato de horário inválido"),
  client_id: z.number().positive("ID do cliente é obrigatório"),
  doctor_id: z.number().positive("ID do médico é obrigatório"),
});

export default function AppointmentScreen() {
  const router = useRouter();
  const { specialty, clinicName, doctorName, doctor_id, client_id } =
    useGlobalSearchParams();

  const doctorId = Array.isArray(doctor_id) ? doctor_id[0] : doctor_id;
  const clientId = Array.isArray(client_id) ? client_id[0] : client_id;

  const [selectedDate, setSelectedDate] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const formatDate = (day: number, month: number, year: number): string => {
    return `${year}-${(month + 1).toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };

  const fetchAvailableTimes = async (date: string) => {
    try {
      const times = await getAvailableTimes(doctorId, date);
      setAvailableTimes(times);
    } catch (error) {
      console.error('Erro ao buscar horários disponíveis:', error);
    }
  };

  useEffect(() => {
    const dateStr = formatDate(selectedDate.day, selectedDate.month, selectedDate.year);
    fetchAvailableTimes(dateStr);
  }, [selectedDate]);

  const changeMonth = (direction: number): void => {
    setSelectedDate((prev) => {
      let newMonth = prev.month + direction;
      let newYear = prev.year;

      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }

      return { ...prev, month: newMonth, year: newYear };
    });
  };

  const selectDay = (day: number): void => {
    setSelectedDate((prev) => ({ ...prev, day }));
    setSelectedTime(null);
  };

  const isDayPast = (day: number): boolean => {
    const currentDate = new Date();
    const selectedDay = new Date(selectedDate.year, selectedDate.month, day);
    return selectedDay.getTime() < currentDate.setHours(0, 0, 0, 0);
  };

  const handleConfirm = async () => {
    console.log("handleConfirm iniciado");
    if (!selectedTime) {
      Alert.alert("Erro", "Selecione um horário antes de confirmar.");
      return;
    }

    console.log("selectedTime:", selectedTime);
    console.log("selectedDate:", selectedDate);

    const appointmentData = {
      doctorName,
      clinicName,
      specialty,
      date: formatDate(selectedDate.day, selectedDate.month, selectedDate.year),
      time: `${selectedTime}:00`,
      client_id: parseInt(clientId as string),
      doctor_id: parseInt(doctorId as string),
    };

    console.log("appointmentData:", appointmentData);

    // Valide os dados de agendamento antes de enviá-los
    try {
      appointmentSchema.parse(appointmentData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        Alert.alert("Erro de validação", error.errors[0].message);
        return;
      }
    }

    setLoading(true);

    try {
      const response = await createAppointment(
        appointmentData.date,
        appointmentData.time,
        appointmentData.client_id,
        appointmentData.doctor_id
      );

      console.log("Resposta do servidor:", response);

      Alert.alert("Sucesso", "Agendamento realizado com sucesso!");
      router.push({
        pathname: "/Confirmation",
        params: {
          ...appointmentData,
        },
      });
    } catch (error) {
      console.log("Erro ao salvar agendamento:", error);

      if (error instanceof Error) {
        Alert.alert(
          "Erro",
          error.message || "Não foi possível salvar o agendamento."
        );
      } else {
        Alert.alert("Erro", "Houve um problema ao salvar o agendamento.");
      }
    } finally {
      setLoading(false);
      console.log("handleConfirm concluído");
    }
  };

  const isConfirmEnabled = selectedDate.day && selectedTime && !loading;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.calendarContainer}>
          <Text style={styles.consultText}>
            Especialidade: <Text style={styles.specialty}>{specialty}</Text>
          </Text>

          <View style={styles.monthNavigation}>
            <TouchableOpacity onPress={() => changeMonth(-1)}>
              <Text style={styles.arrow}>{"<"}</Text>
            </TouchableOpacity>
            <Text style={styles.monthText}>
              {monthNames[selectedDate.month]} {selectedDate.year}
            </Text>
            <TouchableOpacity onPress={() => changeMonth(1)}>
              <Text style={styles.arrow}>{">"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.daysOfWeek}>
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <Text key={day} style={styles.dayOfWeekText}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.daysContainer}>
            {[
              ...Array(
                getDaysInMonth(selectedDate.month, selectedDate.year)
              ).keys(),
            ].map((day) => {
              const currentDay = day + 1;
              const isPast = isDayPast(currentDay);
              const isSelected = selectedDate.day === currentDay && !isPast;

              return (
                <TouchableOpacity
                  key={currentDay}
                  style={[
                    styles.dayButton,
                    isSelected && styles.selectedDay,
                    isPast && styles.pastDay,
                  ]}
                  onPress={() => !isPast && selectDay(currentDay)}
                  disabled={isPast}
                >
                  <Text style={[styles.dayText, isPast && styles.pastDayText]}>
                    {currentDay}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.timesContainer}>
          {availableTimes.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeButton,
                selectedTime === time && styles.selectedTime,
                !availableTimes.includes(time) && styles.unavailableTime,
              ]}
              onPress={() => setSelectedTime(time)}
              disabled={!availableTimes.includes(time)}
            >
              <Text style={styles.timeText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          onPress={handleConfirm}
          style={[
            styles.confirmButton,
            !isConfirmEnabled && styles.confirmButtonDisabled,
          ]}
          disabled={!isConfirmEnabled}
        >
          <Text style={styles.confirmButtonText}>
            {loading ? "Salvando..." : "Confirmar Agendamento"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    padding: 20,
  },
  scrollView: {
    flex: 1,
    marginBottom: 60, // Adicionando espaço para o botão fixo
  },
  consultText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center",
  },
  specialty: {
    color: Colors.light.primary,
    fontWeight: "700",
  },
  calendarContainer: {
    marginTop: 25,
    backgroundColor: Colors.dark.inputBackground,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  monthNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
  },
  arrow: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  daysOfWeek: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 10,
  },
  dayOfWeekText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  dayButton: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  selectedDay: {
    backgroundColor: Colors.light.primary,
  },
  pastDay: {
    backgroundColor: "#E0E0E0",
  },
  dayText: {
    color: "#1E1E1E",
    fontWeight: "600",
  },
  pastDayText: {
    color: "#A9A9A9",
  },
  timesContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  timeButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 8,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
  selectedTime: {
    backgroundColor: "#FFD700",
  },
  unavailableTime: {
    backgroundColor: "#A9A9A9",
  },
  fixedButtonContainer: {
    width: "110%",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.dark.background,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  confirmButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
  confirmButtonDisabled: {
    backgroundColor: "#A9A9A9",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

