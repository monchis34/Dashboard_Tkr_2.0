import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { DataTable } from '@/components/ui/DataTable';

const mockData = [
  { id: 'C-1042', hora: '08:00 AM', especialidad: 'Psicología', profesional: 'Ana María G.', estado: 'Atendido' },
  { id: 'C-1043', hora: '09:30 AM', especialidad: 'Psiquiatría', profesional: 'Carlos R.', estado: 'En sala' },
  { id: 'C-1044', hora: '10:00 AM', especialidad: 'Nutrición', profesional: 'Diana M.', estado: 'Por confirmar' },
  { id: 'C-1045', hora: '11:15 AM', especialidad: 'Psicología', profesional: 'Ana María G.', estado: 'Cancelado (Pago)' },
  { id: 'C-1046', hora: '02:00 PM', especialidad: 'Med. General', profesional: 'Luis F.', estado: 'Confirmado' },
];

const cancelacionesData = [
  { id: 'C-1045', hora: '11:15 AM', paciente: 'Juan P.', causa: 'Rechazo pasarela', tipo: 'Pago' },
  { id: 'C-1039', hora: '07:30 AM', paciente: 'María C.', causa: 'No asiste a confirmación', tipo: 'Confirmación' },
];

export function OperacionMicro() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Todos');

  const filteredData = filter === 'Todos' ? mockData : mockData.filter(d => d.estado.includes(filter));

  const columns = [
    { key: 'id', header: 'ID Cita', sortable: true },
    { key: 'hora', header: 'Hora', sortable: true },
    { key: 'especialidad', header: 'Especialidad', sortable: true },
    { key: 'profesional', header: 'Profesional', sortable: true },
    { 
      key: 'estado', 
      header: 'Estado', 
      sortable: true,
      cell: (item: any) => {
        let colorClass = 'bg-slate-100 text-slate-700';
        if (item.estado === 'Atendido') colorClass = 'bg-teker-success/10 text-teker-success';
        if (item.estado === 'En sala') colorClass = 'bg-teker-cyan/10 text-teker-cyan';
        if (item.estado === 'Confirmado') colorClass = 'bg-teker-info/10 text-teker-info';
        if (item.estado.includes('Cancelado') || item.estado === 'Por confirmar') colorClass = 'bg-teker-warning/10 text-yellow-700';

        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>
            {item.estado}
          </span>
        );
      }
    },
    { 
      key: 'acciones', 
      header: 'Acción',
      cell: (item: any) => (
        <button className="text-teker-primary hover:text-teker-cyan font-medium text-xs flex items-center gap-1 transition-colors">
          <ExternalLink className="h-3 w-3" />
          Ver MedStats
        </button>
      )
    }
  ];

  const cancelColumns = [
    { key: 'id', header: 'ID Cita' },
    { key: 'hora', header: 'Hora' },
    { key: 'paciente', header: 'Paciente' },
    { 
      key: 'tipo', 
      header: 'Tipo',
      cell: (item: any) => (
        <span className="bg-teker-error/10 text-teker-error px-2.5 py-1 rounded-full text-xs font-medium">
          {item.tipo}
        </span>
      )
    },
    { key: 'causa', header: 'Causa Específica' },
    { 
      key: 'acciones', 
      header: 'Acción',
      cell: () => (
        <button className="px-3 py-1 bg-teker-primary text-white text-xs font-medium rounded hover:bg-teker-primary/90 transition-colors">
          Reagendar
        </button>
      )
    }
  ];

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
          <h2 className="text-2xl font-semibold tracking-tight text-slate-800">Detalle Operativo del Día</h2>
          <p className="text-sm text-slate-500 mt-1">Nivel Micro - Coordinadora (María)</p>
        </div>
        
        <div className="ml-auto flex gap-3">
          <a 
            href="#" 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-teker-primary bg-teker-cyan/10 rounded-lg hover:bg-teker-cyan/20 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Abrir vista en MedStats
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Citas Programadas (12)</h3>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm border-slate-200 rounded-lg text-slate-600 focus:ring-teker-cyan focus:border-teker-cyan"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Atendido">Atendidos</option>
              <option value="Por confirmar">Por confirmar</option>
              <option value="Cancelado">Cancelados</option>
            </select>
          </div>
          <DataTable 
            data={filteredData} 
            columns={columns} 
            onExport={() => console.log('Exporting...')}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teker-error inline-block" />
            Atención Requerida
          </h3>
          <DataTable 
            data={cancelacionesData} 
            columns={cancelColumns} 
          />
          <div className="card p-4 bg-slate-50 border-dashed">
            <p className="text-sm text-slate-600">
              <span className="font-semibold block mb-1">Tip de Reagendamiento:</span>
              El paciente Juan P. (C-1045) tuvo un problema de pago. Se sugiere enviar link de pago alternativo vía WhatsApp antes de liberar su espacio en la agenda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
