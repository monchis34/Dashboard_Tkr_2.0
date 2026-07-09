import React, { useState } from 'react';
import { ChartContainer } from '@/components/ui/ChartContainer';
import { DataTable } from '@/components/ui/DataTable';
import { KPICard } from '@/components/ui/KPICard';
import {
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ZAxis, ReferenceLine
} from 'recharts';
import { MessagesSquare, Clock, HeartHandshake, Filter } from 'lucide-react';

const pqrsTipoData = [
  { name: 'Queja', value: 45, color: '#EF4444' }, // Red
  { name: 'Reclamo', value: 30, color: '#F59E0B' }, // Warning
  { name: 'Sugerencia', value: 15, color: '#00AAE1' }, // Cyan
  { name: 'Felicitación', value: 10, color: '#10B981' }, // Green
];

const pqrsCiudadData = [
  { name: 'Bogotá', value: 12 },
  { name: 'Cali', value: 9 },
  { name: 'Medellín', value: 4 },
  { name: 'Barranquilla', value: 2 },
];

const scatterData = [
  { tiempo: 2.0, satisfaccion: 92, name: 'T1' },
  { tiempo: 4.0, satisfaccion: 80, name: 'T2' },
  { tiempo: 6.5, satisfaccion: 60, name: 'T3' },
  { tiempo: 8.5, satisfaccion: 40, name: 'T4' },
];

const tableRows = [
  { ticket: "PQ-1042", tipo: "Queja", ciudad: "Bogotá", dias: 3, estado: "Abierto" },
  { ticket: "PQ-1043", tipo: "Reclamo", ciudad: "Cali", dias: 1, estado: "Cerrado" },
  { ticket: "PQ-1044", tipo: "Sugerencia", ciudad: "Medellín", dias: 5, estado: "Abierto" },
  { ticket: "PQ-1045", tipo: "Felicitación", ciudad: "Bogotá", dias: 0, estado: "Cerrado" },
];

const tableCols = [
  { key: 'ticket', header: 'Ticket', sortable: true },
  { 
    key: 'tipo', 
    header: 'Tipo',
    cell: (item: any) => {
      let color = 'bg-slate-100 text-slate-700';
      if (item.tipo === 'Queja') color = 'bg-red-50 text-red-700';
      if (item.tipo === 'Reclamo') color = 'bg-amber-50 text-amber-700';
      if (item.tipo === 'Sugerencia') color = 'bg-blue-50 text-blue-700';
      if (item.tipo === 'Felicitación') color = 'bg-green-50 text-green-700';
      return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${color}`}>{item.tipo}</span>
    }
  },
  { key: 'ciudad', header: 'Ciudad', sortable: true },
  { 
    key: 'dias', 
    header: 'Días Abierto',
    cell: (item: any) => (
      <span className={`font-semibold ${item.dias > 3 ? 'text-red-600' : 'text-slate-700'}`}>
        {item.dias}
      </span>
    )
  },
  { 
    key: 'estado', 
    header: 'Estado',
    cell: (item: any) => (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${item.estado === 'Abierto' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
        {item.estado}
      </span>
    )
  },
];

export function SiauDashboard() {
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  const filteredData = tableRows.filter(row => {
    if (filtroTipo && row.tipo !== filtroTipo) return false;
    if (filtroEstado && row.estado !== filtroEstado) return false;
    return true;
  });

  return (
    <div className="space-y-10 animate-slide-up-fade pb-10">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-800">Atención al Usuario (SIAU)</h2>
        <p className="text-sm text-slate-500 mt-1">Gestión de PQRS, tiempos de respuesta y satisfacción del paciente</p>
      </div>

      {/* MACRO SECTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <span className="bg-teker-cyan/10 text-teker-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Nivel 1</span>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Macro: Indicadores Clave</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KPICard 
            title="PQRS Abiertas" 
            value="27" 
            subtitle="Volumen actual en gestión"
            variant="warning"
            icon={<MessagesSquare className="h-5 w-5" />}
          />
          <KPICard 
            title="Tiempo Resp. Promedio" 
            value="1.8" 
            subtitle="Días hábiles (Meta: 2)"
            trend={-21.7}
            variant="success"
            icon={<Clock className="h-5 w-5" />}
          />
          <KPICard 
            title="Satisfacción Global" 
            value="88%" 
            subtitle="Encuestas post-resolución (Meta: 90%)"
            trend={2.3}
            variant="info"
            icon={<HeartHandshake className="h-5 w-5" />}
          />
        </div>
      </section>

      {/* MESO SECTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <span className="bg-teker-cyan/10 text-teker-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Nivel 2</span>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Meso: Análisis y Tendencias</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartContainer 
            title="Distribución por Tipo"
            height={280}
            className="col-span-1"
          >
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                  <Pie
                    data={pqrsTipoData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {pqrsTipoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
               </PieChart>
             </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer 
            title="Concentración por Ciudad"
            height={280}
            className="col-span-1"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pqrsCiudadData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#64748B' }} tickLine={false} axisLine={false} width={80} />
                <RechartsTooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#00AAE1" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer 
            title="Tiempo vs Satisfacción"
            height={280}
            className="col-span-1"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  type="number" 
                  dataKey="tiempo" 
                  name="Días de Respuesta" 
                  unit="d" 
                  label={{ value: 'Días de Respuesta', position: 'bottom', offset: 0, fontSize: 10, fill: '#64748B' }} 
                  tick={{ fontSize: 10, fill: '#64748B' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="satisfaccion" 
                  name="Satisfacción" 
                  unit="%" 
                  domain={[0, 100]} 
                  label={{ value: 'Satisfacción (%)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748B' }} 
                  tick={{ fontSize: 10, fill: '#64748B' }}
                />
                <ZAxis type="number" range={[100, 100]} />
                <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <ReferenceLine x={2} stroke="#10B981" strokeDasharray="3 3" label={{ position: 'top', value: 'Meta (2d)', fill: '#10B981', fontSize: 10 }} />
                <Scatter name="Casos" data={scatterData} fill="#023D59" />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </section>

      {/* MICRO SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <span className="bg-teker-cyan/10 text-teker-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Nivel 3</span>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Micro: Detalle de Gestión</h3>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <select 
                value={filtroTipo} 
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="bg-transparent border-none text-slate-600 focus:ring-0 py-1 text-xs"
              >
                <option value="">Tipo (Todos)</option>
                <option value="Queja">Queja</option>
                <option value="Reclamo">Reclamo</option>
                <option value="Sugerencia">Sugerencia</option>
                <option value="Felicitación">Felicitación</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <select 
                value={filtroEstado} 
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="bg-transparent border-none text-slate-600 focus:ring-0 py-1 text-xs"
              >
                <option value="">Estado (Todos)</option>
                <option value="Abierto">Abierto</option>
                <option value="Cerrado">Cerrado</option>
              </select>
            </div>
          </div>
        </div>

        <DataTable 
          data={filteredData} 
          columns={tableCols} 
          onExport={() => console.log("Exporting CSV...")}
          className="shadow-sm"
        />
      </section>

    </div>
  );
}

