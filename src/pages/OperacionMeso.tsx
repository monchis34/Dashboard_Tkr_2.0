import React from 'react';
import { ChartContainer } from '@/components/ui/ChartContainer';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ReferenceLine, BarChart, Bar, Legend } from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tendenciaData = Array.from({ length: 30 }).map((_, i) => ({
  dia: i + 1,
  efectividad: 65 + Math.random() * 25,
}));

const perdidasData = [
  { causa: 'No asiste (Paciente)', valor: 45 },
  { causa: 'Ausentismo Médico', valor: 15 },
  { causa: 'Problema de Pago', valor: 25 },
  { causa: 'Falla Técnica', valor: 15 },
];

const heatmapData = [
  { coord: 'María', L: 95, M: 80, X: 100, J: 60, V: 85 },
  { coord: 'Wendy', L: 70, M: 65, X: 80, J: 90, V: 75 },
  { coord: 'Ana', L: 100, M: 95, X: 85, J: 100, V: 90 },
];

export function OperacionMeso() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-slide-up-fade">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/operacion')}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-800">Tendencias Operativas</h2>
          <p className="text-sm text-slate-500 mt-1">Nivel Meso - Líder de Operaciones</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer 
          title="Efectividad vs Meta (Últimos 30 días)"
          insight="La efectividad se ha mantenido por debajo de la meta (80%) durante los últimos 4 días. Pico de ausentismo el día 15."
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tendenciaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="dia" tick={{ fontSize: 12, fill: '#64748B' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} tickLine={false} axisLine={false} />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <ReferenceLine y={80} stroke="#10B981" strokeDasharray="3 3" label={{ position: 'top', value: 'Meta (80%)', fill: '#10B981', fontSize: 12 }} />
              <Line type="monotone" dataKey="efectividad" stroke="#00AAE1" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#023D59' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer 
          title="Distribución de Pérdidas Operacionales"
          insight="El ausentismo del paciente representa la mayor fuga. Implementar recordatorios SMS automáticos puede reducir esto en un 15%."
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={perdidasData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
              <XAxis type="number" hide />
              <YAxis dataKey="causa" type="category" tick={{ fontSize: 12, fill: '#64748B' }} tickLine={false} axisLine={false} width={120} />
              <RechartsTooltip cursor={{ fill: '#F8FAFC' }} />
              <Bar dataKey="valor" fill="#EF4444" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="card p-6 lg:col-span-2">
          <h3 className="font-semibold text-slate-800 mb-6">Productividad por Coordinadora (Semana Actual)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left font-medium text-slate-500 pb-4 w-32">Coordinadora</th>
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie'].map(day => (
                    <th key={day} className="font-medium text-slate-500 pb-4 text-center">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="space-y-2">
                {heatmapData.map((row) => (
                  <tr key={row.coord} className="border-t border-slate-100">
                    <td className="py-3 font-medium text-slate-700">{row.coord}</td>
                    {['L', 'M', 'X', 'J', 'V'].map(day => {
                      const val = row[day as keyof typeof row] as number;
                      // Determine color based on value
                      let bgColor = 'bg-slate-100';
                      let textColor = 'text-slate-600';
                      
                      if (val >= 90) {
                        bgColor = 'bg-teker-success/20';
                        textColor = 'text-teker-success';
                      } else if (val >= 75) {
                        bgColor = 'bg-teker-warning/20';
                        textColor = 'text-yellow-700';
                      } else {
                        bgColor = 'bg-teker-error/20';
                        textColor = 'text-teker-error';
                      }
                      
                      return (
                        <td key={day} className="py-3 px-1">
                          <div className={`w-full h-10 rounded flex items-center justify-center font-semibold ${bgColor} ${textColor}`}>
                            {val}%
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="w-2 h-2 rounded-full bg-teker-error mt-1.5 shrink-0" />
            <p className="text-xs text-slate-600">
              <span className="font-semibold">Insight IA:</span> Wendy presenta un patrón de baja productividad los días martes. Sugiere revisión de asignación de carga o capacitación adicional en herramientas de reagendamiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
