import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  HeartPulse, 
  Users, 
  PieChart, 
  MessageSquare, 
  Settings, 
  ExternalLink,
  Bell,
  ChevronDown,
  Menu,
  Search,
  ClipboardList
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Home (Macro)' },
    { to: '/operacion', icon: Activity, label: 'Operación (DOPS)' },
    { to: '/siau', icon: ClipboardList, label: 'Tablero SIAU' },
    { to: '/clinico', icon: HeartPulse, label: 'Clínico (GIRIS)' },
    { to: '/profesionales', icon: Users, label: 'Profesionales (PROF)' },
    { to: '/ejecutivo', icon: PieChart, label: 'Ejecutivo (DAFI)' },
    { to: '/engagement', icon: MessageSquare, label: 'Engagement' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    // Check if it matches a segment
    const segment = navItems.find(i => i.label.toLowerCase().includes(searchQuery.toLowerCase()));
    if (segment) {
      navigate(segment.to);
    }
    
    setSearchQuery('');
    setShowSearchResults(false);
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row overflow-hidden bg-teker-bg text-teker-text">
      {/* Mobile Header */}
      <header className="md:hidden flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-teker-cyan flex items-center justify-center text-white font-bold">
            T
          </div>
          <span className="font-bold tracking-tight uppercase text-slate-800">TeKer 2.0</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-500 hover:text-teker-primary focus:outline-none focus:ring-2 focus:ring-teker-cyan"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-teker-primary text-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 shrink-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="hidden md:flex h-16 items-center gap-3 p-6 shrink-0 mt-2">
          <div className="w-8 h-8 rounded-lg bg-teker-cyan flex items-center justify-center font-bold text-lg">
            T
          </div>
          <span className="text-xl font-bold tracking-tight uppercase">TeKer 2.0</span>
        </div>

        <div className="flex-1 overflow-y-auto mt-4 px-4 space-y-6">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                  isActive 
                    ? "bg-white/10 text-white font-medium" 
                    : "text-white/70 hover:bg-white/5"
                )}
              >
                {({ isActive }) => (
                  <>
                    <div className={cn("w-2 h-2 rounded-full", isActive ? "bg-teker-cyan" : "border border-white/40")} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Resumen general section */}
          <div className="p-4 rounded-2xl bg-white/95 text-slate-800 flex flex-col gap-3 shadow-md border border-slate-100">
            <h4 className="text-[11px] font-bold text-teker-primary uppercase tracking-wider mb-1">Resumen general</h4>
            
            {/* % Efectividad Operativa */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-teker-cyan shrink-0">
                <Activity className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-500 font-bold leading-none">% Efectividad Operativa</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xs font-black text-teker-primary leading-none">92%</span>
                  <span className="text-[8px] font-bold text-teker-success leading-none">↑ 6%</span>
                </div>
                <span className="text-[7.5px] text-slate-400">vs. mes anterior</span>
              </div>
            </div>

            {/* % Adherencia al Programa */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center text-teker-success shrink-0">
                <HeartPulse className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-500 font-bold leading-none">% Adherencia al Programa</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xs font-black text-teker-primary leading-none">87%</span>
                  <span className="text-[8px] font-bold text-teker-success leading-none">↑ 5%</span>
                </div>
                <span className="text-[7.5px] text-slate-400">vs. mes anterior</span>
              </div>
            </div>

            {/* NPS Profesional */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                <Users className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-500 font-bold leading-none">NPS Profesional</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xs font-black text-teker-primary leading-none">76</span>
                  <span className="text-[8px] font-bold text-teker-success leading-none">↑ 8</span>
                </div>
                <span className="text-[7.5px] text-slate-400">vs. mes anterior</span>
              </div>
            </div>

            {/* Margen de Contribución TeKer */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <PieChart className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-500 font-bold leading-none">Margen de Contribución TeKer</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xs font-black text-teker-primary leading-none">24%</span>
                  <span className="text-[8px] font-bold text-teker-success leading-none">↑ 4%</span>
                </div>
                <span className="text-[7.5px] text-slate-400">vs. mes anterior</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/10 shrink-0 flex flex-col items-center gap-2 bg-black/10">
          <p className="text-[9px] text-white/50 text-center leading-normal">
            © 2026 Teker Salud S.A.S.<br />Todos los derechos reservados.
          </p>
          <div className="w-full py-1.5 bg-white/5 border border-white/10 text-white rounded-xl text-center text-xs font-semibold">
            Año: 2026
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header */}
        <header className="hidden md:flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-sm text-slate-500 whitespace-nowrap hidden lg:inline">Dashboard TeKer</span>
            <span className="text-slate-300 hidden lg:inline">/</span>
            <span className="font-semibold text-slate-800 whitespace-nowrap hidden lg:inline">
              {navItems.find(i => i.to === location.pathname)?.label || 'Overview'}
            </span>
            
            <form onSubmit={handleSearch} className="relative flex-1 max-w-md ml-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar segmentos (ej. Clínico) o pacientes..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teker-cyan/50 focus:border-teker-cyan transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchResults(true)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              />
              {showSearchResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="p-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase px-3 py-2">Sugerencias de navegación</p>
                    {navItems.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
                      <button
                        key={item.to}
                        onClick={() => {
                           navigate(item.to);
                           setSearchQuery('');
                           setShowSearchResults(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2"
                      >
                         <item.icon className="h-4 w-4 text-slate-400" />
                         {item.label}
                      </button>
                    ))}
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2">
                      <Search className="h-4 w-4 text-slate-400" />
                      Buscar "{searchQuery}" en toda la plataforma
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
          
          <div className="flex items-center gap-6 ml-6">
            {/* Role Selector */}
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors">
              <span className="text-xs font-bold text-teker-primary uppercase">Rol:</span>
              <span className="text-sm font-medium">Gerencia</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>

            {/* Notifications */}
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-0.5 -right-0.5"></div>
              <Bell className="w-6 h-6" />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-800">Jacobo Arango</p>
                <p className="text-[10px] text-slate-400">Director General</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center bg-teker-primary text-white font-bold">
                  JA
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="mx-auto max-w-7xl h-full flex flex-col">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
