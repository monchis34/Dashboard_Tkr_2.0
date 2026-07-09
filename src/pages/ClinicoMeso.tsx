import React from 'react';
import { ChartContainer } from '@/components/ui/ChartContainer';
import { InsightCard } from '@/components/ui/InsightCard';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, FunnelChart, Funnel, LabelList } from 'recharts';
import { Stethoscope, Activity, FileText } from 'lucide-react';

const areaData = [
  { mes: 'Ene', crm: 400, mental: 240, epoc: 150 },
  { mes: 'Feb', crm: 450, mental: 280, epoc: 180 },
  { mes: 'Mar', crm: 500, mental: 320, epoc: 200 },
  { mes: 'Abr', crm: 580, mental: 400, epoc: 210 },
  { mes: 'May', crm: 650, mental: 450, epoc: 230 },
  { mes: 'Jun', crm: 720, mental: 520, epoc: 250 },
];

const funnelData = [
  { stage: 'Ingreso', value: 1200, fill: '#023D59' },
  { stage: 'Adherencia (Mes 3)', value: 850, fill: '#00AAE1' },
  { stage: 'Mantenimiento (Mes 6)', value: 680, fill: '#3B82F6' },
  { stage: 'Graduación', value: 450, fill: '#10B981' },
];

export function ClinicoMeso() {
  return (
    <div className="space-y-6 animate-slide-up-fade">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-800">Resultados en Salud</h2>
          <p className="text-sm text-slate-500 mt-1">Nivel Meso Clínico (GIRIS)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChartContainer 
            title="Evolución de Cohortes Activas"
            subtitle="Volumen de pacientes por programa (Últimos 6 meses)"
            height={350}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCrm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00AAE1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00AAE1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMental" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEpoc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#64748B' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Area type="monotone" name="CRM" dataKey="crm" stroke="#00AAE1" fillOpacity={1} fill="url(#colorCrm)" />
                <Area type="monotone" name="Salud Mental" dataKey="mental" stroke="#3B82F6" fillOpacity={1} fill="url(#colorMental)" />
                <Area type="monotone" name="EPOC" dataKey="epoc" stroke="#10B981" fillOpacity={1} fill="url(#colorEpoc)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer 
            title="Funnel de Retención (Programa CRM)"
            insight="La mayor caída se presenta entre el ingreso y el mes 3. Mejorar el onboarding clínico puede aumentar la retención en un 15%."
            height={280}
          >
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <RechartsTooltip />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive
                >
                  <LabelList position="right" fill="#64748B" stroke="none" dataKey="stage" fontSize={12} />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Timeline: Arquetipo CRM Promedio</h3>
            <div className="relative border-l-2 border-slate-200 ml-3 space-y-6 pb-2">
              <div className="relative">
                <div className="absolute -left-[21px] bg-white p-1 rounded-full border-2 border-teker-cyan">
                  <Stethoscope className="h-4 w-4 text-teker-cyan" />
                </div>
                <div className="pl-6">
                  <h4 className="text-sm font-semibold text-slate-800">Semana 1: Captación</h4>
                  <p className="text-xs text-slate-500 mt-1">Evaluación inicial y definición de metas (HbA1c base).</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] bg-white p-1 rounded-full border-2 border-teker-info">
                  <Activity className="h-4 w-4 text-teker-info" />
                </div>
                <div className="pl-6">
                  <h4 className="text-sm font-semibold text-slate-800">Mes 3: Adherencia</h4>
                  <p className="text-xs text-slate-500 mt-1">Intervención multidisciplinar. Monitoreo de presión arterial activo.</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] bg-white p-1 rounded-full border-2 border-teker-success">
                  <FileText className="h-4 w-4 text-teker-success" />
                </div>
                <div className="pl-6">
                  <h4 className="text-sm font-semibold text-slate-800">Mes 12: Graduación</h4>
                  <p className="text-xs text-slate-500 mt-1">Metas clínicas alcanzadas. Alta controlada al primer nivel.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Insights por Cohorte</h3>
            <InsightCard 
              title="Salud Mental: Tendencia"
              insight="El uso de telepsicología aumentó un 40% este trimestre, mejorando la adherencia en pacientes jóvenes."
              recommendation="Aumentar disponibilidad de agenda virtual los fines de semana."
            />
            <InsightCard 
              title="EPOC: Riesgo Clínico"
              insight="25% de los pacientes en la Zona Sur han reportado exacerbaciones frecuentes debido a cambios climáticos."
              recommendation="Activar protocolo de alertas respiratorias preventivas en la región."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
