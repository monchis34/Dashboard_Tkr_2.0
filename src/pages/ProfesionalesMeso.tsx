import React from 'react';
import { ChartContainer } from '@/components/ui/ChartContainer';
import { DataTable } from '@/components/ui/DataTable';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ZAxis, ReferenceLine } from 'recharts';
import { Star, ShieldAlert, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const scatterData = [
  { nombre: 'Dr. Silva', carga: 110, nps: 60, respuestas: 45, color: '#EF4444' }, // Sobrecarga, bajo NPS
  { nombre: 'Dra. Méndez', carga: 85, nps: 92, respuestas: 120, color: '#10B981' }, // Óptimo
  { nombre: 'Dr. Ruiz', carga: 40, nps: 88, respuestas: 8, color: '#F59E0B' }, // Baja carga, pocas resps
  { nombre: 'Dra. López', carga: 95, nps: 85, respuestas: 60, color: '#3B82F6' }, // Normal
  { nombre: 'Dr. Gómez', carga: 105, nps: 75, respuestas: 50, color: '#F59E0B' }, // Riesgo
  { nombre: 'Dra. Ortiz', carga: 70, nps: 95, respuestas: 80, color: '#10B981' }, // Óptimo
];

const profData = [
  { id: 'P-101', nombre: 'Dr. Roberto Silva', especialidad: 'Med. General', alerta: 'Sobrecarga Severa', nps: 60, npsCount: 45 },
  { id: 'P-105', nombre: 'Dr. Carlos Ruiz', especialidad: 'Psicología', alerta: 'Baja Productividad', nps: 88, npsCount: 8 },
  { id: 'P-112', nombre: 'Dr. Juan Gómez', especialidad: 'Nutrición', alerta: 'Riesgo Burnout', nps: 75, npsCount: 50 },
];

export function ProfesionalesMeso() {
  const columns = [
    { key: 'nombre', header: 'Profesional', sortable: true },
    { key: 'especialidad', header: 'Especialidad' },
    { 
      key: 'alerta', 
      header: 'Estado / Alerta',
      cell: (item: any) => {
        let colorClass = 'bg-teker-warning/10 text-yellow-700';
        if (item.alerta.includes('Sobrecarga')) colorClass = 'bg-teker-error/10 text-teker-error';
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-max ${colorClass}`}>
            <ShieldAlert className="h-3 w-3" />
            {item.alerta}
          </span>
        );
      }
    },
    { 
      key: 'nps', 
      header: 'NPS',
      cell: (item: any) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-slate-700 font-medium">
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-current" />
            {item.nps}
          </div>
          {item.npsCount < 10 && (
            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded w-max">
              Volumen insuficiente
            </span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-slide-up-fade">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-800">Red de Profesionales</h2>
          <p className="text-sm text-slate-500 mt-1">Nivel Meso (Vista Talento Humano / Ana María)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChartContainer 
            title="Cuadrante: Carga Asistencial vs Satisfacción (NPS)"
            insight="Dr. Silva presenta indicadores de sobrecarga y deterioro en NPS. Intervención prioritaria requerida."
            height={400}
          >
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  type="number" 
                  dataKey="carga" 
                  name="Carga (%)" 
                  unit="%" 
                  domain={[0, 120]} 
                  label={{ value: 'Carga Asistencial (%)', position: 'bottom', offset: 0, fontSize: 12, fill: '#64748B' }} 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="nps" 
                  name="NPS" 
                  domain={[0, 100]} 
                  label={{ value: 'NPS (0-100)', angle: -90, position: 'left', fontSize: 12, fill: '#64748B' }} 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                />
                <ZAxis type="number" dataKey="respuestas" range={[60, 400]} name="Encuestas" />
                <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px' }} />
                
                {/* Cuadrantes guía */}
                <ReferenceLine x={85} stroke="#cbd5e1" strokeDasharray="3 3" />
                <ReferenceLine y={80} stroke="#cbd5e1" strokeDasharray="3 3" />
                
                <Scatter name="Profesionales" data={scatterData} fill="#8884d8">
                  {scatterData.map((entry, index) => (
                    <cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Alertas de Red</h3>
            <DataTable 
              data={profData} 
              columns={columns} 
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-semibold text-slate-800">Perfiles Destacados (IA)</h3>
          
          <div className="card p-5 border-l-4 border-l-teker-error">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                  RS
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Dr. Roberto Silva</h4>
                  <p className="text-xs text-slate-500">Medicina General</p>
                </div>
              </div>
              <span className="bg-teker-error/10 text-teker-error text-[10px] font-bold px-2 py-0.5 rounded uppercase">En Riesgo</span>
            </div>
            
            <div className="space-y-3 mt-4">
              <div className="bg-slate-50 p-3 rounded-lg text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-3.5 w-3.5 text-teker-cyan" />
                  <span className="font-semibold text-slate-700">Perfil Analítico IA</span>
                </div>
                <p className="text-slate-600 mt-1">El profesional ha mantenido una ocupación superior al 105% durante 3 semanas consecutivas, correlacionado con una caída de 15 pts en NPS.</p>
              </div>
              <p className="text-xs font-medium text-teker-primary bg-teker-cyan/10 p-2 rounded">
                Recomendación: Bloquear agenda nueva pacientes por 7 días y asignar seguimiento de bienestar.
              </p>
            </div>
          </div>

          <div className="card p-5 border-l-4 border-l-teker-success">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                  LM
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Dra. Lorena Méndez</h4>
                  <p className="text-xs text-slate-500">Psicología</p>
                </div>
              </div>
              <span className="bg-teker-success/10 text-teker-success text-[10px] font-bold px-2 py-0.5 rounded uppercase">Óptimo</span>
            </div>
            
            <div className="space-y-3 mt-4">
              <div className="bg-slate-50 p-3 rounded-lg text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-3.5 w-3.5 text-teker-cyan" />
                  <span className="font-semibold text-slate-700">Fortalezas detectadas</span>
                </div>
                <p className="text-slate-600 mt-1">Alta retención en cohorte CRM. Sus pacientes muestran un 30% menos de cancelaciones subsecuentes.</p>
              </div>
              <p className="text-xs font-medium text-slate-600 border border-slate-200 p-2 rounded">
                Sugerencia: Postular como mentora para nuevos ingresos.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
