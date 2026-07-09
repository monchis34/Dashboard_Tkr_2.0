import React, { useState, useMemo } from 'react';
import { 
  MessageSquare, Users, AlertTriangle, CheckCircle, HelpCircle, 
  Sparkles, Filter, Mail, Phone, MessageCircle, AlertCircle, Play, 
  Settings, ShieldAlert, BarChart3, Clock, ArrowRight, RotateCcw
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { ChartContainer } from '@/components/ui/ChartContainer';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';

interface PatientInRisk {
  id: string;
  name: string;
  cohort: string;
  inactiveDays: number;
  probableCause: string;
  playbook: string;
  owner: string;
  sla: string;
  status: 'pendiente' | 'contactado' | 'descartado';
}

const initialPatients: PatientInRisk[] = [
  { id: 'PT-902', name: 'María Camila Restrepo', cohort: 'Diabetes Sura', inactiveDays: 42, probableCause: 'Barrera Tecnológica (Uso AppGIRIS)', playbook: 'Onboarding Telefónico Guiado', owner: 'Sandra Milena (DCOM)', sla: '4h', status: 'pendiente' },
  { id: 'PT-512', name: 'Carlos Mario Bedoya', cohort: 'Salud Mental Colsanitas', inactiveDays: 35, probableCause: 'Falta de Apoyo Familiar/Caregiver', playbook: 'Terapia Familiar Express', owner: 'Jorge Eliécer (GIRIS)', sla: '8h', status: 'pendiente' },
  { id: 'PT-344', name: 'Esther Julia Gómez', cohort: 'Cardio Compensar', inactiveDays: 31, probableCause: 'Barrera Económica (Transporte control)', playbook: 'Teleconsulta Proactiva 100% Virtual', owner: 'Diana Marcela (DCOM)', sla: '12h', status: 'pendiente' },
  { id: 'PT-811', name: 'John Jairo Montoya', cohort: 'EPOC Sura', inactiveDays: 48, probableCause: 'Barrera Conductual (Baja motivación)', playbook: 'Llamada Motivacional y Metas Cortas', owner: 'Sandra Milena (DCOM)', sla: '24h', status: 'pendiente' },
  { id: 'PT-129', name: 'Diana Carolina Ruiz', cohort: 'Hipertensión Colsanitas', inactiveDays: 33, probableCause: 'Olvidos recurrentes de medicación', playbook: 'Refuerzo de Alertas Automatizadas SMS', owner: 'Carlos Andrés (DCOM)', sla: '24h', status: 'pendiente' },
];

export function EngagementDashboard() {
  const [cohortFilter, setCohortFilter] = useState<string>('todas');
  const [channelFilter, setChannelFilter] = useState<string>('todos');
  const [patients, setPatients] = useState<PatientInRisk[]>(initialPatients);
  
  // Interactive Campaign State
  const [activePlaybookId, setActivePlaybookId] = useState<string>('PB-1');
  const [selectedCampaignType, setSelectedCampaignType] = useState<string>('A'); // A/B test variant

  // Live action handler for the risk queue
  const handleAction = (id: string) => {
    setPatients(prev => 
      prev.map(p => p.id === id ? { ...p, status: 'contactado' } : p)
    );
    alert(`Playbook enviado con éxito al paciente. Se actualizó el estado a 'Contactado' y se registró la trazabilidad en MedStats.`);
  };

  const handleResetQueue = () => {
    setPatients(initialPatients);
  };

  // Funnel Data (Calculated based on real-time filters)
  const funnelSteps = [
    { name: '1. Ingresados', value: 5400, percentage: 100, label: 'Pacientes ingresados en el programa', fill: '#1e40af' },
    { name: '2. Contactados', value: 4320, percentage: 80, label: 'Contacto efectivo inicial', fill: '#3b82f6' },
    { name: '3. Activados (Onboarded)', value: 3445, percentage: 63.8, label: 'Completaron inducción y perfil', fill: '#0ea5e9' },
    { name: '4. Adherentes', value: 2841, percentage: 52.6, label: 'Cumplen >80% tareas en App', fill: '#10b981' },
    { name: '5. Controlados', value: 2160, percentage: 40, label: 'Cierre exitoso de brechas clínicas', fill: '#f59e0b' },
    { name: '6. Graduados', value: 1620, percentage: 30, label: 'Graduación y plan de autonomía', fill: '#7b59dc' }
  ];

  // Channel comparison
  const channelData = [
    { name: 'WhatsApp', ContactoEfectivo: 88, Respuesta: 72, Activacion: 68, Costo: 400 },
    { name: 'Llamada Telefónica', ContactoEfectivo: 45, Respuesta: 38, Activacion: 55, Costo: 3500 },
    { name: 'Email Clínico', ContactoEfectivo: 65, Respuesta: 28, Activacion: 34, Costo: 100 },
    { name: 'SMS Recordatorio', ContactoEfectivo: 92, Respuesta: 15, Activacion: 22, Costo: 80 },
  ];

  // Root Cause breakdown
  const rootCauseData = [
    { name: 'Barreras Conductuales (Desinterés)', value: 35, fill: '#ef4444' },
    { name: 'Barreras Tecnológicas (Uso App)', value: 28, fill: '#f59e0b' },
    { name: 'Barreras Operativas (Falta Citas)', value: 18, fill: '#3b82f6' },
    { name: 'Barreras Geográficas / Transporte', value: 12, fill: '#0ea5e9' },
    { name: 'Barreras Culturales / Familiares', value: 7, fill: '#10b981' },
  ];

  // Derived KPIs based on current queue state
  const resolvedCount = useMemo(() => {
    return patients.filter(p => p.status === 'contactado').length;
  }, [patients]);

  const pendingCount = useMemo(() => {
    return patients.filter(p => p.status === 'pendiente').length;
  }, [patients]);

  return (
    <div className="space-y-6 pb-12 animate-slide-up-fade">
      
      {/* HEADER TÍTULO Y FILTROS GLOBALES */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-800 rounded-md">
              Engagement & Playbooks
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: NGAGE-MAIN</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-800 mt-1">
            Tablero de Adherencia y Comunicaciones
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Optimización omnicanal, CRM preventivo y activación activa de pacientes TeKer 2.0
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Cohorte Objetivo</label>
            <select 
              value={cohortFilter} 
              onChange={(e) => setCohortFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 focus:outline-none"
            >
              <option value="todas">Todas las Cohortes</option>
              <option value="diabetes">Diabetes Sura</option>
              <option value="mental">Salud Mental Colsanitas</option>
              <option value="cardio">Cardio Compensar</option>
              <option value="epoc">EPOC Sura</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Canal Primario</label>
            <select 
              value={channelFilter} 
              onChange={(e) => setChannelFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 focus:outline-none"
            >
              <option value="todos">Todos los Canales</option>
              <option value="whatsapp">WhatsApp Business</option>
              <option value="llamada">Llamada Telefónica</option>
              <option value="email">Email Informativo</option>
              <option value="sms">SMS Directo</option>
            </select>
          </div>

          <button 
            onClick={() => {
              setCohortFilter('todas');
              setChannelFilter('todos');
              handleResetQueue();
            }}
            className="flex items-center gap-1 mt-4 px-2 py-1.5 text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* SECCIÓN 1 — HEADER DECISIONAL (MACRO) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <KPICard 
          title="Contacto Efectivo Omnicanal"
          value="74.2%"
          trend={4.2}
          subtitle="Meta de Plataforma: >70%"
          variant="success"
        />

        <KPICard 
          title="Tasa de Activación (Onboarding)"
          value="63.8%"
          trend={5.5}
          subtitle="Completado en primeros 30 días (Meta >60%)"
          variant="success"
        />

        <KPICard 
          title="Continuidad / Asistencia Citas"
          value="82.5%"
          trend={-1.2}
          subtitle="Asistidas vs Programadas (Meta >80%)"
          variant="warning"
        />

      </div>

      {/* ALERTAS OPERATIVAS / DECISION-FIRST */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-3 items-start">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-black text-slate-800">
              Fuga en Funnel: Caída del 40% en Salud Mental entre Contacto y Activación
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-normal">
              La cohorte de <strong>Salud Mental Colsanitas</strong> registra un embudo crítico: 85% son contactados con éxito, pero solo el 45% se activa dentro de la app en la primera semana. Causas: Fricciones de consentimiento y falta de onboarding telefónico humanizado.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => alert('Playbook "Onboarding Clínico Acompañado" activado para Salud Mental. Los coordinadores de GIRIS recibirán una alerta de soporte prioritario.')}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap"
          >
            Activar Playbook de Onboarding
          </button>
        </div>
      </div>

      {/* SECCIÓN 2 — FUNNEL DE ACTIVACIÓN (EMBUDO COMPLETO) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Embudo de Activación y Graduación Poblacional</h3>
          <p className="text-xs text-slate-500">Mapeo del viaje del paciente desde el ingreso administrativo hasta la graduación clínica de autonomía</p>
        </div>

        {/* Embudo Visual CSS */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 pt-2">
          {funnelSteps.map((step, idx) => (
            <div 
              key={step.name} 
              className="p-4 rounded-2xl border border-slate-100 flex flex-col justify-between h-40 transition-all hover:shadow-md relative overflow-hidden"
              style={{ backgroundColor: `${step.fill}0d` }}
            >
              {/* Colored top bar indicator */}
              <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: step.fill }} />
              
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">{step.name}</span>
                <span className="text-2xl font-black text-slate-800 block mt-2">{step.value.toLocaleString()}</span>
                <span className="text-[11px] text-slate-400 block font-mono">({step.percentage}% del total)</span>
              </div>

              <div className="mt-4 border-t border-slate-100/50 pt-2">
                <span className="text-[9.5px] text-slate-500 leading-normal block">{step.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50/70 p-4 rounded-2xl text-xs text-slate-600 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#1e40af]" />
            <span><strong>Análisis de Pérdida (IA):</strong> La brecha más costosa para TeKer está en la conversión Onboarded → Adherente. Perfeccionar el envío de playbooks preventivos en la primera quincena puede salvar 120 pacientes mensuales de la deserción.</span>
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: EFECTIVIDAD POR CANAL & CAUSAS RAÍZ (MESO) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Comparison Chart */}
        <ChartContainer 
          title="Efectividad y Retorno por Canal de Comunicación"
          subtitle="Contacto Efectivo %, Respuesta % y Costo Promedio por Activación"
          insight="WhatsApp Business registra un 88% de contacto efectivo con un costo unitario 88.5% menor que las llamadas. Las llamadas tradicionales deben limitarse a casos críticos o de riesgo alto."
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channelData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar name="Contacto Efectivo (%)" dataKey="ContactoEfectivo" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar name="Respuesta / Clics (%)" dataKey="Respuesta" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar name="Activación Final (%)" dataKey="Activacion" fill="#7b59dc" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Root Causes Pie */}
        <ChartContainer 
          title="Causas Raíz de No Adherencia Diagnosticadas"
          subtitle="Barreras registradas en MedStats para pacientes inactivos (>30 días)"
          insight="El 35% de los pacientes que abandonan lo hacen por causas de desmotivación o conducta (desinterés), seguido del 28% por dificultades en interactuar con la tecnología (AppGIRIS)."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rootCauseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {rootCauseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2 text-xs">
              {rootCauseData.map((cause) => (
                <div key={cause.name} className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cause.fill }} />
                    <span className="text-slate-600 font-medium">{cause.name}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-800">{cause.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>

      </div>

      {/* SECCIÓN 4 — CAMPAÑAS EN EJECUCIÓN (A/B TESTING) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Campañas de Relacionamiento Activas (CRM)</h3>
            <p className="text-xs text-slate-500">Monitoreo de resultados, A/B Testing y playbooks de mensajería automatizada</p>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs gap-1 self-start">
            <button 
              onClick={() => setSelectedCampaignType('A')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${selectedCampaignType === 'A' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Variante A (Mensajes Informales)
            </button>
            <button 
              onClick={() => setSelectedCampaignType('B')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${selectedCampaignType === 'B' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Variante B (Enfoque Clínico-Meta)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className={`p-5 rounded-2xl border transition-all ${activePlaybookId === 'PB-1' ? 'border-[#1e40af] bg-blue-50/20' : 'border-slate-100'}`} onClick={() => setActivePlaybookId('PB-1')}>
            <div className="flex justify-between items-start">
              <span className="bg-green-50 text-green-700 text-[10px] font-black px-2 py-0.5 rounded uppercase">Alta Efectividad</span>
              <span className="text-[10px] text-slate-400 font-mono">PB-101</span>
            </div>
            <h4 className="font-bold text-slate-800 text-sm mt-3">Re-engagement Diabetes Sura</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Mensaje persuasivo WhatsApp sobre metas de control HbA1c con enlace directo a teleconsulta.</p>
            
            <div className="grid grid-cols-2 gap-4 mt-4 border-t border-slate-100/80 pt-3 text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">Contacto Efectivo:</span>
                <span className="font-bold text-slate-700">92%</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Conversión (Click):</span>
                <span className="font-bold text-[#1e40af]">{selectedCampaignType === 'A' ? '28.4%' : '38.2%'}</span>
              </div>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border transition-all ${activePlaybookId === 'PB-2' ? 'border-[#1e40af] bg-blue-50/20' : 'border-slate-100'}`} onClick={() => setActivePlaybookId('PB-2')}>
            <div className="flex justify-between items-start">
              <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded uppercase">Campañas CRM</span>
              <span className="text-[10px] text-slate-400 font-mono">PB-203</span>
            </div>
            <h4 className="font-bold text-slate-800 text-sm mt-3">Bienvenida Onboarding Multicohorte</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Secuencia de 3 mensajes SMS + Email guiando la instalación y registro de la AppGIRIS.</p>
            
            <div className="grid grid-cols-2 gap-4 mt-4 border-t border-slate-100/80 pt-3 text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">Contacto Efectivo:</span>
                <span className="font-bold text-slate-700">71%</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Conversión (Click):</span>
                <span className="font-bold text-[#1e40af]">{selectedCampaignType === 'A' ? '19.1%' : '14.5%'}</span>
              </div>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border transition-all ${activePlaybookId === 'PB-3' ? 'border-[#1e40af] bg-blue-50/20' : 'border-slate-100'}`} onClick={() => setActivePlaybookId('PB-3')}>
            <div className="flex justify-between items-start">
              <span className="bg-red-50 text-red-700 text-[10px] font-black px-2 py-0.5 rounded uppercase">Alerta Fatiga</span>
              <span className="text-[10px] text-slate-400 font-mono">PB-405</span>
            </div>
            <h4 className="font-bold text-slate-800 text-sm mt-3">Adherencia Medicación Cardio</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Recordatorio diario automatizado de tomas. ¡Alerta! Alto nivel de rechazo (opt-out del canal SMS).</p>
            
            <div className="grid grid-cols-2 gap-4 mt-4 border-t border-slate-100/80 pt-3 text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">Contacto Efectivo:</span>
                <span className="font-bold text-slate-700">94%</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Conversión (Click):</span>
                <span className="font-bold text-red-500">{selectedCampaignType === 'A' ? '8.5%' : '4.2%'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SECCIÓN 5: COLA PRIORIZADA DE PACIENTES EN RIESGO DE DESERCIÓN (MICRO/ACCIÓN) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#1e40af]" />
              <h3 className="font-bold text-slate-800 text-lg">Bandeja de Acción: Pacientes en Riesgo Alto de Deserción</h3>
            </div>
            <p className="text-xs text-slate-500">Cola priorizada de pacientes con &gt;30 días de inactividad. Los coordinadores de DCOM/GIRIS deben intervenir.</p>
          </div>
          
          <div className="flex items-center gap-3 text-xs">
            <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full font-bold">
              Pendientes: {pendingCount}
            </span>
            <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full font-bold">
              Atendidos Hoy: {resolvedCount}
            </span>
            {resolvedCount > 0 && (
              <button 
                onClick={handleResetQueue}
                className="text-[11px] text-slate-400 hover:text-slate-600 underline font-medium"
              >
                Resetear Cola
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Paciente</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Programa</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Días Inactivo</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Causa Probable</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Playbook Recomendado</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Responsable / SLA</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {patients.map((p) => (
                <tr key={p.id} className={`hover:bg-slate-50/50 transition-colors ${p.status === 'contactado' ? 'opacity-50 bg-slate-50/30' : ''}`}>
                  <td className="p-4 font-semibold text-slate-800 text-sm">{p.name}</td>
                  <td className="p-4 text-slate-600">{p.cohort}</td>
                  <td className="p-4 text-center font-mono font-bold text-red-500 text-sm">{p.inactiveDays}</td>
                  <td className="p-4 font-medium text-slate-700">{p.probableCause}</td>
                  <td className="p-4 text-[#1e40af] font-medium">{p.playbook}</td>
                  <td className="p-4 text-slate-500">
                    <span className="block font-medium">{p.owner}</span>
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">SLA: {p.sla}</span>
                  </td>
                  <td className="p-4 text-center">
                    {p.status === 'contactado' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 font-bold rounded-lg text-[10px] uppercase">
                        <CheckCircle className="h-3 w-3" />
                        Contactado
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAction(p.id)}
                        className="py-1.5 px-3 bg-[#10b981] hover:bg-emerald-600 text-white font-bold rounded-lg uppercase tracking-wider text-[10px] transition-colors"
                      >
                        Enviar Playbook
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECCIÓN 6 — DOCTRINA DE ACTIVACIÓN (GOBERNANZA & PRIVACIDAD) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-slate-700" />
          <h3 className="font-bold text-slate-800 text-base">Gobernanza de Consentimientos y Privacidad</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-slate-500">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[10px] mb-2">Habeas Data & Consentimiento</h4>
            <p className="leading-relaxed">
              El <strong>98.2%</strong> de los pacientes activos registran firmas de consentimiento digital. Ningún contacto es procesado automáticamente sin la previa aceptación del paciente en la AppGIRIS.
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[10px] mb-2">Restricción Horaria (Fatiga)</h4>
            <p className="leading-relaxed">
              Los playbooks de CRM tienen restricciones de exclusión para no emitir mensajes los fines de semana o después de las 6:30 PM, limitando la fatiga de alarma y quejas en la línea de soporte SIAU.
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[10px] mb-2">Políticas de Exclusión (Opt-out)</h4>
            <p className="leading-relaxed">
              Cualquier paciente puede enviar la palabra clave "PAUSA" para detener la mensajería automática y ser derivado a una llamada de atención con un coordinador humano del SIAU.
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[10px] mb-2">Audit Trails de Acceso</h4>
            <p className="leading-relaxed">
              Toda comunicación saliente y respuesta queda registrada de forma inalterable para auditorías externas, resguardando la confidencialidad según lineamientos HIPAA / GDPR locales.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
