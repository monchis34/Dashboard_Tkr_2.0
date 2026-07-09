/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { HomeMacro } from './pages/HomeMacro';
import { OperacionMacro } from './pages/OperacionMacro';
import { OperacionMeso } from './pages/OperacionMeso';
import { OperacionMicro } from './pages/OperacionMicro';
import { ClinicoMeso } from './pages/ClinicoMeso';
import { ProfesionalesMeso } from './pages/ProfesionalesMeso';
import { SiauDashboard } from './pages/SiauDashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomeMacro />} />
          <Route path="operacion" element={<OperacionMacro />} />
          <Route path="operacion/meso" element={<OperacionMeso />} />
          <Route path="operacion/micro" element={<OperacionMicro />} />
          <Route path="siau" element={<SiauDashboard />} />
          <Route path="clinico" element={<ClinicoMeso />} />
          <Route path="profesionales" element={<ProfesionalesMeso />} />
          {/* Fallback for others to keep it simple */}
          <Route path="ejecutivo" element={<Navigate to="/" replace />} />
          <Route path="engagement" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

