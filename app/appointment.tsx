import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { Colors } from '/home/alefjuan/projetosUtfpr/projMobile/AgilMed/agilmed/constants/Colors';

const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate(); // Retorna a quantidade de dias no mês
};

const generateUniqueId = (): string => {
  const now = new Date();
  const datePart = now.toISOString().split('T')[0]; // Obtém a data no formato YYYY-MM-DD
  const timePart = now.getTime().toString(); // Obtém o timestamp em milissegundos
  return `${datePart}-${timePart}`;
};

export default function AppointmentScreen() {
  const router = useRouter();
  const { specialty } = useGlobalSearchParams();

  const [selectedDate, setSelectedDate] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const availableTimes = ['12:00', '12:30', '13:00', '13:30'];

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const changeMonth = (direction: number): void => {
    setSelectedDate((prev) => {
      let newMonth = prev.month + direction;
      let newYear = prev.year;

      if (newMonth < 0) {
        newMonth = 11; // Volta para Dezembro
        newYear -= 1;
      } else if (newMonth > 11) {
        newMonth = 0; // Avança para Janeiro
        newYear += 1;
      }

      return { ...prev, month: newMonth, year: newYear };
    });
  };

  const selectDay = (day: number): void => {
    setSelectedDate((prev) => ({ ...prev, day }));
  };

  const isDayPast = (day: number): boolean => {
    const currentDate = new Date();
    const selectedDay = new Date(selectedDate.year, selectedDate.month, day);
    return selectedDay.getTime() < currentDate.setHours(0, 0, 0, 0);
  };

  const daysInMonth = getDaysInMonth(selectedDate.month, selectedDate.year);

  const uniqueId = generateUniqueId(); 

  const handleConfirm = () => {
    router.push({
      pathname: '/Confirmation',
      params: {
        specialty,
        date: `${selectedDate.day}/${selectedDate.month + 1}/${selectedDate.year}`,
        time: selectedTime, 
        doctor: 'Dr. Fulano',
        id: uniqueId,
      },
    });
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };

  const isConfirmEnabled = selectedDate.day && selectedTime;

  return (
    <View style={styles.container}>
      {/* Calendário */}
      <View style={styles.calendarContainer}>
        <Text style={styles.consultText}>
          Especialidade: <Text style={styles.specialty}>{specialty}</Text>
        </Text>

        <View style={styles.monthNavigation}>
          <TouchableOpacity onPress={() => changeMonth(-1)}>
            <Text style={styles.arrow}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {monthNames[selectedDate.month]} {selectedDate.year}
          </Text>
          <TouchableOpacity onPress={() => changeMonth(1)}>
            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.daysOfWeek}>
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
            <Text key={day} style={styles.dayOfWeekText}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.daysContainer}>
          {[...Array(daysInMonth).keys()].map((day) => {
            const currentDay = day + 1;
            const isPast = isDayPast(currentDay);
            const isSelected = selectedDate.day === currentDay && !isPast;

            return (
              <TouchableOpacity
                key={currentDay}
                style={[styles.dayButton, isSelected && styles.selectedDay, isPast && styles.pastDay]}
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

      {/* Seleção de Horários */}
      <View style={styles.timesContainer}>
        {availableTimes.map((time) => (
          <TouchableOpacity
            key={time}
            style={[styles.timeButton, selectedTime === time && styles.selectedTime]}
            onPress={() => handleSelectTime(time)}
          >
            <Text style={styles.timeText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão Confirmar */}
      <TouchableOpacity 
        onPress={handleConfirm} 
        style={[styles.confirmButton, !isConfirmEnabled && styles.confirmButtonDisabled]} 
        disabled={!isConfirmEnabled}
      >
        <Text style={styles.confirmButtonText}>Confirmar Agendamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  consultText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  specialty: {
    color: '#FFD700',
    fontWeight: '700',
  },
  calendarContainer: {
    marginTop: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.light.primary,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  monthNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
  },
  arrow: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFF',
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  daysOfWeek: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 10,
  },
  dayOfWeekText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  dayButton: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  selectedDay: {
    backgroundColor: '#FFD700',
  },
  pastDay: {
    backgroundColor: '#E0E0E0',
  },
  dayText: {
    color: '#1E1E1E',
    fontWeight: '600',
  },
  pastDayText: {
    color: '#A9A9A9',
  },
  timesContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  timeButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 8,
    width: '90%',
    justifyContent: 'center', // Garante o alinhamento vertical
    alignItems: 'center', // Garante o alinhamento horizontal
  },
  timeText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center', // Garante que o texto seja centralizado horizontalmente
  },
  selectedTime: {
    backgroundColor: '#FFD700',
  },
  confirmButton: {
    backgroundColor: Colors.light.primary,
    marginTop: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '80%',
    marginHorizontal: '10%',
    marginBottom: 20,
  },
  confirmButtonDisabled: {
    backgroundColor: '#A9A9A9',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
