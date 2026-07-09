import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KPICard } from '@/components/ui/KPICard';
import { AlertBanner } from '@/components/ui/AlertBanner';
import { ChartContainer } from '@/components/ui/ChartContainer';
import { DataTable } from '@/components/ui/DataTable';
import { Calendar, Target, Activity, ArrowRight, Clock, Users, HeartPulse, UserCheck, AlertTriangle, Filter } from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, 
  LineChart, Line, PieChart, Pie, Cell, ComposedChart, Area
} from 'recharts';

const especialidadesData = [
  { name: 'Medicina General', value: 1086 },
  { name: 'Psicología', value: 816 },
  { name: 'Medicina Interna', value: 751 },
  { name: 'Endocrinología', value: 503 },
  { name: 'Nutrición', value: 456 },
];

const servicioData = [
  { name: 'Programada', value: 4994, color: '#00AAE1' },
  { name: 'Domiciliaria', value: 444, color: '#023D59' },
  { name: 'Prioritaria', value: 331, color: '#F59E0B' },
  { name: 'Seguimiento', value: 215, color: '#10B981' },
];

const cie10Data = [
  { name: 'Endocrinas y metabólicas', value: 16.0 },
  { name: 'Trastornos mentales', value: 13.3 },
  { name: 'Sistema circulatorio', value: 10.7 },
  { name: 'Osteomusculares', value: 10.7 },
  { name: 'Factores de estado', value: 10.4 },
];

const remisionesData = [
  { name: 'Cita de Seguimiento', value: 25.3 },
  { name: 'Referencia a Especialista', value: 5.2 },
  { name: 'Otra', value: 4.0 },
  { name: 'Nutricionista', value: 2.2 },
];

const coordinadorasHoraData = [
  { time: '08:00', wendy: 12, laura: 15, camila: 8 },
  { time: '10:00', wendy: 18, laura: 22, camila: 15 },
  { time: '12:00', wendy: 10, laura: 12, camila: 9 },
  { time: '14:00', wendy: 20, laura: 18, camila: 25 },
  { time: '16:00', wendy: 15, laura: 20, camila: 12 },
];

const topCitiesData = [
  { name: 'Cali', value: 2480 },
  { name: 'Bogotá', value: 1000 },
  { name: 'Medellín', value: 800 },
  { name: 'Barranquilla', value: 400 },
  { name: 'Bucaramanga', value: 300 },
];

const tableRows = [
  { id: '3420', estado: 'Atendida', fecha: '2026-07-07 20:00', clase: 'Atención Programada', especialidad: 'Ortopedia', ciudad: 'Chiquinquirá', rango: '3 - 5 dias' },
  { id: '2441', estado: 'Atendida', fecha: '2026-07-07 19:30', clase: 'Atención Programada', especialidad: 'Infectología', ciudad: 'Cali', rango: '> 7 dias' },
  { id: '2FD0', estado: 'Cancelada', fecha: '2026-07-07 17:40', clase: 'Atención de Seguimiento', especialidad: 'Medicina General', ciudad: 'Cali', rango: '> 7 dias' },
  { id: '3442', estado: 'Atendida', fecha: '2026-07-07 17:30', clase: 'Atención Programada', especialidad: 'Psiquiatría', ciudad: 'Chía', rango: '3 - 5 dias' },
  { id: '32CB', estado: 'Atendida', fecha: '2026-07-07 17:30', clase: 'Atención Programada', especialidad: 'Hematología', ciudad: 'Palmira', rango: '> 7 dias' },
];

const tableCols = [
  { key: 'id', header: 'ID Cita', sortable: true },
  { 
    key: 'estado', 
    header: 'Estado',
    cell: (item: any) => (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
        item.estado === 'Atendida' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {item.estado}
      </span>
    )
  },
  { key: 'fecha', header: 'Fecha', sortable: true },
  { key: 'clase', header: 'Tipo Servicio', sortable: true },
  { key: 'especialidad', header: 'Especialidad', sortable: true },
  { key: 'ciudad', header: 'Ciudad', sortable: true },
  { key: 'rango', header: 'Rango Tiempo', sortable: true },
];

export function OperacionMacro() {
  const navigate = useNavigate();
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('');

  const filteredData = tableRows.filter(row => {
    if (filtroEspecialidad && row.especialidad !== filtroEspecialidad) return false;
    return true;
  });

  return (
    <div className="space-y-10 animate-slide-up-fade pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-800">Tablero DOPS</h2>
          <p className="text-sm text-slate-500 mt-1">Consultas, Usuarios, Especialidades y Desempeño</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AlertBanner 
          level="success"
          title="Alerta de Efectividad"
          message="El porcentaje de efectividad operativa es mayor o igual al 75% (Actual: 78%). ¡Buen trabajo del equipo!"
        />
        <AlertBanner 
          level="critical"
          title="Alerta de Productividad vs Meta"
          message="Productividad actual en 68% (Meta: 80%). Coordinadoras afectando el indicador: Wendy (-15%), Camila (-12%)."
        />
      </div>

      {/* MACRO SECTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <span className="bg-teker-cyan/10 text-teker-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Nivel 1</span>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Macro: Indicadores Globales</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard 
            title="Total de Consultas" 
            value="6,225" 
            trend={5.2}
            variant="info"
            icon={<Activity className="h-5 w-5" />}
          />
          <KPICard 
            title="Usuarios Únicos" 
            value="4,079" 
            trend={3.8}
            variant="info"
            icon={<Users className="h-5 w-5" />}
          />
          <KPICard 
            title="NPS Paciente" 
            value="87.4%" 
            trend={1.2}
            variant="success"
            icon={<HeartPulse className="h-5 w-5" />}
          />
          <KPICard 
            title="NPS Profesional" 
            value="95.9%" 
            trend={2.1}
            variant="success"
            icon={<UserCheck className="h-5 w-5" />}
          />
        </div>
      </section>

      {/* MESO SECTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <span className="bg-teker-cyan/10 text-teker-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Nivel 2</span>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Meso: Desempeño y Distribución</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* KPI 1: Citas Programadas por Coordinadora */}
          <ChartContainer 
            title="1. Citas Programadas por Coordinadora (Por Hora)"
            height={320}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={coordinadorasHoraData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#64748B' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} tickLine={false} axisLine={false} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" />
                <Line type="monotone" dataKey="wendy" name="Wendy" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="laura" name="Laura" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="camila" name="Camila" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* KPI 2 & 3: Efectividad & Productividad */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="card p-6 flex flex-col items-center justify-center text-center">
               <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                 <Target className="h-8 w-8 text-green-600" />
               </div>
               <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">2. Efectividad Operativa</h3>
               <div className="text-5xl font-black text-slate-800 mb-2">78%</div>
               <p className="text-xs text-slate-500">(Atendidas / Programadas)</p>
               <span className="mt-4 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">≥ 75% (Alarma Verde)</span>
            </div>

            <div className="card p-6 flex flex-col items-center justify-center text-center border-red-200 bg-red-50/30">
               <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                 <AlertTriangle className="h-8 w-8 text-red-600" />
               </div>
               <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">3. Productividad vs Meta</h3>
               <div className="text-5xl font-black text-slate-800 mb-2">68%</div>
               <p className="text-xs text-slate-500">(Actividad Real / Meta Dinámica)</p>
               <span className="mt-4 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Incumplimiento (Alarma Roja)</span>
               <p className="text-[10px] text-red-600 mt-2 font-medium">Afectado por: Wendy, Camila</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <ChartContainer title="Distribución por Especialidad" height={280}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={especialidadesData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#64748B' }} tickLine={false} axisLine={false} />
                <RechartsTooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#00AAE1" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Top 5 Diagnósticos CIE-10 (%)" height={280}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cie10Data} layout="vertical" margin={{ top: 10, right: 30, left: 60, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#64748B' }} tickLine={false} axisLine={false} width={100} />
                <RechartsTooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#023D59" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Tipo de Servicio" height={280}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={servicioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {servicioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ChartContainer title="Remisiones (%)" height={250}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={remisionesData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} interval={0} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} tickLine={false} axisLine={false} />
                <RechartsTooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          <ChartContainer title="Distribución Geográfica (Top Municipios)" height={250}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCitiesData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} tickLine={false} axisLine={false} />
                <RechartsTooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </section>

      {/* MICRO SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <span className="bg-teker-cyan/10 text-teker-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Nivel 3</span>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Micro: Detalle de Consultas</h3>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <select 
                value={filtroEspecialidad} 
                onChange={(e) => setFiltroEspecialidad(e.target.value)}
                className="bg-transparent border-none text-slate-600 focus:ring-0 py-1 text-xs"
              >
                <option value="">Especialidad (Todas)</option>
                <option value="Ortopedia">Ortopedia</option>
                <option value="Infectología">Infectología</option>
                <option value="Medicina General">Medicina General</option>
                <option value="Psiquiatría">Psiquiatría</option>
                <option value="Hematología">Hematología</option>
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
