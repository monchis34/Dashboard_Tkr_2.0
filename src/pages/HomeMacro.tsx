import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Heart, Headphones, Users, PieChart, 
  Bot, Smartphone, BarChart3, ArrowRight, AlertTriangle 
} from 'lucide-react';

// Custom SVG Sparkline for instant high-fidelity visualization
function Sparkline({ data, stroke = "#00AAE1" }: { data: number[], stroke?: string }) {
  const width = 160;
  const height = 30;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((val, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible mt-2">
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

// Construction Barrier Component for In-Design Modules
const DesignBarrier = () => (
  <div className="flex flex-col items-center justify-center py-4 px-2">
    <div className="relative w-20 h-10 flex flex-col justify-center items-center">
      {/* Striped Board */}
      <div className="w-16 h-4 bg-amber-500 rounded border border-amber-600 overflow-hidden relative flex">
        <div className="w-4 h-full bg-slate-900 -skew-x-12 transform -translate-x-1" />
        <div className="w-4 h-full bg-slate-900 -skew-x-12 transform translate-x-2" />
        <div className="w-4 h-full bg-slate-900 -skew-x-12 transform translate-x-5" />
      </div>
      {/* Legs */}
      <div className="absolute top-6 left-4 w-1.5 h-4 bg-slate-400 rounded-sm" />
      <div className="absolute top-6 right-4 w-1.5 h-4 bg-slate-400 rounded-sm" />
      <div className="absolute top-9 left-2 w-5 h-1 bg-slate-500 rounded-full" />
      <div className="absolute top-9 right-2 w-5 h-1 bg-slate-500 rounded-full" />
    </div>
    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Módulo en diseño</span>
  </div>
);

export function HomeMacro() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-slide-up-fade pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-800">Módulos del Ecosistema</h2>
          <p className="text-sm text-slate-500 mt-1">
            Selecciona un módulo para acceder a sus tableros analíticos y de decisión de TeKer 2.0
          </p>
        </div>
      </div>

      {/* Grid of Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* DOPS */}
        <div className="card p-6 flex flex-col justify-between h-[360px]">
          <div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0055D4] shrink-0 shadow-sm">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800 leading-tight">DOPS</h3>
                <p className="text-xs font-bold text-slate-400 mt-0.5">Operativo Telemedicina</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Gestión operativa de la atención en telemedicina en tiempo real.
            </p>

            {/* KPIs */}
            <div className="mt-5 border-t border-slate-50 pt-4">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Indicadores clave</span>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Atenciones hoy</span>
                  <span className="text-lg font-black text-slate-800">1,243</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">En espera</span>
                  <span className="text-lg font-black text-slate-800">87</span>
                </div>
              </div>
              <Sparkline data={[12, 14, 11, 16, 18, 15, 22]} stroke="#0055D4" />
            </div>
          </div>

          <button 
            onClick={() => navigate('/operacion')}
            className="w-full mt-auto py-2.5 bg-[#0055D4] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-[#0041a8] transition-colors"
          >
            <span>Ir a DOPS</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* GIRIS */}
        <div className="card p-6 flex flex-col justify-between h-[360px]">
          <div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-[#008A8F] shrink-0 shadow-sm">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800 leading-tight">GIRIS</h3>
                <p className="text-xs font-bold text-[#008A8F] mt-0.5">Gestión Pacientes Crónicos</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Gestión integral de pacientes crónicos y programas poblacionales.
            </p>

            {/* KPIs */}
            <div className="mt-5 border-t border-slate-50 pt-4">
              <span className="text-[10px] font-black uppercase text-[#008A8F] tracking-wider">Indicadores clave</span>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Pacientes activos</span>
                  <span className="text-lg font-black text-slate-800">8,732</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Riesgo alto</span>
                  <span className="text-lg font-black text-slate-800">1,128</span>
                </div>
              </div>
              <Sparkline data={[30, 28, 32, 31, 35, 33, 40]} stroke="#008A8F" />
            </div>
          </div>

          <button 
            onClick={() => navigate('/clinico')}
            className="w-full mt-auto py-2.5 bg-[#008A8F] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-[#006e72] transition-colors"
          >
            <span>Ir a GIRIS</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* SIAU */}
        <div className="card p-6 flex flex-col justify-between h-[360px]">
          <div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#7B59DC] shrink-0 shadow-sm">
                <Headphones className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800 leading-tight">SIAU</h3>
                <p className="text-xs font-bold text-[#7B59DC] mt-0.5">Atención al Usuario</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Atención, PQRS, solicitudes y experiencia del usuario.
            </p>

            {/* KPIs */}
            <div className="mt-5 border-t border-slate-50 pt-4">
              <span className="text-[10px] font-black uppercase text-[#7B59DC] tracking-wider">Indicadores clave</span>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Solicitudes hoy</span>
                  <span className="text-lg font-black text-slate-800">126</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">En trámite</span>
                  <span className="text-lg font-black text-slate-800">38</span>
                </div>
              </div>
              <Sparkline data={[8, 11, 9, 14, 12, 15, 19]} stroke="#7B59DC" />
            </div>
          </div>

          <button 
            onClick={() => navigate('/siau')}
            className="w-full mt-auto py-2.5 bg-[#7B59DC] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-[#6242c2] transition-colors"
          >
            <span>Ir a SIAU</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* PROF */}
        <div className="card p-6 flex flex-col justify-between h-[360px] border-amber-100 bg-amber-50/10">
          <div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-800 leading-tight">PROF</h3>
                  <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-amber-100 text-amber-800 rounded">En diseño</span>
                </div>
                <p className="text-xs font-bold text-slate-400 mt-0.5">Profesionales</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Gestión de profesionales, agenda, desempeño y calidad.
            </p>

            <div className="mt-6 border-t border-amber-100 pt-4 flex flex-col items-center">
              <DesignBarrier />
            </div>
          </div>

          <button 
            disabled
            className="w-full mt-auto py-2.5 border border-amber-200 text-amber-700 bg-amber-50/50 font-bold text-xs rounded-xl cursor-not-allowed text-center"
          >
            Próximamente
          </button>
        </div>

        {/* DAFI */}
        <div className="card p-6 flex flex-col justify-between h-[360px] border-red-100 bg-red-50/10">
          <div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 shrink-0 shadow-sm font-bold text-xl">
                $
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-800 leading-tight">DAFI</h3>
                  <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-red-100 text-red-800 rounded">En diseño</span>
                </div>
                <p className="text-xs font-bold text-slate-400 mt-0.5">Económico / Financiero</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Gestión financiera, costos, facturación y sostenibilidad.
            </p>

            <div className="mt-6 border-t border-red-100 pt-4 flex flex-col items-center">
              <DesignBarrier />
            </div>
          </div>

          <button 
            disabled
            className="w-full mt-auto py-2.5 border border-red-200 text-red-700 bg-red-50/50 font-bold text-xs rounded-xl cursor-not-allowed text-center"
          >
            Próximamente
          </button>
        </div>

        {/* DIAR */}
        <div className="card p-6 flex flex-col justify-between h-[360px] border-blue-50 bg-slate-50/50">
          <div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-slate-600 shrink-0 shadow-sm">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-800 leading-tight">DIAR</h3>
                  <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-slate-100 text-slate-800 rounded">En diseño</span>
                </div>
                <p className="text-xs font-bold text-slate-400 mt-0.5">Tech / Ops / IA</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Inteligencia artificial, analítica y operaciones tecnológicas.
            </p>

            <div className="mt-6 border-t border-slate-100 pt-4 flex flex-col items-center">
              <DesignBarrier />
            </div>
          </div>

          <button 
            disabled
            className="w-full mt-auto py-2.5 border border-slate-200 text-slate-600 bg-slate-50/50 font-bold text-xs rounded-xl cursor-not-allowed text-center"
          >
            Próximamente
          </button>
        </div>

        {/* AppGIRIS */}
        <div className="card p-6 flex flex-col justify-between h-[360px]">
          <div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-[#34A853] shrink-0 shadow-sm">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800 leading-tight">AppGIRIS</h3>
                <p className="text-xs font-bold text-[#34A853] mt-0.5">App Transaccional</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Aplicación móvil para pacientes y profesionales de TeKer.
            </p>

            {/* KPIs */}
            <div className="mt-5 border-t border-slate-50 pt-4">
              <span className="text-[10px] font-black uppercase text-[#34A853] tracking-wider">Indicadores clave</span>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Usuarios activos</span>
                  <span className="text-lg font-black text-slate-800">3,452</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Sesiones hoy</span>
                  <span className="text-lg font-black text-slate-800">6,781</span>
                </div>
              </div>
              <Sparkline data={[20, 22, 21, 26, 25, 29, 34]} stroke="#34A853" />
            </div>
          </div>

          <button 
            onClick={() => alert("Abriendo AppGIRIS en modo simulación...")}
            className="w-full mt-auto py-2.5 bg-[#34A853] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-[#2c8f47] transition-colors"
          >
            <span>Abrir AppGIRIS</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* MedStats */}
        <div className="card p-6 flex flex-col justify-between h-[360px]">
          <div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0055D4] shrink-0 shadow-sm">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800 leading-tight">MedStats</h3>
                <p className="text-xs font-bold text-[#0055D4] mt-0.5">Herramienta Operativa</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Monitoreo en tiempo real de indicadores operativos y transaccionales.
            </p>

            {/* KPIs */}
            <div className="mt-5 border-t border-slate-50 pt-4">
              <span className="text-[10px] font-black uppercase text-[#0055D4] tracking-wider">Indicadores clave</span>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Indicadores</span>
                  <span className="text-lg font-black text-slate-800">56</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Alertas activas</span>
                  <span className="text-lg font-black text-slate-800 text-red-600">7</span>
                </div>
              </div>
              <Sparkline data={[15, 12, 17, 14, 19, 18, 23]} stroke="#0055D4" />
            </div>
          </div>

          <button 
            onClick={() => navigate('/operacion')}
            className="w-full mt-auto py-2.5 bg-[#0055D4] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-[#0041a8] transition-colors"
          >
            <span>Ir a MedStats</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>

      {/* Full-Width bottom card for NGAGE */}
      <div className="card p-6 border-orange-100 bg-orange-50/5 mt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 shadow-sm">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-800 leading-tight">NGAGE</h3>
                <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-orange-100 text-orange-800 rounded">En diseño</span>
              </div>
              <p className="text-xs font-bold text-slate-400 mt-0.5">CRM / Engagement</p>
              <p className="text-xs text-slate-500 mt-2 max-w-2xl leading-relaxed">
                Gestión de relacionamiento, campañas y engagement de pacientes y usuarios.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <DesignBarrier />
            <button 
              disabled
              className="px-6 py-2.5 border border-orange-200 text-orange-700 bg-orange-50/50 font-bold text-xs rounded-xl cursor-not-allowed whitespace-nowrap"
            >
              Próximamente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
