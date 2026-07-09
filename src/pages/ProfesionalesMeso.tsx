import React, { useState, useMemo } from 'react';
import { 
  Users, Star, AlertTriangle, ShieldCheck, CheckCircle2, 
  Sparkles, Award, ClipboardCheck, Play, UserX, UserCheck, BarChart3, 
  HelpCircle, TrendingUp, Info, ShieldAlert, RotateCcw
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { ChartContainer } from '@/components/ui/ChartContainer';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis, ReferenceLine 
} from 'recharts';

interface Professional {
  id: string;
  name: string;
  specialty: string;
  activePatients: number;
  pendingVisits: number;
  nps: number;
  npsCount: number;
  punctuality: number;
  avgDuration: number; // minutes
  clinicalRecordsOnTime: number; // %
  clinicalGapsClosed: number; // %
  burnoutRisk: 'alto' | 'medio' | 'bajo';
  burnoutScore: number; // 0-100
  trainingCompleted: number; // %
  resolvedFirstTime: number; // %
}

const initialProfessionals: Professional[] = [
  { id: 'P1', name: 'Dr. Roberto Silva', specialty: 'Medicina General', activePatients: 92, pendingVisits: 24, nps: 60, npsCount: 45, punctuality: 68, avgDuration: 28, clinicalRecordsOnTime: 72, clinicalGapsClosed: 52, burnoutRisk: 'alto', burnoutScore: 85, trainingCompleted: 60, resolvedFirstTime: 58 },
  { id: 'P2', name: 'Dra. Lorena Méndez', specialty: 'Psicología', activePatients: 75, pendingVisits: 12, nps: 92, npsCount: 120, punctuality: 94, avgDuration: 42, clinicalRecordsOnTime: 98, clinicalGapsClosed: 85, burnoutRisk: 'bajo', burnoutScore: 15, trainingCompleted: 100, resolvedFirstTime: 88 },
  { id: 'P3', name: 'Dr. Carlos Ruiz', specialty: 'Nutrición', activePatients: 42, pendingVisits: 6, nps: 88, npsCount: 8, punctuality: 89, avgDuration: 18, clinicalRecordsOnTime: 85, clinicalGapsClosed: 74, burnoutRisk: 'bajo', burnoutScore: 28, trainingCompleted: 40, resolvedFirstTime: 82 },
  { id: 'P4', name: 'Dra. Diana López', specialty: 'Medicina General', activePatients: 78, pendingVisits: 18, nps: 85, npsCount: 60, punctuality: 86, avgDuration: 22, clinicalRecordsOnTime: 92, clinicalGapsClosed: 79, burnoutRisk: 'medio', burnoutScore: 64, trainingCompleted: 80, resolvedFirstTime: 76 },
  { id: 'P5', name: 'Dr. Juan Gómez', specialty: 'Cardiología', activePatients: 84, pendingVisits: 22, nps: 71, npsCount: 50, punctuality: 74, avgDuration: 32, clinicalRecordsOnTime: 79, clinicalGapsClosed: 68, burnoutRisk: 'alto', burnoutScore: 78, trainingCompleted: 50, resolvedFirstTime: 62 },
  { id: 'P6', name: 'Dra. Sandra Ortiz', specialty: 'Trabajo Social', activePatients: 55, pendingVisits: 4, nps: 95, npsCount: 80, punctuality: 96, avgDuration: 35, clinicalRecordsOnTime: 100, clinicalGapsClosed: 90, burnoutRisk: 'bajo', burnoutScore: 12, trainingCompleted: 100, resolvedFirstTime: 94 },
];

export function ProfesionalesMeso() {
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('todas');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('90_dias');
  const [professionals, setProfessionals] = useState<Professional[]>(initialProfessionals);
  const [selectedProfId, setSelectedProfId] = useState<string>('P1');

  // Interactive Reassignment Simulation
  const handleReassignWorkload = () => {
    // Reassign 15 patients from Dr Roberto Silva (P1) to Dr Carlos Ruiz (P3)
    setProfessionals(prev => 
      prev.map(p => {
        if (p.id === 'P1') {
          return { ...p, activePatients: p.activePatients - 15, pendingVisits: p.pendingVisits - 5, burnoutRisk: 'medio', burnoutScore: 68 };
        }
        if (p.id === 'P3') {
          return { ...p, activePatients: p.activePatients + 15, pendingVisits: p.pendingVisits + 5 };
        }
        return p;
      })
    );
    alert('Reasignación de Carga completada en MedStats: Se transfirieron 15 pacientes activos del Dr. Silva a la Dra. Méndez/Ruiz, reduciendo el riesgo compuesto de Burnout de Dr. Silva a "Medio".');
  };

  const handleResetWorkloads = () => {
    setProfessionals(initialProfessionals);
  };

  // Filtered Professionals
  const filteredProfessionals = useMemo(() => {
    return professionals.filter(p => {
      return specialtyFilter === 'todas' || p.specialty.toLowerCase() === specialtyFilter.toLowerCase();
    });
  }, [professionals, specialtyFilter]);

  // Selected Professional Detail
  const activeProf = useMemo(() => {
    return professionals.find(p => p.id === selectedProfId) || professionals[0];
  }, [professionals, selectedProfId]);

  // KPI aggregates
  const avgCarga = useMemo(() => {
    const total = filteredProfessionals.reduce((acc, p) => acc + p.activePatients, 0);
    return Math.round(total / filteredProfessionals.length);
  }, [filteredProfessionals]);

  const avgNps = useMemo(() => {
    // Only professionals with >= 10 answers
    const valid = filteredProfessionals.filter(p => p.npsCount >= 10);
    const total = valid.reduce((acc, p) => acc + p.nps, 0);
    return Math.round(total / valid.length);
  }, [filteredProfessionals]);

  const avgPuntualidad = useMemo(() => {
    const total = filteredProfessionals.reduce((acc, p) => acc + p.punctuality, 0);
    return Math.round(total / filteredProfessionals.length);
  }, [filteredProfessionals]);

  return (
    <div className="space-y-6 pb-12 animate-slide-up-fade">
      
      {/* HEADER TÍTULO Y FILTROS GLOBALES */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 rounded-md">
              Meso / Operación Clínica
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: PROF-MAIN</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-800 mt-1">
            Gestión y Desempeño de Profesionales
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Balance de carga asistencial, calidad clínica, NPS por profesional y prevención de Burnout (Ana María)
          </p>
        </div>

        {/* Global Selects */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Especialidad</label>
            <select 
              value={specialtyFilter} 
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 focus:outline-none focus:border-teker-cyan font-medium"
            >
              <option value="todas">Todas las Especialidades</option>
              <option value="Medicina General">Medicina General</option>
              <option value="Psicología">Psicología</option>
              <option value="Nutrición">Nutrición</option>
              <option value="Cardiología">Cardiología</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Período Desempeño</label>
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 focus:outline-none focus:border-teker-cyan font-medium"
            >
              <option value="90_dias">Últimos 90 Días</option>
              <option value="30_dias">Últimos 30 Días</option>
              <option value="este_mes">Mes Corriente</option>
            </select>
          </div>

          <button 
            onClick={() => {
              setSpecialtyFilter('todas');
              setSelectedPeriod('90_dias');
              handleResetWorkloads();
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
          title="Carga Asistencial Promedio"
          value={`${avgCarga} Pacientes`}
          trend={avgCarga > 80 ? 4 : -2}
          subtitle="Capacidad óptima: 60 pacientes activos"
          variant={avgCarga > 80 ? 'error' : avgCarga > 70 ? 'warning' : 'success'}
        />

        <KPICard 
          title="NPS Promedio de Red"
          value={avgNps}
          trend={3}
          subtitle="Mínimo 10 respuestas (Umbral Alerta <70)"
          variant={avgNps < 70 ? 'error' : avgNps < 80 ? 'warning' : 'success'}
        />

        <KPICard 
          title="Puntualidad de Consultas"
          value={`${avgPuntualidad}%`}
          trend={2}
          subtitle="Meta Institucional: >85% de consultas a tiempo"
          variant={avgPuntualidad < 75 ? 'error' : avgPuntualidad < 85 ? 'warning' : 'success'}
        />

      </div>

      {/* ALERTAS ACTIVAS COMPOSITAS */}
      <div className="bg-red-50/70 border border-red-200 rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-3 items-start">
          <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-black text-slate-800">
              Sobrecarga Severa & Burnout en Dr. Roberto Silva
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-normal">
              Dr. Roberto Silva registra una carga asistencial de <strong>{professionals[0].activePatients} pacientes activos</strong> (umbral óptimo &lt;60) y <strong>{professionals[0].pendingVisits} visitas pendientes</strong>. Esto coincide con un deterioro de puntualidad al <strong>68%</strong> y una caída del NPS a <strong>60</strong> (45 respuestas).
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {professionals[0].activePatients > 80 ? (
            <button 
              onClick={handleReassignWorkload} 
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap"
            >
              Transferir 15 pacientes (Reasignar Carga)
            </button>
          ) : (
            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Carga Balanceada
            </span>
          )}
        </div>
      </div>

      {/* SECCIÓN 2 & 3: CUADRANTE DE CARGA VS NPS & RANKING DE EXPERIENCIA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Scatter quadrant map */}
        <ChartContainer 
          title="Cuadrante: Carga Asistencial vs Satisfacción (NPS)"
          subtitle="Evaluación cruzada de carga de pacientes e indicador NPS"
          insight="La zona superior izquierda representa profesionales de Alta Carga con NPS bajo (riesgo de fatiga clínica). El Dr. Roberto Silva se ubica en el extremo crítico."
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                type="number" 
                dataKey="activePatients" 
                name="Pacientes Activos" 
                domain={[20, 110]} 
                label={{ value: 'Pacientes Activos por Profesional', position: 'bottom', offset: 0, fontSize: 11, fill: '#64748B' }} 
                tick={{ fontSize: 11, fill: '#64748B' }}
              />
              <YAxis 
                type="number" 
                dataKey="nps" 
                name="NPS" 
                domain={[40, 100]} 
                label={{ value: 'NPS (0-100)', angle: -90, position: 'left', fontSize: 11, fill: '#64748B' }} 
                tick={{ fontSize: 11, fill: '#64748B' }}
              />
              <ZAxis type="number" dataKey="pendingVisits" range={[60, 400]} name="Visitas Pendientes" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              
              {/* Reference boundaries */}
              <ReferenceLine x={60} stroke="#cbd5e1" strokeDasharray="3 3" />
              <ReferenceLine y={75} stroke="#cbd5e1" strokeDasharray="3 3" />
              
              <Scatter name="Profesionales" data={filteredProfessionals} fill="#8884d8">
                {filteredProfessionals.map((entry, index) => {
                  let cellColor = '#10B981'; // Green
                  if (entry.activePatients > 80 && entry.nps < 75) cellColor = '#EF4444'; // Red
                  else if (entry.activePatients > 70 || entry.nps < 80) cellColor = '#F59E0B'; // Orange
                  return <Cell key={`cell-${index}`} fill={cellColor} />;
                })}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* NPS Ranking and Comments */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-base">NPS & Comentarios de Experiencia</h3>
            <p className="text-xs text-slate-500 mt-0.5">Clasificación de satisfacción de pacientes por profesional (SLA de privacidad: &ge;10 encuestas)</p>
            
            <div className="space-y-3 mt-4 text-xs">
              {filteredProfessionals.map((prof) => (
                <div 
                  key={prof.id} 
                  onClick={() => setSelectedProfId(prof.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-colors ${selectedProfId === prof.id ? 'border-[#1e40af] bg-blue-50/10' : 'border-slate-100 hover:bg-slate-50/50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                      {prof.name.split(' ').slice(1).map(n => n[0]).join('')}
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">{prof.name}</span>
                      <span className="text-[10px] text-slate-500 block">{prof.specialty}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="font-mono font-bold text-slate-700 block flex items-center gap-1 justify-end">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        {prof.nps} NPS
                      </span>
                      <span className="text-[9px] text-slate-400 block">{prof.npsCount} encuestas</span>
                    </div>
                    {prof.npsCount < 10 ? (
                      <span className="text-[8.5px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase font-bold">Incompleto</span>
                    ) : prof.nps >= 90 ? (
                      <span className="text-[8.5px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded uppercase font-bold">Excelente</span>
                    ) : prof.nps < 70 ? (
                      <span className="text-[8.5px] bg-red-50 text-red-700 px-1.5 py-0.5 rounded uppercase font-bold">Crítico</span>
                    ) : (
                      <span className="text-[8.5px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded uppercase font-bold">Estable</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl">
            <span className="font-bold text-slate-700 block mb-1">Comentario Destacado (Paciente Sura):</span>
            <p className="italic">"La atención de la Dra. Lorena es maravillosa, explica con calma mis recetas y se preocupa por mí. Pero el agendamiento a veces tarda mucho."</p>
          </div>
        </div>

      </div>

      {/* SECCIÓN 4, 5 & 6: MATRIZ DE DESEMPEÑO COMPLETA */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Matriz Operativa, Calidad Clínica y Burnout</h3>
            <p className="text-xs text-slate-500">Trazabilidad de productividad, documentación oportuna de historias y riesgo de burnout</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs">
                <th className="p-4 font-bold text-slate-500 uppercase">Profesional</th>
                <th className="p-4 font-bold text-slate-500 uppercase text-center">Pacientes Activos</th>
                <th className="p-4 font-bold text-slate-500 uppercase text-center">Consultas / Día</th>
                <th className="p-4 font-bold text-slate-500 uppercase text-center">Puntualidad</th>
                <th className="p-4 font-bold text-slate-500 uppercase text-center">Duración Prom.</th>
                <th className="p-4 font-bold text-slate-500 uppercase text-center">Historia Oportuna</th>
                <th className="p-4 font-bold text-slate-500 uppercase text-center">Resolución 1ª Cita</th>
                <th className="p-4 font-bold text-slate-500 uppercase text-center">Brechas Clínicas Cerradas</th>
                <th className="p-4 font-bold text-slate-500 uppercase">Riesgo de Burnout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredProfessionals.map((prof) => (
                <tr key={prof.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-semibold text-slate-800 text-sm">
                    {prof.name}
                    <span className="block text-[10px] text-slate-400 font-normal">{prof.specialty}</span>
                  </td>
                  <td className="p-4 text-center font-mono font-medium">{prof.activePatients}</td>
                  <td className="p-4 text-center font-mono text-slate-600">
                    {Math.round((prof.activePatients / 15) * 10) / 10}
                  </td>
                  <td className="p-4 text-center font-mono font-bold text-slate-700">{prof.punctuality}%</td>
                  <td className="p-4 text-center font-mono text-slate-600">{prof.avgDuration} min</td>
                  <td className="p-4 text-center">
                    <span className={`font-mono font-bold ${prof.clinicalRecordsOnTime >= 90 ? 'text-green-600' : 'text-amber-500'}`}>
                      {prof.clinicalRecordsOnTime}%
                    </span>
                  </td>
                  <td className="p-4 text-center font-mono text-slate-600">{prof.resolvedFirstTime}%</td>
                  <td className="p-4 text-center font-mono text-slate-700 font-bold text-emerald-600">{prof.clinicalGapsClosed}%</td>
                  <td className="p-4">
                    {prof.burnoutRisk === 'alto' ? (
                      <span className="px-2.5 py-1 text-[9.5px] font-bold bg-red-100 text-red-700 rounded-full animate-pulse flex items-center gap-1 w-max">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        ALTO ({prof.burnoutScore}%)
                      </span>
                    ) : prof.burnoutRisk === 'medio' ? (
                      <span className="px-2.5 py-1 text-[9.5px] font-bold bg-amber-50 text-amber-700 rounded-full flex items-center gap-1 w-max">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        MEDIO ({prof.burnoutScore}%)
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-[9.5px] font-bold bg-green-50 text-green-700 rounded-full flex items-center gap-1 w-max">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        BAJO ({prof.burnoutScore}%)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECCIÓN 7 & 8: DESARROLLO, PRIVACIDAD Y GOBERNANZA DE DATOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Development & Capacitacion */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-indigo-600" />
            <h3 className="font-bold text-slate-800 text-base">Plan de Desarrollo y Capacitaciones</h3>
          </div>
          <p className="text-xs text-slate-500">Capacitaciones institucionales completadas vs requeridas para acreditación TeKer</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <span className="font-bold text-slate-700 block">Capacitaciones Requeridas (Acreditación)</span>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                    <span>Protocolo de Tele-Onboarding Clínico</span>
                    <span className="font-bold text-slate-700">85% Completo</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full">
                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                    <span>Seguridad del Paciente en Consultas Virtuales</span>
                    <span className="font-bold text-slate-700">92% Completo</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full">
                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                    <span>Manejo de Alertas Críticas en AppGIRIS</span>
                    <span className="font-bold text-slate-700">68% Completo</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full">
                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="font-bold text-slate-700 block mb-2">Desarrollo Individual: {activeProf.name}</span>
                <p className="text-slate-600 text-xs leading-normal">
                  El profesional tiene un plan de desarrollo enfocado en <strong>{activeProf.specialty === 'Medicina General' ? 'Optimización del Triage Digital' : 'Retención de Adherencia en CRM'}</strong>. Capacitación completada al {activeProf.trainingCompleted}%.
                </p>
              </div>
              
              <button 
                onClick={() => alert(`Enviando invitación de capacitación sobre "Triage Digital Inteligente" al Dr/Dra. ${activeProf.name}`)}
                className="mt-4 py-2 bg-slate-800 hover:bg-slate-950 text-white text-[11px] font-bold rounded-xl text-center"
              >
                Inscribir en Curso de Soporte IA
              </button>
            </div>
          </div>
        </div>

        {/* Governance & Privacy */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <h4 className="font-bold text-slate-800 text-sm">Gobernanza y Privacidad (PROF)</h4>
            </div>
            
            <div className="space-y-3 text-xs text-slate-500">
              <p className="leading-relaxed">
                <strong>Cláusula de Privacidad:</strong> El NPS individual del profesional solo se renderiza con un volumen mínimo de <strong>10 respuestas</strong> válidas. Esto previene sesgos estadísticos y resguarda la tranquilidad laboral del equipo clínico.
              </p>
              <p className="leading-relaxed">
                <strong>Uso No Punitivo:</strong> Los datos de este tablero están destinados al desarrollo clínico, el balance de cargas asistenciales y el resguardo preventivo de burnout.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400">
            <span>Última auditoría de accesos: Hoy a las 18:24 PM por Ana María (Líder Profesionales).</span>
          </div>
        </div>

      </div>

    </div>
  );
}
