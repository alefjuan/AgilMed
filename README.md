# ÁgilMed

ÁgilMed é uma ferramenta de gerenciamento de horários projetada para clínicas, permitindo que os pacientes agendem consultas de forma prática e intuitiva. O objetivo do aplicativo é simplificar o processo de marcação de consultas, eliminando a necessidade de ligações telefônicas, e garantir uma experiência moderna e eficiente para os pacientes e clínicas.

## Planejamento

Cada clínica terá seu App! Os clientes irão acessar e visualizar as respectivas informações da mesma. Neste momento que ainda não possui o banco de dados irei trabalhar com uma clinica base-geral para desenvolvimento de escopo.

## Tecnologias

- React Native
- Express
- Postgre
- Expo 52

## Funcionalidades Principais

- ✅ Consultar dias e horários disponíveis para marcação de consultas.
- ✅ Agendar consultas online diretamente pelo app.
- ✅ Cancelamento e remarcação de consultas pelo usuário.
- ✅ Visualização do histórico de consultas do paciente.

### Funcionalidades Futuras

- 💡 Integração com sistemas de pagamento para consultas particulares.
- 💡 Teleconsulta integrada para atendimentos online.
- 💡 Sincronização com calendários pessoais (Google Calendar, Outlook).
- 💡 Avaliação e feedback do paciente sobre o atendimento.
- 💡 Notificações de confirmação e lembretes de consultas agendadas.

## Protótipos de Tela

Você pode acessar o protótipo do design das telas [aqui](https://www.figma.com/design/4t4uPBzriZPBZ6spD4ElFU/Mobile?node-id=0-1&t=LPD6UYTNBH4Sn2Ru-1).

## Modelagem do Banco de Dados

O modelo do banco de dados será relacional (PostgreSQL) através de uma API e pode ser encontrado [neste link](https://miro.com/app/board/uXjVLQBN2P4=/?share_link_id=257094076270).

## Sprints

### **Sprint 1: 15/10 - 31/10✅**

**Objetivo**: Estruturação básica do aplicativo.

- Implementar o **roteamento** entre telas.
- Criar o **esqueleto das principais telas** (login, consulta de horários, histórico).
- Estilização inicial com **dados simulados**.
- Realizar **testes iniciais** de navegação.

**Checkpoint 2✅**: Estrutura e navegação básica completa.

---

### **Sprint 2: 01/11 - 15/11**

**Objetivo**: Conectar o app ao banco de dados.

- Configurar **PostgreSQL**.
- Implementar **consulta de horários disponíveis**.
- Iniciar a funcionalidade de **agendamento de consultas**.
- Testes de usabilidade.

---

### **Sprint 3: 16/11 - 30/11**

**Objetivo**: Notificações e ajustes nas funcionalidades de agendamento.

- Desenvolver **notificações** (confirmação e lembretes).
- Adicionar **cancelamento e remarcação** de consultas.
- Implementar **visualização do histórico** de consultas.
- Ajustes com base em feedback dos testes.

---

### **Sprint 4: 01/12 - 15/12**

**Objetivo**: Ajustes finais e otimizações.

- Refatoração do código.
- **Testes de carga** no banco de dados.
- Verificação da **integração** entre todas as telas e funcionalidades.

**Checkpoint 3**: Funcionalidades de agendamento e notificações 100% funcionais.

---

### **Sprint 5: 16/12 - 31/12**

**Objetivo**: Preparação para o lançamento.

- Finalizar todas as **funcionalidades básicas**.
- **Exportação para APK**.
- **Testes** em dispositivos reais.
- Resolver **bugs críticos**.

---

### **Sprint 6: 01/01 - 31/01**

**Objetivo**: Funcionalidades adicionais e entrega final.

- Implementar funcionalidades extras como **pagamentos** e **teleconsulta**.
- Revisar **sincronização com calendários pessoais**.
- Realizar o **deploy** final.

**Checkpoint 4**: Entrega do aplicativo completo.

---

## Licença

MIT License
