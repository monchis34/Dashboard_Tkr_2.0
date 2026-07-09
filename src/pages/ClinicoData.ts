// Data extracted from the provided CSV files and system specifications for the GIRIS 2.0 dashboard
export interface PatientRecord {
  id: string;
  name?: string;
  lastName?: string;
  city: string;
  specialty: string;
  entity: string;
  state: 'Programada' | 'Comité' | 'Pendiente' | 'Otro' | 'Usuario Cancela' | 'Reprogramada' | 'Atendida';
  date: string;
  cohort: string;
  risk: 'Bajo' | 'Moderado' | 'Alto' | 'Crítico';
  riskTrend: '↑ Subió' | ' Estable' | '↓ Bajó';
  clinicalBreach: string[];
  activeAlert: boolean;
  slaHours: number;
  doctor: string;
  nextStep: string;
}

// Specialty distribution based on GIRIS CSV
export const specialtyData = [
  { name: 'Medicina General', value: 235, percentage: 30.4 },
  { name: 'Nutrición', value: 166, percentage: 21.47 },
  { name: 'Medicina Interna', value: 166, percentage: 21.47 },
  { name: 'Psicología', value: 166, percentage: 21.47 },
  { name: 'Psiquiatria', value: 10, percentage: 1.29 },
  { name: 'Medicina del Deporte', value: 6, percentage: 0.78 },
  { name: 'Cardiología', value: 4, percentage: 0.52 },
  { name: 'Neurologia', value: 4, percentage: 0.52 },
  { name: 'Fisiatría', value: 3, percentage: 0.39 },
  { name: 'Algologia', value: 2, percentage: 0.26 },
  { name: 'Oncologia Clínica', value: 2, percentage: 0.26 },
  { name: 'Geriatría', value: 2, percentage: 0.26 },
  { name: 'Reumatologia', value: 1, percentage: 0.13 },
  { name: 'Endocrinología', value: 1, percentage: 0.13 },
];

// Service Types from CSV
export const serviceTypeData = [
  { type: 'Atención Programada', value: 384, percentage: 49.68 },
  { type: 'Atencion Domiciliaria', value: 359, percentage: 46.44 },
  { type: 'Atención de Seguimiento', value: 29, percentage: 3.75 },
  { type: 'Atención Prioritaria', value: 1, percentage: 0.13 },
];

// Real CSV modeled patients with augmented clinical indicators for priority queues and clinical risk
export const patientRecords: PatientRecord[] = [
  {
    id: '35C1',
    city: 'Cali',
    specialty: 'Urología',
    entity: 'Coomeva MP Salud Mental',
    state: 'Comité',
    date: '2026-07-09',
    cohort: 'Salud Mental',
    risk: 'Crítico',
    riskTrend: '↑ Subió',
    clinicalBreach: ['PA 145/95', 'Adherencia farmacológica baja', 'Sin contacto >15 días'],
    activeAlert: true,
    slaHours: 12,
    doctor: 'Dra. Daniella Estrada',
    nextStep: 'Escalamiento a Comité de Riesgo',
  },
  {
    id: '35C0',
    city: 'Cali',
    specialty: 'Psiquiatria',
    entity: 'Coomeva MP Salud Mental',
    state: 'Comité',
    date: '2026-07-09',
    cohort: 'Salud Mental',
    risk: 'Crítico',
    riskTrend: ' Estable',
    clinicalBreach: ['NPS del profesional bajo (2 respuestas)', 'Ausencia a consulta de psicología'],
    activeAlert: true,
    slaHours: 18,
    doctor: 'Dr. Lucio González',
    nextStep: 'Llamada de enfermería de rescate',
  },
  {
    id: '35BF',
    city: 'Cali',
    specialty: 'Endocrinología Adultos',
    entity: 'Coomeva MP Salud Mental',
    state: 'Comité',
    date: '2026-07-09',
    cohort: 'Cardio-Reno-Metabólico',
    risk: 'Crítico',
    riskTrend: '↑ Subió',
    clinicalBreach: ['HbA1c 9.8%', 'Presión Arterial 152/98', 'Citas de Nutrición postergadas'],
    activeAlert: true,
    slaHours: 4,
    doctor: 'Dr. David Góngora',
    nextStep: 'Teleconsulta médica prioritaria',
  },
  {
    id: '35BE',
    city: 'Cali',
    specialty: 'Cardiología',
    entity: 'Coomeva MP Salud Mental',
    state: 'Comité',
    date: '2026-07-09',
    cohort: 'Cardio-Reno-Metabólico',
    risk: 'Alto',
    riskTrend: ' Estable',
    clinicalBreach: ['Pérdida de peso acelerada', 'Inasistencia a control cardiovascular'],
    activeAlert: false,
    slaHours: 24,
    doctor: 'Dra. Alexandra Villegas',
    nextStep: 'Reprogramación cita por coordinadora',
  },
  {
    id: '1CBE',
    city: 'Cali',
    specialty: 'Medicina Interna',
    entity: 'Coomeva MP Cali Vive al 100',
    state: 'Programada',
    date: '2026-07-09',
    cohort: 'Cardio-Reno-Metabólico',
    risk: 'Alto',
    riskTrend: '↓ Bajó',
    clinicalBreach: ['HbA1c 8.4%', 'Tratamiento HAS pendiente por ajustar'],
    activeAlert: false,
    slaHours: 48,
    doctor: 'Dra. Alexandra Villegas',
    nextStep: 'Consulta programada de internista',
  },
  {
    id: '31BE',
    city: 'Barranquilla',
    specialty: 'Medicina del Deporte',
    entity: 'Coomeva MP Caribe Vive al 100',
    state: 'Pendiente',
    date: '2026-07-08',
    cohort: 'Osteomuscular',
    risk: 'Moderado',
    riskTrend: ' Estable',
    clinicalBreach: ['Falta de adherencia a plan de hábitos y ejercicio'],
    activeAlert: false,
    slaHours: 72,
    doctor: 'Dr. Jairo Hurtado',
    nextStep: 'Enviar infografía interactiva de hábitos',
  },
  {
    id: '32EA',
    city: 'Cali',
    specialty: 'Nutrición',
    entity: 'Coomeva MP Cali Vive al 100',
    state: 'Comité',
    date: '2026-07-08',
    cohort: 'Cardio-Reno-Metabólico',
    risk: 'Crítico',
    riskTrend: '↑ Subió',
    clinicalBreach: ['Ganancia ponderal +4kg en 15 días', 'Disnea leve reportada'],
    activeAlert: true,
    slaHours: 8,
    doctor: 'Dr. David Góngora',
    nextStep: 'Comité interdisciplinario inmediato',
  },
  {
    id: '329A',
    name: 'Derly Vanessa',
    lastName: 'Alvarez Grisales',
    city: 'Cali',
    specialty: 'Psiquiatria',
    entity: 'EPS SURA Cuidate 360',
    state: 'Otro',
    date: '2026-07-08',
    cohort: 'Salud Mental',
    risk: 'Alto',
    riskTrend: ' Estable',
    clinicalBreach: ['Ansiedad persistente sin adherencia farmacológica'],
    activeAlert: false,
    slaHours: 36,
    doctor: 'Dr. Lucio González',
    nextStep: 'Consulta de control psiquiatría',
  },
  {
    id: '31D3',
    name: 'Javier Dejesus',
    lastName: 'Chima Romero',
    city: 'Barranquilla',
    specialty: 'Medicina del Deporte',
    entity: 'Coomeva MP Caribe Vive al 100',
    state: 'Usuario Cancela',
    date: '2026-07-06',
    cohort: 'Osteomuscular',
    risk: 'Moderado',
    riskTrend: ' Estable',
    clinicalBreach: ['Usuario cancela cita dos veces seguidas', 'Dolor persistente reportado'],
    activeAlert: true,
    slaHours: 24,
    doctor: 'Dr. Jairo Hurtado',
    nextStep: 'Contacto telefónico de fidelización',
  },
  {
    id: '3384',
    name: 'Yenny Alejandra',
    lastName: 'Velez Ochoa',
    city: 'Cali',
    specialty: 'Medicina del Deporte',
    entity: 'EPS SURA Cuidate 360',
    state: 'Otro',
    date: '2026-07-04',
    cohort: 'Cardio-Reno-Metabólico',
    risk: 'Bajo',
    riskTrend: '↓ Bajó',
    clinicalBreach: ['Ninguno - Control adecuado'],
    activeAlert: false,
    slaHours: 120,
    doctor: 'Dr. David Góngora',
    nextStep: 'Próxima evaluación en 6 meses',
  }
];

// Historical cohorts data for stack area chart
export const monthlyCohortsData = [
  { mes: 'Ene', crm: 2400, mental: 1540, epoc: 980, osteo: 1200, nefro: 600 },
  { mes: 'Feb', crm: 2650, mental: 1610, epoc: 1040, osteo: 1250, nefro: 630 },
  { mes: 'Mar', crm: 2900, mental: 1720, epoc: 1100, osteo: 1300, nefro: 670 },
  { mes: 'Abr', crm: 3200, mental: 1850, epoc: 1140, osteo: 1410, nefro: 710 },
  { mes: 'May', crm: 3450, mental: 1980, epoc: 1210, osteo: 1480, nefro: 760 },
  { mes: 'Jun', crm: 3732, mental: 2110, epoc: 1260, osteo: 1530, nefro: 810 },
];

// Funnel values with custom calculations
export const clinicalFunnelData = [
  { stage: '1. Ingreso', value: 1200, pct: 100, drop: 0, fill: '#1E3A8A' },
  { stage: '2. Activación (Onboarding)', value: 1020, pct: 85, drop: 15, fill: '#1E40AF' },
  { stage: '3. Adherencia (Mes 3)', value: 870, pct: 72.5, drop: 12.5, fill: '#3B82F6' },
  { stage: '4. Control Clínico (Mes 6)', value: 710, pct: 59.2, drop: 13.3, fill: '#0EA5E9' },
  { stage: '5. Graduación exitosa', value: 520, pct: 43.3, drop: 15.9, fill: '#10B981' },
  { stage: '6. Salida / Seguimiento', value: 480, pct: 40.0, drop: 3.3, fill: '#059669' },
];

// Pre vs Post intervention clinical metrics comparison
export const prePostMetrics = {
  hba1c: {
    title: 'Nivel Promedio HbA1c (Cardio-Reno-Metabólico)',
    pre: 8.4,
    post: 7.1,
    unit: '%',
    improvement: '-1.3 puntos',
    desc: 'Reducción de riesgo de complicaciones microvasculares en un 27%.'
  },
  bloodPressure: {
    title: 'Presión Arterial Sistólica Promedio (Hipertensión)',
    pre: 145,
    post: 128,
    unit: ' mmHg',
    improvement: '-17 mmHg',
    desc: 'Reducción en riesgo de accidente cerebrovascular y falla cardíaca.'
  },
  phq9: {
    title: 'Score PHQ-9 Promedio (Salud Mental - Depresión)',
    pre: 14.2,
    post: 8.6,
    unit: ' pts',
    improvement: '-5.6 pts',
    desc: 'Transición de depresión moderada/grave a sintomatología leve.'
  },
  copdExacerbation: {
    title: 'Exacerbaciones Anuales Promedio (EPOC/Asma)',
    pre: 2.8,
    post: 1.1,
    unit: ' crisis/año',
    improvement: '-60.7%',
    desc: 'Disminución drástica de hospitalizaciones y reingresos a urgencias.'
  }
};

// Playbooks catalog
export interface PlaybookStep {
  phase: string;
  actions: string;
  responsible: string;
}

export interface Playbook {
  id: string;
  name: string;
  cohort: string;
  complianceRate: number;
  approvedVariations: number;
  steps: PlaybookStep[];
  qalyImpact: string;
}

export const activePlaybooks: Playbook[] = [
  {
    id: 'PB-CRM-32',
    name: 'Playbook Cardio-Reno-Metabólico (v3.2)',
    cohort: 'Cardio-Reno-Metabólico',
    complianceRate: 84.5,
    approvedVariations: 4,
    qalyImpact: '+1.6 Años de Vida Ajustados por Calidad (QALY) proyectados',
    steps: [
      { phase: 'Semana 1: Captación', actions: 'HbA1c basal, perfil lipídico, valoración nutricional virtual.', responsible: 'Coordinadora de cohorte' },
      { phase: 'Mes 1: Onboarding', actions: 'Primer control de enfermería, entrega de glucómetro si aplica, inicio plan nutricional.', responsible: 'Enfermería + Nutrición' },
      { phase: 'Mes 3: Adherencia', actions: 'Evaluación de hábitos, control de HbA1c parcial, telepsicología si requiere.', responsible: 'Psicología + Nutrición' },
      { phase: 'Mes 6: Control', actions: 'Evaluación médica por especialista o médico general líder, score de autocuidado.', responsible: 'Médico líder de cohorte' },
      { phase: 'Mes 12: Graduación', actions: 'Control clínico consolidado, egreso de la cohorte activa a plan de mantenimiento.', responsible: 'Comité Clínico' }
    ]
  },
  {
    id: 'PB-SM-1.1',
    name: 'Playbook Salud Mental v1.1',
    cohort: 'Salud Mental',
    complianceRate: 92.0,
    approvedVariations: 2,
    qalyImpact: '+1.1 Años de Vida Ajustados por Calidad (QALY) proyectados',
    steps: [
      { phase: 'Semana 1: Captación', actions: 'Tamizaje PHQ-9 / GAD-7 inicial y teleconsulta de psicología de rescate.', responsible: 'Psicólogo' },
      { phase: 'Mes 3: Adherencia', actions: 'Psicoterapia continua bisemanal y ajuste farmacológico por Psiquiatría.', responsible: 'Psicólogo + Psiquiatra' },
      { phase: 'Mes 6: Estabilización', actions: 'Control de estabilidad sintomática y reducción de dosis farmacológica.', responsible: 'Psicólogo' },
      { phase: 'Mes 12: Graduación', actions: 'Graduación por remisión sostenida con plan de prevención de recaídas.', responsible: 'Comité Clínico' }
    ]
  },
  {
    id: 'PB-EPOC-20',
    name: 'Playbook EPOC/Asma y Cuidado Respiratorio (v2.0)',
    cohort: 'EPOC',
    complianceRate: 78.4,
    approvedVariations: 6,
    qalyImpact: '+1.4 Años de Vida Ajustados por Calidad (QALY) proyectados',
    steps: [
      { phase: 'Semana 1: Captación', actions: 'Clasificación de disnea mMRC, evaluación del uso de inhaladores basal.', responsible: 'Médico general líder' },
      { phase: 'Mes 1: Educación', actions: 'Taller de técnica inhalatoria, entrega de oxímetro de pulso.', responsible: 'Enfermería respiratoria' },
      { phase: 'Mes 3: Control Operativo', actions: 'Monitoreo de exacerbaciones en 90 días, adherencia a terapia física.', responsible: 'Fisioterapeuta' },
      { phase: 'Mes 6: Control Clínico', actions: 'Espirometría de control, re-evaluación médica anual.', responsible: 'Médico Internista' },
      { phase: 'Mes 12: Egreso', actions: 'Alta por control clínico sostenido de crisis y derivación a primer nivel.', responsible: 'Comité Clínico' }
    ]
  }
];
