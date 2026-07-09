import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Users, AlertCircle, Info, 
  HelpCircle, Sparkles, Sliders, Play, RotateCcw, ArrowRight, ShieldCheck, Download
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { ChartContainer } from '@/components/ui/ChartContainer';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell, AreaChart, Area
} from 'recharts';

// Mock Cohort data for Unit Economics
interface CohortData {
  id: string;
  name: string;
  pagador: string;
  activePatients: number;
  costPatientMonth: number;
  revenuePatientMonth: number;
  breakEvenPatients: number;
  margin: number;
  status: 'cash_cow' | 'healthy' | 'cash_burner';
}

const initialCohorts: CohortData[] = [
  { id: 'C1', name: 'Cardio-Reno-Metabólica', pagador: 'Sura', activePatients: 2450, costPatientMonth: 42, revenuePatientMonth: 65, breakEvenPatients: 800, margin: 35.3, status: 'cash_cow' },
  { id: 'C2', name: 'Salud Mental Integral', pagador: 'Colsanitas', activePatients: 1200, costPatientMonth: 68, revenuePatientMonth: 95, breakEvenPatients: 500, margin: 28.4, status: 'healthy' },
  { id: 'C3', name: 'EPOC Controlado', pagador: 'Sura', activePatients: 850, costPatientMonth: 55, revenuePatientMonth: 60, breakEvenPatients: 950, margin: 9.1, status: 'cash_burner' },
  { id: 'C4', name: 'Diabetes Preventiva', pagador: 'Compensar', activePatients: 3100, costPatientMonth: 28, revenuePatientMonth: 48, breakEvenPatients: 1100, margin: 41.6, status: 'cash_cow' },
  { id: 'C5', name: 'Hipertensión Plus', pagador: 'Colsanitas', activePatients: 1500, costPatientMonth: 32, revenuePatientMonth: 45, breakEvenPatients: 650, margin: 28.8, status: 'healthy' },
];

export function DafiDashboard() {
  // Filters
  const [selectedPagador, setSelectedPagador] = useState<string>('todos');
  const [selectedCohorte, setSelectedCohorte] = useState<string>('todos');
  const [selectedPeriodo, setSelectedPeriodo] = useState<string>('T2-2026');
  
  // Interactive Simulator State
  const [simContractType, setSimContractType] = useState<string>('capita');
  const [simPatientVolume, setSimPatientVolume] = useState<number>(2000);
  const [simRiskLevel, setSimRiskLevel] = useState<string>('medio');
  const [simChannelRate, setSimChannelRate] = useState<number>(40); // % automated by IA

  // Decisions Applied Simulation (Scenario Picker)
  const [escalatedCardio, setEscalatedCardio] = useState<boolean>(false);
  const [redesignedEPOC, setRedesignedEPOC] = useState<boolean>(false);
  const [terminatedBurners, setTerminatedBurners] = useState<boolean>(false);

  // Filtered Cohorts list
  const filteredCohorts = useMemo(() => {
    return initialCohorts.filter(c => {
      const matchPagador = selectedPagador === 'todos' || c.pagador === selectedPagador;
      const matchCohorte = selectedCohorte === 'todos' || c.name.toLowerCase().includes(selectedCohorte.toLowerCase());
      return matchPagador && matchCohorte;
    });
  }, [selectedPagador, selectedCohorte]);

  // Derived metrics based on scenario switches
  const totalMargin = useMemo(() => {
    let base = 24.0; // %
    if (escalatedCardio) base += 2.5;
    if (redesignedEPOC) base += 1.8;
    if (terminatedBurners) base += 3.2;
    return parseFloat(base.toFixed(1));
  }, [escalatedCardio, redesignedEPOC, terminatedBurners]);

  const totalROI = useMemo(() => {
    let base = 22.4; // %
    if (escalatedCardio) base += 3.1;
    if (redesignedEPOC) base += 2.4;
    if (terminatedBurners) base += 4.5;
    return parseFloat(base.toFixed(1));
  }, [escalatedCardio, redesignedEPOC, terminatedBurners]);

  const totalSavings = useMemo(() => {
    let base = 1420500; // USD
    if (escalatedCardio) base += 250000;
    if (redesignedEPOC) base += 90000;
    if (terminatedBurners) base -= 50000; // terminates contracts, reduces total raw savings slightly but increases ROI
    return base;
  }, [escalatedCardio, redesignedEPOC, terminatedBurners]);

  // Waterfall Chart Data
  const waterfallData = [
    { name: 'Ingresos Totales', value: 2500, display: '$2,500K', fill: '#1e40af' },
    { name: 'Costo Humano', value: -1200, display: '-$1,200K', fill: '#ef4444' },
    { name: 'Costo IA/Auto', value: -180, display: '-$180K', fill: '#0ea5e9' },
    { name: 'Costo Operativo', value: -320, display: '-$320K', fill: '#f59e0b' },
    { name: 'Margen TeKer', value: 800, display: '+$800K', fill: '#10b981' }
  ];

  // Pre-Post Intervention Data
  const prePostData = [
    { name: 'Cardio (Pre)', ClaimCost: 1520, Intervencion: 0 },
    { name: 'Cardio (Post)', ClaimCost: 890, Intervencion: 120 },
    { name: 'Salud Mental (Pre)', ClaimCost: 980, Intervencion: 0 },
    { name: 'Salud Mental (Post)', ClaimCost: 610, Intervencion: 180 },
    { name: 'EPOC (Pre)', ClaimCost: 1850, Intervencion: 0 },
    { name: 'EPOC (Post)', ClaimCost: 1620, Intervencion: 150 },
  ];

  // Projected scenarios under chosen switches
  const projectionData = useMemo(() => {
    const data = [];
    let cumulativeSavings = 0;
    let baseMonthly = 118000;
    
    // adjust base monthly based on switches
    if (escalatedCardio) baseMonthly += 21000;
    if (redesignedEPOC) baseMonthly += 15000;
    if (terminatedBurners) baseMonthly += 12000;

    for (let i = 1; i <= 12; i++) {
      const growthFactor = 1 + (i * 0.03);
      const monthlySavings = baseMonthly * growthFactor;
      cumulativeSavings += monthlySavings;
      data.push({
        month: `Mes ${i}`,
        'Ahorro Mensual': Math.round(monthlySavings),
        'Acumulado': Math.round(cumulativeSavings),
      });
    }
    return data;
  }, [escalatedCardio, redesignedEPOC, terminatedBurners]);

  // Pricing Simulator Calculations
  const simResults = useMemo(() => {
    // Pricing logic
    let baseRate = 50; // per patient-month
    if (simContractType === 'capita') baseRate = 45;
    else if (simContractType === 'paquete') baseRate = 85; // higher rate for specific care bundle
    else if (simContractType === 'evento') baseRate = 120; // high rate per event
    else baseRate = 60; // hybrid

    // Risk multiplier
    let riskMultiplier = 1.0;
    if (simRiskLevel === 'alto') riskMultiplier = 1.4;
    else if (simRiskLevel === 'bajo') riskMultiplier = 0.85;

    // IA Automation factor (clinical cost reduction)
    // 0% automation -> cost is $35 per patient month. 100% automation -> cost is $10.
    const automationSavings = (simChannelRate / 100) * 18;
    const clinicalCost = Math.max(12, 35 - automationSavings);

    const pricePerPatient = baseRate * riskMultiplier;
    const totalRevenue = pricePerPatient * simPatientVolume;
    const totalClinicalCost = clinicalCost * simPatientVolume;
    const techCost = 4.5 * simPatientVolume; // license fee
    const grossMarginVal = totalRevenue - totalClinicalCost - techCost;
    const marginPercent = totalRevenue > 0 ? (grossMarginVal / totalRevenue) * 100 : 0;
    
    // Estimated insurer avoided cost (ROI)
    const expectedAvoidedCost = pricePerPatient * 1.8 * simPatientVolume; 
    const calculatedROI = grossMarginVal > 0 ? ((expectedAvoidedCost - totalRevenue) / totalRevenue) * 100 : 0;

    return {
      pricePerPatient: Math.round(pricePerPatient),
      totalRevenue: Math.round(totalRevenue),
      marginPercent: Math.round(marginPercent * 10) / 10,
      calculatedROI: Math.round(calculatedROI * 10) / 10,
      clinicalCost: Math.round(clinicalCost),
      breakEven: Math.round((totalClinicalCost + techCost) / pricePerPatient)
    };
  }, [simContractType, simPatientVolume, simRiskLevel, simChannelRate]);

  return (
    <div className="space-y-6 pb-12 animate-slide-up-fade">
      
      {/* HEADER TÍTULO Y FILTROS GLOBALES */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-[10px] font-black uppercase tracking-wider bg-blue-100 text-[#1e40af] rounded-md">
              Estratégico / Decision-First
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: DAFI-MAIN</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-800 mt-1">
            Tablero DAFI TeKer 2.0
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Analítica Financiera, Unit Economics y Simulación de Pricing de Cohortes
          </p>
        </div>

        {/* Global Selects */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Pagador/Asegurador</label>
            <select 
              value={selectedPagador} 
              onChange={(e) => setSelectedPagador(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 focus:outline-none focus:border-teker-cyan font-medium"
            >
              <option value="todos">Todos los Pagadores</option>
              <option value="Sura">EPS Sura</option>
              <option value="Colsanitas">Colsanitas Medicina Prepaga</option>
              <option value="Compensar">Compensar EPS</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Filtro Cohorte</label>
            <select 
              value={selectedCohorte} 
              onChange={(e) => setSelectedCohorte(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 focus:outline-none focus:border-teker-cyan font-medium"
            >
              <option value="todos">Todas las Cohortes</option>
              <option value="Cardio">Cardio-Reno-Metabólica</option>
              <option value="Mental">Salud Mental</option>
              <option value="EPOC">EPOC</option>
              <option value="Diabetes">Diabetes</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Período Fiscal</label>
            <select 
              value={selectedPeriodo} 
              onChange={(e) => setSelectedPeriodo(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 focus:outline-none focus:border-teker-cyan font-medium"
            >
              <option value="T2-2026">Trimestre 2 2026 (Actual)</option>
              <option value="T1-2026">Trimestre 1 2026</option>
              <option value="T4-2025">Trimestre 4 2025</option>
            </select>
          </div>

          <button 
            onClick={() => {
              setSelectedPagador('todos');
              setSelectedCohorte('todos');
              setSelectedPeriodo('T2-2026');
              setEscalatedCardio(false);
              setRedesignedEPOC(false);
              setTerminatedBurners(false);
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
          title="ROI por Cohorte Promedio"
          value={`${totalROI}%`}
          trend={escalatedCardio || redesignedEPOC || terminatedBurners ? Math.round((totalROI - 22.4) * 10) / 10 : 2.4}
          subtitle="Meta de Escalamiento: >20%"
          variant={totalROI < 10 ? 'error' : totalROI < 20 ? 'warning' : 'success'}
        />

        <KPICard 
          title="Ahorro Asegurador (Claims Evitados)"
          value={`$${(totalSavings / 1000).toLocaleString()}K COP`}
          trend={12}
          subtitle="Baseline pre-intervención vs 12m post"
          variant="success"
        />

        <KPICard 
          title="Margen de Contribución TeKer"
          value={`${totalMargin}%`}
          trend={escalatedCardio || redesignedEPOC || terminatedBurners ? Math.round((totalMargin - 24) * 10) / 10 : 4}
          subtitle="Mezcla: Humano vs IA / Automatización"
          variant={totalMargin < 15 ? 'warning' : 'success'}
        />

      </div>

      {/* ALERTAS VISUALES ACTIVAS */}
      <div className="bg-red-50/70 border border-red-200 rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-3 items-start">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-black text-slate-800">
              Desviación Crítica de ROI en Cohorte EPOC-Sura
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-normal">
              La cohorte de <strong>EPOC-Sura (C3)</strong> registra un ROI del <strong>9.1%</strong> por segundo trimestre consecutivo. Esto se ubica bajo el umbral límite del 10%. Causas: Exceso de visitas domiciliarias físicas no justificadas y baja adopción de monitoreo en AppGIRIS.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setRedesignedEPOC(true)} 
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap"
          >
            Aplicar Plan Rediseño IA (+1.8% Margen)
          </button>
        </div>
      </div>

      {/* SECCIÓN 2 — WATERFALL DE ROI & COMPARATIVO PRE-POST (MESO) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Waterfall Chart */}
        <ChartContainer 
          title="Waterfall de ROI: De Ingreso a Margen Neto"
          subtitle="Estructura de costos unit economics consolidados por paciente-mes ($K COP)"
          insight="El costo humano (clínico) representa el 48% de la estructura de egreso. La automatización por IA en tele-monitoreo reduce el costo marginal un 15% en el último mes."
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterfallData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0' }}
                formatter={(value: any) => [`$${Math.abs(value)}K COP`, 'Valor']}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {waterfallData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Pre-Post Claim Cost */}
        <ChartContainer 
          title="Costo Promedio Siniestro Pre vs Post Intervención"
          subtitle="Claims médicos del asegurador (6 meses Pre vs 12 meses Post) por paciente"
          insight="La cohorte Cardio muestra una reducción del 41.4% en costo de siniestros evitados (Urgencias / Hospitalizaciones). La intervención TeKer absorbe este costo con alto ROI."
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={prePostData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip contentStyle={{ borderRadius: '12px' }} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Bar name="Claims Médicos del Asegurador ($K COP)" dataKey="ClaimCost" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar name="Costo Intervención TeKer ($K COP)" dataKey="Intervencion" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

      </div>

      {/* SECCIÓN 3 — UNIT ECONOMICS POR COHORTE (MESO→MICRO) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Unit Economics por Cohorte de Riesgo</h3>
            <p className="text-xs text-slate-500">Métricas analíticas detalladas por paciente-mes y punto de equilibrio por contrato</p>
          </div>
          <div className="flex gap-2">
            <span className="px-2.5 py-1 text-[11px] bg-emerald-50 text-emerald-700 rounded-full font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Cash Cow ({filteredCohorts.filter(c => c.status === 'cash_cow').length})
            </span>
            <span className="px-2.5 py-1 text-[11px] bg-red-50 text-red-700 rounded-full font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Cash Burner ({filteredCohorts.filter(c => c.status === 'cash_burner').length})
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Cohorte / Programa</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Pagador</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Pacientes Activos</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Costo Paciente-Mes</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Ingreso Paciente-Mes</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Break-even (Pacientes)</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Margen Bruto</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Estado Unit Economics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCohorts.map((cohort) => (
                <tr key={cohort.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-semibold text-slate-800 text-sm">{cohort.name}</td>
                  <td className="p-4 text-slate-600 text-sm">{cohort.pagador}</td>
                  <td className="p-4 text-right font-mono font-medium text-sm">{cohort.activePatients.toLocaleString()}</td>
                  <td className="p-4 text-right font-mono text-slate-600 text-sm">${cohort.costPatientMonth}K COP</td>
                  <td className="p-4 text-right font-mono text-slate-600 text-sm">${cohort.revenuePatientMonth}K COP</td>
                  <td className="p-4 text-right font-mono text-slate-500 text-sm">{cohort.breakEvenPatients}</td>
                  <td className="p-4 text-right font-mono font-bold text-emerald-600 text-sm">{cohort.margin}%</td>
                  <td className="p-4">
                    {cohort.status === 'cash_cow' ? (
                      <span className="px-2 py-1 text-[10px] font-bold bg-green-50 text-green-700 rounded-md">
                        CASH COW (Escalar)
                      </span>
                    ) : cohort.status === 'cash_burner' ? (
                      <span className="px-2 py-1 text-[10px] font-bold bg-red-50 text-red-700 rounded-md animate-pulse">
                        CASH BURNER (Rediseñar)
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-[10px] font-bold bg-blue-50 text-blue-700 rounded-md">
                        ESTABLE / SALUDABLE
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECCIÓN 4 — SIMULADOR DE PRICING Y CONTRATACIÓN (MESO) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Controls Column */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 lg:col-span-1">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-teker-primary" />
            <h3 className="font-bold text-slate-800 text-base">Simulador de Pricing TeKer</h3>
          </div>
          
          <div className="space-y-4 text-xs">
            {/* Modelo de Contrato */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-slate-500 uppercase">Modelo de Reembolso</label>
              <div className="grid grid-cols-2 gap-2">
                {['capita', 'paquete', 'evento', 'hibrido'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSimContractType(type)}
                    className={`py-2 px-1 rounded-lg border text-[10.5px] font-black uppercase tracking-wider transition-colors ${
                      simContractType === type 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Volumen Pacientes */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between font-bold">
                <span className="text-slate-500 uppercase">Volumen Pacientes-Mes</span>
                <span className="text-teker-primary font-mono">{simPatientVolume.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min={500} 
                max={10000} 
                step={500}
                value={simPatientVolume} 
                onChange={(e) => setSimPatientVolume(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1e40af]"
              />
            </div>

            {/* Intensidad / Riesgo Cohorte */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-slate-500 uppercase">Intensidad / Riesgo Cohorte</label>
              <select 
                value={simRiskLevel} 
                onChange={(e) => setSimRiskLevel(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none"
              >
                <option value="bajo">Riesgo Bajo (Multiplicador 0.85×)</option>
                <option value="medio">Riesgo Medio (Multiplicador 1.0×)</option>
                <option value="alto">Riesgo Alto (Multiplicador 1.4×)</option>
              </select>
            </div>

            {/* Tasa Automatización IA */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between font-bold">
                <span className="text-slate-500 uppercase">Automatización / Triage IA</span>
                <span className="text-emerald-600 font-mono">{simChannelRate}%</span>
              </div>
              <input 
                type="range" 
                min={10} 
                max={90} 
                step={10}
                value={simChannelRate} 
                onChange={(e) => setSimChannelRate(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <p className="text-[10px] text-slate-400 italic">A mayor automatización, menor costo marginal de consulta clínica.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Punto de equilibrio contractual:</span>
            <span className="font-mono font-bold text-slate-700">{simResults.breakEven} pacientes-mes</span>
          </div>
        </div>

        {/* Output Column */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg space-y-6 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400">Proyección y Unit Economics</h4>
              <span className="bg-slate-800 text-[10px] font-mono px-2 py-0.5 rounded text-slate-300">Simulación en Tiempo Real</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Tarifa p/ Paciente</span>
                <span className="text-xl font-bold font-mono text-white mt-1 block">${simResults.pricePerPatient}K</span>
                <span className="text-[8px] text-slate-400 block mt-0.5">COP / Paciente-Mes</span>
              </div>
              
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Ingreso Proyectado</span>
                <span className="text-xl font-bold font-mono text-white mt-1 block">${(simResults.totalRevenue / 1000).toFixed(0)}M</span>
                <span className="text-[8px] text-slate-400 block mt-0.5">COP mensual</span>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="text-[9px] text-emerald-400 uppercase font-bold block">Margen de Contribución</span>
                <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">{simResults.marginPercent}%</span>
                <span className="text-[8px] text-emerald-400 block mt-0.5">Costo Clínico: ${simResults.clinicalCost}K</span>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="text-[9px] text-cyan-400 uppercase font-bold block">ROI Estimado Asegurador</span>
                <span className="text-xl font-bold font-mono text-cyan-400 mt-1 block">{simResults.calculatedROI}%</span>
                <span className="text-[8px] text-cyan-400 block mt-0.5">Costo evitado proyectado</span>
              </div>
            </div>

            {/* Scenario sensitivity display */}
            <div className="mt-6 bg-white/5 rounded-2xl p-4 border border-white/10 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block">Sensibilidad de ROI por Escenarios</span>
              <div className="grid grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-red-400 font-bold block">Pesimista (20% Churn)</span>
                  <span className="text-sm font-bold block mt-1">{(simResults.calculatedROI * 0.7).toFixed(1)}% ROI</span>
                  <span className="text-[8px] text-slate-400">Margen: {(simResults.marginPercent * 0.8).toFixed(1)}%</span>
                </div>
                <div className="border-x border-white/10 px-4">
                  <span className="text-[10px] text-slate-300 font-bold block">Base (Proyección)</span>
                  <span className="text-sm font-bold block mt-1">{simResults.calculatedROI}% ROI</span>
                  <span className="text-[8px] text-slate-400">Margen: {simResults.marginPercent}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold block">Optimista (+30% Adopción)</span>
                  <span className="text-sm font-bold block mt-1">{(simResults.calculatedROI * 1.35).toFixed(1)}% ROI</span>
                  <span className="text-[8px] text-slate-400">Margen: {(simResults.marginPercent * 1.15).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <span className="text-[10px] text-slate-400 italic">Los cálculos consideran el costo tecnológico de licencias TeKer y salarios promedio ponderados.</span>
            <button className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-black text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2">
              <span>Exportar Simulación a Propuesta Comercial</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

      {/* SECCIÓN 5 — ATRIBUCIÓN Y METODOLOGÍA (GOBERNANZA DE DATOS) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <h3 className="font-bold text-slate-800 text-base">Metodología y Gobernanza de Atribución Financiera</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[10px] mb-2">1. Línea Base & Claims</h4>
            <p className="leading-relaxed">
              El período baseline se establece estrictamente en los 6 meses previos al primer ingreso del paciente en TeKer. Las reclamaciones (claims) se extraen directamente del sistema del asegurador (RIPS) e incluyen urgencias, hospitalizaciones y consultas de especialidades críticas.
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[10px] mb-2">2. Criterios de Inclusión</h4>
            <p className="leading-relaxed">
              Se consideran solo pacientes que hayan permanecido un mínimo de 90 días activos en el programa y tengan al menos un diagnóstico CIE-10 coincidente. Los costos marginales clínicos incluyen horas de personal de salud (tarifadas por minuto) más costos operativos de plataforma.
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[10px] mb-2">3. Atribución Conservadora</h4>
            <p className="leading-relaxed">
              Se aplica una tasa de descuento del 15% para contemplar causas externas (cambios de temporada médica, programas paralelos de EPS) garantizando una justificación conservadora de ROI de Claims evitados ante comités técnicos de aseguradores.
            </p>
          </div>
        </div>

        <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 flex gap-3 items-center text-xs text-slate-600">
          <Info className="h-4 w-4 text-[#1e40af]" />
          <span>
            <strong>Gobernanza TeKer:</strong> Los datos de ahorro son validados trimestralmente en conjunto con las auditorías médicas de las EPS aliadas. Ningún dato clínico directo es expuesto a agentes financieros externos.
          </span>
        </div>
      </div>

      {/* SECCIÓN 6 — PROYECCIONES Y ESCENARIOS (DECISIONAL) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Projections Chart */}
        <div className="lg:col-span-2">
          <ChartContainer 
            title="Proyección de Retorno Financiero (12 Meses)"
            subtitle="Basado en decisiones estratégicas aplicadas en tiempo real"
            insight="La simulación de crecimiento a 12 meses proyecta un ahorro acumulado neto que supera el punto de equilibrio corporativo en el Mes 5."
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Area name="Ahorro Mensual Proyectado ($K COP)" type="monotone" dataKey="Ahorro Mensual" stroke="#10b981" fillOpacity={1} fill="url(#colorSavings)" />
                <Area name="Ahorro Neto Acumulado ($K COP)" type="monotone" dataKey="Acumulado" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCumulative)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Action Panel */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h4 className="font-bold text-slate-800 text-sm">Escenarios de Decisión Estratégica</h4>
            </div>
            <p className="text-xs text-slate-500">Activa escenarios simulados para ver el impacto en las proyecciones de ROI y margen corporativo.</p>
            
            <div className="space-y-3">
              {/* Scenario 1 */}
              <label className="flex items-start gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl cursor-pointer transition-colors border border-slate-100 block">
                <input 
                  type="checkbox" 
                  checked={escalatedCardio} 
                  onChange={(e) => setEscalatedCardio(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#1e40af] focus:ring-[#1e40af]" 
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Escalar Cohorte Cardio (+30%)</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Asignar $250M COP adicionales a Sura para absorber pacientes de alto riesgo. Impacto: +3.1% ROI.</span>
                </div>
              </label>

              {/* Scenario 2 */}
              <label className="flex items-start gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl cursor-pointer transition-colors border border-slate-100 block">
                <input 
                  type="checkbox" 
                  checked={redesignedEPOC} 
                  onChange={(e) => setRedesignedEPOC(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#1e40af] focus:ring-[#1e40af]" 
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block font-black">Plan Rediseño EPOC (Triage IA)</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Sustituir 40% de visitas domiciliarias por telemonitoreo AppGIRIS. Impacto: +2.4% ROI y +1.8% Margen.</span>
                </div>
              </label>

              {/* Scenario 3 */}
              <label className="flex items-start gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl cursor-pointer transition-colors border border-slate-100 block">
                <input 
                  type="checkbox" 
                  checked={terminatedBurners} 
                  onChange={(e) => setTerminatedBurners(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#1e40af] focus:ring-[#1e40af]" 
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block text-red-600">Dar Término a Contratos Burners</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Finalizar contrato piloto con ROI &lt; 10% de forma progresiva. Impacto: +4.5% ROI general.</span>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Total ROI Estimado:</span>
              <span className="font-mono font-bold text-emerald-600 text-sm">{totalROI}%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Total Margen TeKer:</span>
              <span className="font-mono font-bold text-emerald-600 text-sm">{totalMargin}%</span>
            </div>
            <button 
              onClick={() => alert(`Escenarios estratégicos enviados a Jacobo Estrada para revisión comercial y firmas contractuales en Teams.`)}
              className="w-full py-2.5 bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-black text-xs uppercase rounded-xl transition-colors text-center"
            >
              Presentar Escenario a Jacobo Estrada
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
