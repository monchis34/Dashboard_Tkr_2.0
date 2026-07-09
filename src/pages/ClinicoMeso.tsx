import React, { useState, useMemo } from 'react';
import { ChartContainer } from '@/components/ui/ChartContainer';
import { InsightCard } from '@/components/ui/InsightCard';
import { AlertBanner } from '@/components/ui/AlertBanner';
import { KPICard } from '@/components/ui/KPICard';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, Legend, FunnelChart, Funnel, LabelList,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Stethoscope, Activity, FileText, Filter, RefreshCw, Eye, EyeOff, 
  Search, ShieldAlert, ArrowRight, BookOpen, Clock, HeartPulse, Sparkles, Check, CheckCircle2, ChevronRight, Download, Users, CheckSquare, Layers
} from 'lucide-react';
import { 
  patientRecords, specialtyData, serviceTypeData, 
  monthlyCohortsData, clinicalFunnelData, prePostMetrics, 
  activePlaybooks, PatientRecord 
} from './ClinicoData';

export function ClinicoMeso() {
  // Global filters state
  const [selectedCohort, setSelectedCohort] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [searchTerm, setSearchQuery] = useState<string>('');
  
  // Interactive details panel state
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);
  const [activePlaybookTab, setActivePlaybookTab] = useState<string>('Cardio-Reno-Metabólico');
  const [activePrePostKey, setActivePrePostKey] = useState<keyof typeof prePostMetrics>('hba1c');

  // Trigger metrics refresh animation state
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  // Filter logic
  const filteredPatients = useMemo(() => {
    return patientRecords.filter(p => {
      const matchCohort = selectedCohort === 'All' || p.cohort === selectedCohort;
      const matchCity = selectedCity === 'All' || p.city === selectedCity;
      const matchRisk = selectedRisk === 'All' || p.risk === selectedRisk;
      const matchSearch = searchTerm === '' || 
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.lastName && p.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        p.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchCohort && matchCity && matchRisk && matchSearch;
    });
  }, [selectedCohort, selectedCity, selectedRisk, searchTerm]);

  // Derived KPIs based on filters
  const metrics = useMemo(() => {
    // Standard baseline stats slightly altered by filters to feel dynamic
    let adherence = 87.2;
    let activeUsers = 8732;
    let criticalCount = 124;

    if (selectedCohort === 'Salud Mental') {
      adherence = 91.2;
      activeUsers = 2110;
      criticalCount = 38;
    } else if (selectedCohort === 'Cardio-Reno-Metabólico') {
      adherence = 84.5;
      activeUsers = 3732;
      criticalCount = 76;
    } else if (selectedCohort === 'EPOC') {
      adherence = 78.4;
      activeUsers = 1260;
      criticalCount = 10;
    }

    if (selectedCity === 'Cali') {
      activeUsers = Math.round(activeUsers * 0.55);
      criticalCount = Math.round(criticalCount * 0.6);
    } else if (selectedCity === 'Barranquilla') {
      activeUsers = Math.round(activeUsers * 0.35);
      criticalCount = Math.round(criticalCount * 0.3);
    }

    return { adherence, activeUsers, criticalCount };
  }, [selectedCohort, selectedCity]);

  // Pre vs Post data for bar chart
  const barChartData = useMemo(() => {
    const m = prePostMetrics[activePrePostKey];
    return [
      { name: 'Antes del Programa (Basal)', Valor: m.pre, fill: '#EF4444' },
      { name: 'Después del Programa (GIRIS)', Valor: m.post, fill: '#10B981' }
    ];
  }, [activePrePostKey]);

  return (
    <div className="space-y-6 animate-slide-up-fade pb-16">
      
      {/* contextual title and action bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teker-cyan uppercase tracking-widest">
            <HeartPulse className="h-4 w-4" />
            <span>Gestión Integral de Pacientes Crónicos (GIRIS)</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight mt-1">Resultados en Salud</h2>
          <p className="text-sm text-slate-500">
            Nivel Meso Clínico — Monitoreo de adherencia, cohortes poblacionales y playbooks de intervención en salud.
          </p>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={handleRefresh}
            className={`p-2.5 text-slate-500 bg-white hover:text-teker-primary hover:bg-slate-50 rounded-xl border border-slate-200 shadow-sm transition-all flex items-center gap-1.5 text-xs font-bold ${isRefreshing ? 'animate-spin' : ''}`}
            title="Sincronizar datos"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Sincronizar</span>
          </button>
          
          <button 
            onClick={() => alert('Exportando reporte clínico completo de GIRIS 2.0 (Datos Anonimizados, Formato CSV)...')}
            className="px-4 py-2.5 bg-teker-primary text-white hover:bg-teker-primary/95 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Exportar Datos</span>
          </button>
        </div>
      </div>

      {/* Global Contextual Filter Bar */}
      <div className="card p-5 bg-white border-slate-100 shadow-sm rounded-3xl">
        <div className="flex items-center gap-2 border-b border-slate-50 pb-3 mb-4">
          <Filter className="h-4 w-4 text-teker-cyan" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Filtros Globales Decisionales</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          
          {/* Cohorte */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1">Cohorte Clínica</label>
            <select 
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl px-3 py-2 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-teker-cyan cursor-pointer"
            >
              <option value="All">Todas las cohortes</option>
              <option value="Cardio-Reno-Metabólico">Cardio-Reno-Metabólico</option>
              <option value="Salud Mental">Salud Mental</option>
              <option value="EPOC">EPOC / Respiratorio</option>
              <option value="Osteomuscular">Osteomuscular</option>
            </select>
          </div>

          {/* Pagador / Entidad */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1">Pagador / Asegurador</label>
            <select 
              className="text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl px-3 py-2 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-teker-cyan cursor-pointer"
              onChange={(e) => {
                // Mock pagador filter behavior
                if (e.target.value === 'Coomeva') {
                  setSelectedCity('All');
                } else if (e.target.value === 'SURA') {
                  setSelectedCity('Cali');
                }
              }}
            >
              <option value="All">Todos los pagadores</option>
              <option value="Coomeva">Coomeva Medicina Prepagada</option>
              <option value="SURA">EPS SURA</option>
              <option value="MedIntegral">Medicina Integral S.A.</option>
            </select>
          </div>

          {/* Riesgo Clínico */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1">Nivel de Riesgo</label>
            <select 
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl px-3 py-2 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-teker-cyan cursor-pointer"
            >
              <option value="All">Todos los niveles</option>
              <option value="Crítico">Crítico (≥2 fuera de rango)</option>
              <option value="Alto">Alto riesgo</option>
              <option value="Moderado">Riesgo moderado</option>
              <option value="Bajo">Controlado / Bajo riesgo</option>
            </select>
          </div>

          {/* Geografía */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1">Municipio / Depto</label>
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl px-3 py-2 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-teker-cyan cursor-pointer"
            >
              <option value="All">Todos los municipios</option>
              <option value="Cali">Cali (Valle)</option>
              <option value="Barranquilla">Barranquilla (Atlántico)</option>
              <option value="Popayán">Popayán (Cauca)</option>
              <option value="Santa Marta">Santa Marta (Magdalena)</option>
            </select>
          </div>

          {/* Búsqueda rápida paciente */}
          <div className="flex flex-col justify-end">
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1">Buscar ID / Médico</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ej: 35C1, Rincón..."
                value={searchTerm}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl pl-8 pr-3 py-2 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-teker-cyan"
              />
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            </div>
          </div>

        </div>
      </div>

      {/* Active Clinical Alert Banner System */}
      {metrics.criticalCount > 50 && (
        <AlertBanner
          level="critical"
          title="ALERTA ACTIVADA: COHORTE BAJO LÍMITE DE RIESGO O CRÍTICOS EXCEDIDOS"
          message={`Se detectan ${metrics.criticalCount} pacientes en estado DESCONTROLADO / CRÍTICO (≥2 indicadores fuera de rango en 30 días). Acciones automáticas disparadas: Escalamiento obligatorio a Comité de Riesgo Clínico y asignación de teleconsulta prioritaria en menos de 24 horas.`}
          actionLabel="Ver cola de pacientes críticos priorizados abajo"
          onAction={() => {
            const el = document.getElementById('priority-risk-queue');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="border-red-200"
          dismissible={false}
        />
      )}

      {/* 3 KPI Decisional Cards with Target Indicator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI 1: % Adherencia */}
        <div className="card p-5 flex flex-col justify-between h-36 bg-gradient-to-br from-white to-emerald-50/20 border-emerald-100">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">1. % Adherencia al Programa</span>
              <p className="text-[9px] text-slate-400 mt-0.5 font-bold">Fórmula: (Citas comité realizadas / programadas) × 100</p>
            </div>
            <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-md uppercase tracking-wider ${metrics.adherence >= 85 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              {metrics.adherence >= 85 ? 'Meta Cumplida' : 'Bajo Meta'}
            </span>
          </div>
          
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-teker-primary">{metrics.adherence}%</span>
            <span className="text-xs font-bold text-emerald-600">↑ 5.2% vs mes anterior</span>
          </div>

          <div className="border-t border-slate-50 pt-2 flex items-center justify-between text-[10px]">
            <span className="text-slate-400 font-medium">Meta clínica: <strong className="text-slate-700 font-bold">85.0%</strong></span>
            <span className="text-slate-400 font-medium">Umbral crítico: <strong className="text-red-500 font-bold">&lt;60.0%</strong></span>
          </div>
        </div>

        {/* KPI 2: Usuarios Activos */}
        <div className="card p-5 flex flex-col justify-between h-36 bg-gradient-to-br from-white to-blue-50/20 border-blue-100">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">2. Usuarios Activos en Cohorte</span>
              <p className="text-[9px] text-slate-400 mt-0.5 font-bold">Fórmula: Pacientes con actividad últimos 30 días</p>
            </div>
            <span className="px-2 py-0.5 text-[9px] font-extrabold bg-blue-100 text-blue-800 rounded-md uppercase tracking-wider">
              En Crecimiento
            </span>
          </div>
          
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-teker-primary">{metrics.activeUsers.toLocaleString()}</span>
            <span className="text-xs font-bold text-blue-600">↑ 3.8% vs mes anterior</span>
          </div>

          <div className="border-t border-slate-50 pt-2 flex items-center justify-between text-[10px]">
            <span className="text-slate-400 font-medium">Meta trimestral: <strong className="text-slate-700 font-bold">8,000 pac.</strong></span>
            <span className="text-slate-400 font-medium">Cobertura: <strong className="text-blue-500 font-bold">98.6%</strong></span>
          </div>
        </div>

        {/* KPI 3: Descontrolados */}
        <div className="card p-5 flex flex-col justify-between h-36 bg-gradient-to-br from-white to-red-50/20 border-red-100">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">3. Pacientes Críticos / Descontrolados</span>
              <p className="text-[9px] text-slate-400 mt-0.5 font-bold">Fórmula: ≥2 indicadores clínicos fuera de rango</p>
            </div>
            <span className="px-2 py-0.5 text-[9px] font-extrabold bg-red-100 text-red-800 rounded-md uppercase tracking-wider animate-pulse">
              ALERTA ROJA
            </span>
          </div>
          
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-red-600">{metrics.criticalCount}</span>
            <span className="text-xs font-bold text-red-600">↑ 12% vs mes anterior</span>
          </div>

          <div className="border-t border-slate-50 pt-2 flex items-center justify-between text-[10px]">
            <span className="text-slate-400 font-medium">Límite permitido: <strong className="text-slate-700 font-bold">&lt;100 pac.</strong></span>
            <span className="text-red-500 font-bold">Acción: Escalamiento inmediato</span>
          </div>
        </div>

      </div>

      {/* MESO SECTION: Cohorte Evolucion (Stack Area) & PRE VS POST INTERVENTION RESULTS (Interactive Business Value Metrics) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Stacked Area Chart for historical growth */}
        <div className="lg:col-span-8">
          <ChartContainer 
            title="Evolución Meso de Cohortes Activas"
            subtitle="Volumen de pacientes bajo programa en los últimos 6 meses"
            height={340}
            onExport={() => alert('Descargando serie de tiempo de cohortes activas...')}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyCohortsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCrm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1E40AF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMental" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEpoc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOsteo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNefro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#64748B' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                
                <Area type="monotone" name="Cardio-Reno-Metabólico (CRM)" dataKey="crm" stroke="#1E40AF" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCrm)" stackedId="1" />
                <Area type="monotone" name="Salud Mental" dataKey="mental" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorMental)" stackedId="1" />
                <Area type="monotone" name="EPOC / Respiratorio" dataKey="epoc" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorEpoc)" stackedId="1" />
                <Area type="monotone" name="Osteomuscular" dataKey="osteo" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorOsteo)" stackedId="1" />
                <Area type="monotone" name="Nefroprotección" dataKey="nefro" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#colorNefro)" stackedId="1" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Right Col: PRE VS POST CLINICAL METRIC COMPARATOR (THE BUSINESS VALUE COMPONENT) */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="card p-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <h3 className="font-bold text-slate-800 text-sm">Demostrador de Valor GIRIS</h3>
              </div>
              <p className="text-xs text-slate-500">
                Comparativo pre/post intervención para pacientes con adherencia continua. Selecciona un indicador clínico objetivo:
              </p>

              {/* Toggle metric buttons */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {(Object.keys(prePostMetrics) as Array<keyof typeof prePostMetrics>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActivePrePostKey(key)}
                    className={`p-2.5 rounded-xl border text-[10px] font-black uppercase text-left transition-all ${activePrePostKey === key ? 'bg-teker-primary text-white border-teker-primary shadow-sm' : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'}`}
                  >
                    {key === 'hba1c' ? 'Hemoglobina HbA1c' : key === 'bloodPressure' ? 'Presión Arterial' : key === 'phq9' ? 'Escala PHQ-9 (Mental)' : 'Exacerbaciones EPOC'}
                  </button>
                ))}
              </div>

              {/* Mini comparative bar chart */}
              <div className="h-44 mt-4 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748B' }} tickLine={false} axisLine={false} />
                    <RechartsTooltip />
                    <Bar dataKey="Valor" radius={[8, 8, 0, 0]}>
                      {barChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick value details card */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase">{prePostMetrics[activePrePostKey].title}</span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded-md">
                  {prePostMetrics[activePrePostKey].improvement} Mejoría
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 font-medium">{prePostMetrics[activePrePostKey].desc}</p>
            </div>
          </div>
        </div>

      </div>

      {/* MESO→MICRO: RETENTION FUNNEL & TIMELINE ARQUETIPO CRM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Funnel of Retention and Dropping point */}
        <div className="card p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-slate-800 text-base">Funnel de Retención y Conversión</h3>
                <p className="text-xs text-slate-500">Mapeo del ciclo de vida del paciente crónico en TeKer 2.0</p>
              </div>
              <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-orange-100 text-orange-800 rounded-md">
                Análisis de deserción
              </span>
            </div>

            {/* Stage representation using HTML list layout for pixel-perfect clarity */}
            <div className="space-y-2 mt-4">
              {clinicalFunnelData.map((item, idx) => {
                const nextItem = clinicalFunnelData[idx + 1];
                const convToNext = nextItem ? Math.round((nextItem.value / item.value) * 100) : null;
                return (
                  <div key={idx} className="relative">
                    <div className="flex items-center gap-3">
                      {/* Stack representation visually matching the percentages */}
                      <div className="w-24 text-right shrink-0">
                        <span className="text-xs font-bold text-slate-600">{item.stage}</span>
                      </div>
                      <div className="flex-1 bg-slate-100 h-8 rounded-xl overflow-hidden relative border border-slate-200/50">
                        <div 
                          className="h-full rounded-xl transition-all duration-500" 
                          style={{ width: `${item.pct}%`, backgroundColor: item.fill }}
                        />
                        <div className="absolute inset-0 flex items-center justify-between px-3 text-white font-bold text-xs">
                          <span>{item.value} pacientes</span>
                          <span>{item.pct}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Bridge conversions */}
                    {convToNext && (
                      <div className="ml-28 pl-2 py-1 flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                        <ChevronRight className="h-3 w-3 text-teker-cyan rotate-90" />
                        <span>Conversión a etapa posterior: <strong className="text-teker-primary">{convToNext}%</strong></span>
                        <span className="text-red-500 font-normal italic">(Caída: {item.drop}%)</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-orange-50/40 border border-orange-100/60 flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-orange-600 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide">Punto crítico de mayor caída detectado</h4>
              <p className="text-xs text-slate-600 mt-1">
                La mayor caída se presenta entre <strong>1. Ingreso</strong> y <strong>2. Activación</strong> (15%). 
                <span className="text-teker-primary font-bold"> Recomendación accionable:</span> Mejorar el onboarding clínico proactivo puede aumentar la retención de cohorte en un 15% este periodo.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline CRM Pathway & Criteria */}
        <div className="card p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-base">Timeline / Arquetipo Clínico CRM</h3>
                <p className="text-xs text-slate-500">Ruta estándar vs desviaciones de agendamiento real</p>
              </div>
              <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-blue-100 text-blue-800 rounded-md">
                Estándar de calidad
              </span>
            </div>

            <div className="relative border-l-2 border-slate-200 ml-4 space-y-6 pb-2">
              
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-[25px] bg-white p-1 rounded-full border-2 border-[#1E3A8A]">
                  <Check className="h-3.5 w-3.5 text-[#1E3A8A]" />
                </div>
                <div className="pl-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Semana 1: Captación e Inclusión</h4>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">SLA Cumplido</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Captación por coordinador. Diagnóstico inicial de HbA1c y PA.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-[25px] bg-white p-1 rounded-full border-2 border-teker-cyan">
                  <Activity className="h-3.5 w-3.5 text-teker-cyan" />
                </div>
                <div className="pl-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Mes 3: Adherencia Inicial</h4>
                    <span className="text-[10px] text-amber-600 font-extrabold bg-amber-50 px-1.5 py-0.5 rounded">Desviación: +14 días</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Intervención multidisciplinar. Citas comité de psicología y nutrición.</p>
                  <p className="text-[9px] text-red-500 font-bold mt-1">⚠️ Desviación detectada por alta demanda y cuello de botella en telepsicología.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-[25px] bg-white p-1 rounded-full border-2 border-teker-info">
                  <Clock className="h-3.5 w-3.5 text-teker-info" />
                </div>
                <div className="pl-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Mes 6: Control Clínico Objetivo</h4>
                    <span className="text-[10px] text-slate-500 font-semibold bg-slate-50 px-1.5 py-0.5 rounded">Próximo hito</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Re-evaluación objetiva de metas metabólicas y ajuste de fármacos.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="absolute -left-[25px] bg-white p-1 rounded-full border-2 border-emerald-500">
                  <BookOpen className="h-3.5 w-3.5 text-emerald-500" />
                </div>
                <div className="pl-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Mes 12: Graduación del Paciente</h4>
                    <span className="text-[10px] text-slate-500 font-semibold bg-slate-50 px-1.5 py-0.5 rounded">Hito de egreso</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Control sostenido de HbA1c y PA por 6 meses con alta de cohorte.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Inclusion & Graduation Criteria Panel */}
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-[11px] text-slate-600 bg-slate-50/50 p-4 rounded-2xl">
            <div>
              <h5 className="font-bold text-teker-primary uppercase text-[10px] tracking-wider mb-1">Criterios de Inclusión</h5>
              <p className="leading-relaxed">Diagnóstico verificado de diabetes (HbA1c &gt; 8.0%) o hipertensión no controlada (PA &gt; 140/90 mmHg).</p>
            </div>
            <div>
              <h5 className="font-bold text-emerald-700 uppercase text-[10px] tracking-wider mb-1">Criterios de Graduación</h5>
              <p className="leading-relaxed">Sostener HbA1c &lt; 7.0% y PA &lt; 130/80 por 6 meses seguidos con asistencia superior al 80% a citas de comité.</p>
            </div>
          </div>
        </div>

      </div>

      {/* SECCIÓN INSIGHTS POR COHORTE (IA-ASSISTED) - ENFOQUE DECISIONAL */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Insights Clínicos del Periodo (IA-Assisted)</h3>
            <p className="text-xs text-slate-500">Detección y sugerencias de corrección proactivas para líderes de cohorte y dirección clínica</p>
          </div>
          <span className="text-[10px] font-black uppercase text-teker-cyan bg-teker-cyan/10 px-2 py-1 rounded-md">Actualizado hace 1 hora</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="card p-5 bg-gradient-to-br from-white to-blue-50/10 border-blue-100 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-bold text-[9px] uppercase">Cardio-Reno-Metabólico</span>
              <h4 className="text-xs font-black uppercase text-slate-800 mt-2">Hallazgo: Alza en inasistencia virtual</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                <strong>Evidencia:</strong> 18% de inasistencia a telemedicina de nutrición en Cali durante junio, coincidiendo con reportes de fallas de cobertura 3G/4G en pacientes rurales.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-50 text-xs">
              <p className="text-slate-600"><strong>Acción:</strong> Habilitar llamadas telefónicas clásicas prioritarias.</p>
              <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 font-bold">
                <span>Responsable: Dr. David Góngora</span>
                <span className="text-emerald-600">Alta Prioridad</span>
              </div>
            </div>
          </div>

          <div className="card p-5 bg-gradient-to-br from-white to-purple-50/10 border-purple-100 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md font-bold text-[9px] uppercase">Salud Mental</span>
              <h4 className="text-xs font-black uppercase text-slate-800 mt-2">Hallazgo: Éxito en agenda fin de semana</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                <strong>Evidencia:</strong> El NPS de telepsicología subió a 90.9% al abrir turnos sábados por la tarde, aumentando la tasa de contacto efectivo en un 22%.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-50 text-xs">
              <p className="text-slate-600"><strong>Acción:</strong> Ampliar franja del sábado con 2 horas adicionales por psicólogo.</p>
              <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 font-bold">
                <span>Responsable: Dra. Daniella Estrada</span>
                <span className="text-blue-600">Oportunidad</span>
              </div>
            </div>
          </div>

          <div className="card p-5 bg-gradient-to-br from-white to-emerald-50/10 border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md font-bold text-[9px] uppercase">EPOC / Cuidado Respiratorio</span>
              <h4 className="text-xs font-black uppercase text-slate-800 mt-2">Hallazgo: Alerta de crisis estacionales</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                <strong>Evidencia:</strong> Aumento del 25% en reportes de crisis respiratorias leves en Barranquilla por cambio estacional (humedad).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-50 text-xs">
              <p className="text-slate-600"><strong>Acción:</strong> Entrega preventiva de folleto de inhalación de rescate.</p>
              <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 font-bold">
                <span>Responsable: Dr. Anelis Cobas</span>
                <span className="text-emerald-600">SLA 24h</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MICRO SECTION 1: COLA PRIORIZADA DE RIESGO CLÍNICO (PATIENT QUEUE DE LOS ARCHIVOS CSV) */}
      <div id="priority-risk-queue" className="space-y-4 pt-4">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-2">
          <div>
            <div className="flex items-center gap-1 text-red-500 font-bold text-xs uppercase tracking-widest">
              <ShieldAlert className="h-4 w-4" />
              <span>Nivel Micro — Casos bajo alerta activa</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mt-0.5">Cola Priorizada de Pacientes Descontrolados</h3>
            <p className="text-xs text-slate-500">Mapeo y asignación inmediata de pacientes con múltiples brechas clínicas (Habeas Data Anonimizados)</p>
          </div>
          <div className="text-xs font-bold text-slate-500">
            Mostrando <span className="text-slate-800">{filteredPatients.length} de {patientRecords.length}</span> casos
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Table Container */}
          <div className="xl:col-span-8 overflow-hidden rounded-3xl border border-slate-100 shadow-sm bg-white">
            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider">Cola de atención priorizada</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 italic">Haz clic en una fila para desplegar su expediente completo en el panel derecho</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-150">
                    <th className="p-3 text-[10px] font-black uppercase text-slate-500 tracking-wider">ID Paciente</th>
                    <th className="p-3 text-[10px] font-black uppercase text-slate-500 tracking-wider">Ciudad</th>
                    <th className="p-3 text-[10px] font-black uppercase text-slate-500 tracking-wider">Especialidad</th>
                    <th className="p-3 text-[10px] font-black uppercase text-slate-500 tracking-wider">Cohorte</th>
                    <th className="p-3 text-[10px] font-black uppercase text-slate-500 tracking-wider">Riesgo</th>
                    <th className="p-3 text-[10px] font-black uppercase text-slate-500 tracking-wider">Brechas detectadas</th>
                    <th className="p-3 text-[10px] font-black uppercase text-slate-500 tracking-wider">SLA</th>
                    <th className="p-3 text-[10px] font-black uppercase text-slate-500 tracking-wider">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPatients.map((row) => (
                    <tr 
                      key={row.id} 
                      onClick={() => setSelectedPatient(row)}
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors text-xs ${selectedPatient?.id === row.id ? 'bg-teker-cyan/5 border-l-4 border-l-teker-cyan' : ''}`}
                    >
                      <td className="p-3 font-bold text-teker-primary flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-slate-300" />
                        <span>#{row.id}</span>
                        {row.activeAlert && (
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" title="Alerta Crítica Activa" />
                        )}
                      </td>
                      <td className="p-3 text-slate-600 font-medium">{row.city}</td>
                      <td className="p-3 text-slate-600 font-medium">{row.specialty}</td>
                      <td className="p-3 font-bold text-slate-700">{row.cohort}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded font-black text-[9px] uppercase tracking-wide ${row.risk === 'Crítico' ? 'bg-red-100 text-red-800' : row.risk === 'Alto' ? 'bg-orange-100 text-orange-800' : 'bg-slate-100 text-slate-700'}`}>
                          {row.risk}
                        </span>
                      </td>
                      <td className="p-3 max-w-[150px] truncate text-slate-500" title={row.clinicalBreach.join(', ')}>
                        {row.clinicalBreach.join(', ')}
                      </td>
                      <td className="p-3">
                        <span className={`font-mono text-[10px] font-bold ${row.slaHours <= 12 ? 'text-red-600 font-black animate-pulse' : 'text-slate-500'}`}>
                          {row.slaHours}h
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-[10px] font-extrabold text-[#00AAE1] hover:underline flex items-center gap-0.5">
                          <span>Detalles</span>
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Col: EXPEDIENTE CLÍNICO DE PACIENTE (DETALLE DETALLADO DE CASO EXTREMO) */}
          <div className="xl:col-span-4 flex">
            {selectedPatient ? (
              <div className="card p-5 bg-gradient-to-b from-white to-slate-50/10 border-teker-cyan/30 shadow-md flex-1 flex flex-col justify-between animate-slide-up-fade">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5 text-teker-cyan" />
                      <div>
                        <h4 className="font-bold text-slate-800">Paciente #{selectedPatient.id}</h4>
                        <p className="text-[10px] text-slate-400">Origen: {selectedPatient.entity}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedPatient(null)}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase"
                    >
                      Cerrar
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] block text-slate-400 uppercase font-semibold">Ciudad / Municipio</span>
                        <strong className="text-slate-700 font-bold">{selectedPatient.city}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] block text-slate-400 uppercase font-semibold">Cohorte Asignada</span>
                        <strong className="text-slate-700 font-bold">{selectedPatient.cohort}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] block text-slate-400 uppercase font-semibold">Riesgo & Tendencia</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="px-1.5 py-0.5 rounded font-black text-[9px] uppercase bg-red-50 text-red-600">
                            {selectedPatient.risk}
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold">{selectedPatient.riskTrend}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] block text-slate-400 uppercase font-semibold">Especialidad</span>
                        <strong className="text-slate-700 font-bold">{selectedPatient.specialty}</strong>
                      </div>
                    </div>

                    <div className="border-t border-slate-50 pt-3">
                      <span className="text-[10px] block text-slate-400 uppercase font-semibold mb-1.5">Brechas de Control Detectadas</span>
                      <ul className="space-y-1">
                        {selectedPatient.clinicalBreach.map((b, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-slate-50 pt-3">
                      <span className="text-[10px] block text-slate-400 uppercase font-semibold">Playbook de Intervención Clínico</span>
                      <p className="text-xs text-slate-700 font-medium mt-1">
                        Actualmente rige el <strong className="text-teker-primary font-bold">Playbook CRM v3.2</strong>. 
                        Último control de HbA1c indica descontrol metabólico grave.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-6 space-y-3">
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <span className="text-[10px] block text-slate-400 uppercase font-semibold">Próximo paso recomendado</span>
                    <strong className="text-xs text-slate-700 block mt-1">{selectedPatient.nextStep}</strong>
                    <span className="text-[9px] text-slate-400 italic mt-0.5 block">SLA límite de respuesta: {selectedPatient.slaHours} horas</span>
                  </div>

                  <button 
                    onClick={() => {
                      alert(`Escalando el caso del Paciente #${selectedPatient.id} al Comité de Riesgo de la Cohorte ${selectedPatient.cohort}. Médico líder ${selectedPatient.doctor} notificado.`);
                      setSelectedPatient(null);
                    }}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>Disparar Comité de Riesgo Clínico</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="card p-6 flex flex-col justify-center items-center text-center flex-1 border-dashed border-2 border-slate-200 bg-slate-50/20">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-teker-cyan mb-4">
                  <Stethoscope className="h-7 w-7" />
                </div>
                <h4 className="font-bold text-slate-700 text-sm">Detalles del Paciente</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                  Selecciona cualquier paciente de la cola priorizada izquierda para visualizar sus brechas clínicas, SLA e iniciar el escalamiento correspondiente.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Comité de Riesgo Clínico Rules Card */}
        <div className="card p-5 bg-gradient-to-r from-slate-900 to-teker-primary text-white border-none shadow-md mt-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-teker-cyan">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Normativa del Comité de Riesgo Clínico TeKer 2.0</h4>
                <p className="text-xs text-white/70 mt-0.5 leading-relaxed">
                  <strong>Disparadores:</strong> ≥2 indicadores fuera de rango por 30 días o inasistencia reiterada. <strong className="text-teker-cyan">Participantes obligatorios:</strong> Médico líder de cohorte, enfermera gestora, nutriólogo, psicólogo.
                </p>
              </div>
            </div>
            <div className="text-xs text-white/80 shrink-0 font-medium">
              <span>SLA Máximo de Resolución: <strong className="text-teker-cyan">24 horas</strong></span>
            </div>
          </div>
        </div>

      </div>

      {/* MICRO SECTION 2: PLAYBOOKS CLÍNICOS ACTIVO */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-teker-cyan font-bold text-xs uppercase tracking-widest">
              <BookOpen className="h-4 w-4" />
              <span>Gestión de Protocolos Activos</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mt-1">Playbooks Clínicos por Cohorte</h3>
            <p className="text-xs text-slate-500">Gobernanza clínica, cumplimiento, variaciones y estimación de años de vida salvados (QALY)</p>
          </div>

          {/* Interactive tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['Cardio-Reno-Metabólico', 'Salud Mental', 'EPOC'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActivePlaybookTab(tab)}
                className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all ${activePlaybookTab === tab ? 'bg-white text-teker-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {tab === 'Cardio-Reno-Metabólico' ? 'Cardio-Reno-Metabólico (CRM)' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Playbook view */}
        {activePlaybooks.map((pb) => {
          if (pb.cohort !== activePlaybookTab) return null;
          return (
            <div key={pb.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-slide-up-fade">
              
              {/* Playbook stats and outcomes */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Código Playbook</span>
                    <strong className="text-slate-800 font-bold text-base">{pb.id}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Cumplimiento del Protocolo</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <strong className="text-slate-800 font-black text-2xl">{pb.complianceRate}%</strong>
                      <span className="text-emerald-600 text-[10px] font-bold">↑ 2.1% vs esperado</span>
                    </div>
                    {/* compliance bar */}
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pb.complianceRate}%` }} />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Variaciones autorizadas</span>
                    <strong className="text-slate-800 font-black text-lg">{pb.approvedVariations || 2} casos aprobados</strong>
                    <span className="text-[9px] block text-slate-400 italic">Desviaciones aprobadas clínicamente por comorbilidad grave.</span>
                  </div>
                </div>

                {/* QALY impact highlight */}
                <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100/60 flex items-start gap-3">
                  <HeartPulse className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-black text-slate-800 uppercase tracking-wide">Impacto en resultados QALY</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {pb.qalyImpact || '+1.1 Años de Vida Ajustados por Calidad (QALY) promedio estimados.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Steps of the active playbook timeline */}
              <div className="lg:col-span-8">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-3">Línea de tiempo del paciente y profesionales de salud</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pb.steps ? pb.steps.map((s, idx) => (
                    <div key={idx} className="card p-4 hover:shadow-sm bg-white border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-teker-cyan/10 flex items-center justify-center text-teker-cyan font-bold text-xs shrink-0">
                          {idx + 1}
                        </div>
                        <h5 className="font-bold text-slate-800 text-xs uppercase">{s.phase}</h5>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {s.actions}
                      </p>
                      <div className="mt-3 pt-2 border-t border-slate-50 flex justify-between items-center text-[10px] text-slate-400 font-medium">
                        <span>Frecuencia: Obligatorio</span>
                        <span className="font-bold text-teker-primary">{s.responsible}</span>
                      </div>
                    </div>
                  )) : (
                    <div className="p-4 text-xs text-slate-400">Playbook en actualización.</div>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* SECCIÓN GOBERNANZA Y CONFIANZA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Data Quality Panel */}
        <div className="card p-5">
          <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-3">Gobernanza y Calidad del Dato</h4>
          <div className="space-y-3.5 text-xs text-slate-600">
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Cobertura de datos</span>
              <strong className="text-slate-800 font-bold">98.6% (Excelente)</strong>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Última actualización de datos</span>
              <strong className="text-slate-800 font-bold">Hace 5 minutos (Tiempo Real)</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase mb-1">Supuestos del Modelo</span>
              <p className="leading-relaxed text-[11px] text-slate-500">
                Se asume ventana de evaluación móvil de 30 días para alertas de descontrol. Pacientes duplicados o sin diagnóstico verificado son removidos automáticamente.
              </p>
            </div>
          </div>
        </div>

        {/* Trazabilidad Panel */}
        <div className="card p-5">
          <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-3">Trazabilidad y Reglas de Alertas</h4>
          <div className="space-y-3.5 text-xs text-slate-600">
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase mb-1">Origen de Datos</span>
              <p className="leading-relaxed text-[11px] text-slate-500">
                Integración con GIRIS CRM Core y MedStats DB Sync para captación en tiempo real. Auditoría de cambios realizada quincenalmente.
              </p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase mb-1">Lógica de Alertas Clínicas</span>
              <p className="leading-relaxed text-[11px] text-slate-500">
                Bandera roja activada si se registran ≥2 indicadores fuera de rango (como PA &gt;140/90 o HbA1c &gt;8.0%) en los últimos 30 días calendarios.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Note Panel */}
        <div className="card p-5 bg-slate-900 text-white border-none flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wide mb-2">Nota de Privacidad y Anonimato</h4>
            <p className="text-xs text-white/80 leading-relaxed">
              Todos los datos de pacientes están completamente anonimizados conforme a la regulación Habeas Data y directrices de protección de datos de salud en Colombia.
            </p>
            <p className="text-xs text-white/80 leading-relaxed mt-3">
              La geolocalización de pacientes está restringida únicamente a nivel de municipio y departamento para proteger la privacidad del usuario.
            </p>
          </div>
          <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-white/60 font-bold uppercase">
            <span>Cumple Habeas Data</span>
            <span className="text-teker-cyan">TeKer Secure 2.0</span>
          </div>
        </div>

      </div>

    </div>
  );
}
