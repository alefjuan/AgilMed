import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-agilmed.onrender.com', // Use o IP do servidor backend ou localhost
});

// Função para listar todos os clientes
export const getClients = async () => {
  try {
    const response = await api.get('/clients');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};

// Função para listar todos os agendamentos
export const getAppointments = async (client_id) => {
  try {
    const response = await api.get(`/appointments/client/${client_id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    throw error;
  }
};
export const getAllAppointments = async () => {
  try {
    const response = await api.get(`/appointments`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    throw error;
  }
};

// Função para listar todos os médicos
export const getDoctors = async () => {
  try {
    const response = await api.get('/doctors');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar médicos:', error);
    throw error;
  }
};

export const getClinics = async () => {
  try {
    const response = await api.get('/clinics');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clínicas:', error);
    throw error;
  }
};

// Função para listar todas as especialidades
export const getSpecialties = async () => {
  try {
    const response = await api.get('/specialties');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar especialidades:', error);
    throw error;
  }
};
// Criar um novo agendamento
export const createAppointment = async (date, time, client_id, doctor_id) => {
  try {
    const response = await api.post('/appointments', {
      date,
      time,
      client_id,
      doctor_id,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    throw error;
  }
};

// Criar um novo cliente
export const createClient = async (name, email, cpf, password, telephone) => {
  try {
    const response = await api.post('/clients', {
      name,
      email,
      cpf,
      password,
      telephone,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw error;
  }
};

// Login do cliente
export const loginClient = async (email, password) => {
  try {
    const response = await api.post('/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const deleteAppointment = async (appointmentId) => {
  try {
    const response = await api.delete(`/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir agendamento:', error);
    throw error;
  }
};

export const getAvailableTimes = async (doctor_id, date) => {
  try {
    const response = await api.get(`/doctors/${doctor_id}/available_times`, {
      params: { date }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar horários disponíveis:', error);
    throw error;
  }
};

export const updateAppointment = async (appointmentId, date, time, doctor_id) => {
  try {
    const response = await api.put(`/appointments/${appointmentId}`, {
      date,
      time,
      doctor_id,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    throw error;
  }
};


export default api;
