# Especificación de Producto (PRD) — Ecosistema de Decisiones TeKer 2.0
## Tableros Decisionales: DAFI (Económico/Estratégico), PROF (Gestión de Profesionales) y ENGAGEMENT (Adherencia/Comunicaciones)

**Versión:** 2.0  
**Estado:** Listo para Sprint Planning  
**Autor:** UX Lead & Product Owner Lead  
**Fecha de Referencia:** Julio 2026  

---

## INTRODUCCIÓN Y FILOSOFÍA DE DISEÑO DEL ECOSISTEMA

El rediseño de la suite de tableros de TeKer 2.0 se fundamenta en tres pilares conceptuales e invariantes:
1. **Flujo de Información (Macro → Meso → Micro):**
   - **Vista de Síntesis (Macro):** Información de alto nivel para ser consumida en menos de 5 segundos (semáforos, alertas críticas, KPIs unificados).
   - **Vista de Distribución e Intervención (Meso):** Gráficos de tendencias, flujos, matrices de comparación y análisis por cohortes para decisiones de mediano plazo (1-3 minutos).
   - **Vista de Acción Priorizada (Micro):** Cola de trabajo priorizada con datos anonimizados para accionabilidad inmediata o escalamiento directo.
2. **Enfoque "Decision-First" (Anti-AI-Slop):** Cada métrica o indicador debe justificar su existencia respondiendo a una decisión de negocio o clínica. Se prohíbe la pirotecnia de datos, las métricas de vanidad o la simulación de telemetría sin utilidad.
3. **Separación de Capas (Analítico vs. Transaccional):** Este ecosistema es **analítico-decisional**. Identifica desviaciones, calcula proyecciones e indica qué merece acción. La ejecución táctica-transaccional (agendamiento, envío manual de mensajes, etc.) se delega exclusivamente a **MedStats** o herramientas operativas correspondientes.

---

## 1. TABLERO ECONÓMICO/ESTRATÉGICO (DAFI)

### 1.1 Perfil de Usuarios y Decisiones

| Rol / Usuario Prioritario | Decisiones Clave a Habilitar |
| :--- | :--- |
| **Director Financiero (DAFI)** | • ¿Qué cohortes o contratos específicos están operando por debajo de su punto de equilibrio?<br>• ¿Cómo impacta la inasistencia (churn) en la rentabilidad unitaria? |
| **Dirección Estratégica (Jacobo Estrada)** | • ¿Qué modelos de contratación (cápita, paquete, híbrido) son más sostenibles por cohorte?<br>• ¿Cuáles cohortes representan "cash cows" para expandir y cuáles son "cash burners" para reestructurar? |
| **Pagadores / Aseguradores (Externo)** | • ¿Cuál es el retorno social y económico neto (ROI) de la inversión en TeKer en términos de claims evitados (urgencias/hospitalizaciones)? |
| **Analistas de ROI y Unit Economics** | • ¿Qué porcentaje de ahorro clínico es atribuible de manera directa a la intervención de TeKer? |

---

### 1.2 Wireframe Textual del Tablero DAFI

```
========================================================================================
[HEADER MACRO] TEKER 2.0 - CONTROL FINANCIERO Y ESTRATÉGICO (DAFI)
========================================================================================
[Filtros Globales: [Cohorte: Todas] [Pagador: Todos] [Modelo Contractual: Todos] [Periodo: Q2 2026] [Riesgo: Todos]]
[Alerta Activa: Cohorte Cardio-Reno-Metabólico en EPS SURA presenta ROI de 8.4% (Bajo Umbral Crítico del 10%)]
----------------------------------------------------------------------------------------
[ KPI 1: ROI DE COHORTE ]         [ KPI 2: AHORRO ASEGURADOR ]     [ KPI 3: MARGEN CONTRIBUCIÓN ]
  Valor: 24.3%                      Valor: $1,420M COP               Valor: 26.5%
  Meta: >20.0%                      Meta: $1,200M COP                Meta: >25.0%
  Semaforo: VERDE                   Semaforo: VERDE                  Semaforo: VERDE
  Tendencia: ↑ 3.1% vs Q1           Tendencia: ↑ 15% vs Q1           Tendencia: ↑ 1.8% (Costo IA bajo)
========================================================================================
[SECCIÓN MESO: ANÁLISIS DE FLUJO DE VALOR (WATERFALL)]
----------------------------------------------------------------------------------------
 Gráfico Waterfall de ROI:
 [Ingreso Bruto ($1,850M)] ---> [Costo Clínico Marginal (-$920M)] ---> [Costo IA (-$110M)] 
        ---> [Costo Operativo / Coordinación (-$210M)] ---> [Margen de Contribución Neto ($610M)]
 
 [Selector de Cohorte para Desglose]  |  [Comparativo Pre/Post Siniestralidad del Asegurador]
                                      |   - Gasto Basal (Pre-Teker): $4,200M COP
                                      |   - Gasto Intervención:      $2,780M COP
                                      |   - Gasto Evitado Neto:      $1,420M COP
========================================================================================
[SECCIÓN MESO-MICRO: MATRIZ DE UNIT ECONOMICS & PUNTO DE EQUILIBRIO]
----------------------------------------------------------------------------------------
+-------------------------+------------------+-----------------------+--------------------+-------------------------+
| Cohorte Poblacional     | Pacientes Actos  | Costo Paciente-Mes    | Ingreso Paciente   | Margen Contribución (%) |
+-------------------------+------------------+-----------------------+--------------------+-------------------------+
| Cardio-Reno-Metabólico  | 3,732            | $112,000 COP          | $154,000 COP       | 27.2%  [CASH COW]       |
| Salud Mental            | 2,110            | $145,000 COP          | $185,000 COP       | 21.6%  [ESTABLE]        |
| EPOC                    | 1,260            | $188,000 COP          | $202,000 COP       | 6.9%   [CASH BURNER]    |
| Osteomuscular           | 1,530            | $92,000 COP           | $120,000 COP       | 23.3%  [ESTABLE]        |
+-------------------------+------------------+-----------------------+--------------------+-------------------------+
 [*] Punto de Equilibrio Promedio: 1,150 pacientes activos por cohorte para amortizar costo fijo de plataforma.
========================================================================================
[SECCIÓN MESO: SIMULADOR DE PRICING Y SENSIBILIDAD CONTRACTUAL]
----------------------------------------------------------------------------------------
 [Controles de Simulación:] 
  - Distribución del Riesgo:   [  Bajo: 40%  |  Medio: 40%  |  Alto: 20%  ] (Sliders)
  - Intensidad de Intervención: [  Baja (Automatizada IA)  |  Media (Híbrida)  |  Alta (Médico Domicilio)  ]
  - Modelo Contractual:        [ Capita  |  Paquete Integral  |  Pago por Evento  ]
 
 [Resultado Proyectado:] 
  • Margen Esperado: 28.4%     • Costo Marginal Proyectado: $122,000 COP     • ROI Proyectado: 23.8%
  • Recomendación de Ajuste Contractual: "Migrar contrato SURA de Pago por Evento a Paquete Integral incrementará margen en 4.2%"
========================================================================================
[SECCIÓN GOBERNANZA: METODOLOGÍA DE ATRIBUCIÓN Y VERIFICACIÓN DE ROI]
----------------------------------------------------------------------------------------
 • Origen de Datos: BigQuery + Claims validados del asegurador (Última actualización: 01-Jul-2026).
 • Criterios de Inclusión: Pacientes con permanencia mínima de 90 días continuos en cohorte analizada.
 • Categorías de Costo: Incluye horas profesionales, traslados, glucómetros/dispositivos, costos de infraestructura Cloud Run e IA.
 • Nota de Privacidad: Datos agregados y anonimizados. Geolocalización mostrada únicamente a nivel departamento/municipio.
========================================================================================
```

---

### 1.3 Historias de Usuario (DAFI)

1. **Como** Director Financiero,  
   **quiero** visualizar el ROI detallado por cohorte y pagador,  
   **para** identificar qué contratos están generando valor económico defendible y cuáles están operando a pérdida.  
   *Criterios de Aceptación:*  
   - **Given** que el usuario accede al Tablero DAFI,  
   - **When** seleccione un pagador y una cohorte en los filtros globales,  
   - **Then** el sistema debe recalcular el ROI de la cohorte seleccionada aplicando la fórmula canónica, mostrando el semáforo de alerta correspondiente (Verde ≥ 20%, Amarillo 10-19%, Rojo < 10%).  
   *(Prioridad: Must have)*

2. **Como** Jacobo Estrada (Dirección Estratégica),  
   **quiero** analizar el desglose del Margen de Contribución entre costo humano vs costo de automatización por IA,  
   **para** validar si la estrategia de escalamiento tecnológico está optimizando los unit economics.  
   *Criterios de Aceptación:*  
   - **Given** que el usuario visualiza el gráfico de Waterfall de ROI,  
   - **When** pase el cursor (hover) o haga click en la barra de "Costo IA",  
   - **Then** el sistema debe abrir un tooltip con el desglose exacto en pesos y porcentaje de ahorro derivado de llamadas automatizadas de voz y triage automático de chats.  
   *(Prioridad: Must have)*

3. **Como** Analista de ROI de TeKer,  
   **quiero** visualizar la curva del punto de equilibrio (break-even) cruzada con el volumen de pacientes activos por cohorte,  
   **para** determinar cuántos pacientes adicionales requiere un programa específico para volverse rentable.  
   *Criterios de Aceptación:*  
   - **Given** la sección de Unit Economics por Cohorte,  
   - **When** el volumen de pacientes activos de una cohorte caiga por debajo de la línea del punto de equilibrio,  
   - **Then** la fila correspondiente de la matriz debe sombrearse en rojo y mostrar la etiqueta de alerta "[CASH BURNER]".  
   *(Prioridad: Should have)*

4. **Como** Director Financiero,  
   **quiero** simular diferentes escenarios de pricing (cápita, paquete, evento) modificando la severidad de riesgo de la población asignada,  
   **para** proponer ajustes de tarifas eficientes en la mesa de negociación con el asegurador.  
   *Criterios de Aceptación:*  
   - **Given** el simulador de pricing en la pantalla,  
   - **When** el usuario ajuste el slider de severidad de riesgo aumentando el "Riesgo Alto" al 50%,  
   - **Then** el sistema debe actualizar de forma interactiva y en tiempo real el costo marginal proyectado y recomendar la tarifa por paciente-mes ideal.  
   *(Prioridad: Should have)*

5. **Como** Auditor del Asegurador (Externo),  
   **quiero** acceder a la metodología de atribución y trazabilidad del costo evitado,  
   **para** auditar que los reclamos (claims) de ahorro presentados por TeKer estén respaldados por datos clínicos reales y periodos de línea base correctos.  
   *Criterios de Aceptación:*  
   - **Given** que el usuario se encuentra en la sección de Gobernanza del Tablero,  
   - **When** visualice el panel de metodología de atribución,  
   - **Then** el sistema debe detallar las fechas de actualización de BigQuery, el tamaño de la muestra de control (basal) de 6 meses pre-intervención y las categorías exactas de reclamos evitados.  
   *(Prioridad: Should have)*

6. **Como** Jacobo Estrada,  
   **quiero** exportar a formato CSV de manera ágil los datos agregados del Unit Economics de todas las cohortes filtradas,  
   **para** adjuntarlos en la presentación de reporte trimestral de junta directiva.  
   *Criterios de Aceptación:*  
   - **Given** que el usuario aplicó filtros específicos en el panel de Unit Economics,  
   - **When** haga click en el botón de "Exportar Datos",  
   - **Then** se debe descargar un archivo CSV codificado correctamente en UTF-8 con todas las columnas mostradas, garantizando la anonimización de cualquier dato personal.  
   *(Prioridad: Could have)*

---

## 2. TABLERO DE GESTIÓN DE PROFESIONALES (PROF)

### 2.1 Perfil de Usuarios y Decisiones

| Rol / Usuario Prioritario | Decisiones Clave a Habilitar |
| :--- | :--- |
| **Líder de Profesionales (Ana María)**| • ¿Qué profesionales están sobrecargados con una carga asistencial superior a la capacidad óptima?<br>• ¿Cuáles profesionales presentan métricas críticas de puntualidad o calidad documental? |
| **Coordinadores Operativos** | • ¿Cómo balancear y reasignar de manera justa la cola de visitas pendientes y pacientes activos? |
| **Dirección Clínica** | • ¿Qué perfiles de profesionales o especialidades están logrando las mejores tasas de control clínico y graduación de pacientes? |
| **RRHH / Gestión de Talento** | • ¿Quiénes tienen riesgo moderado/alto de burnout basado en ausentismo, sobrecarga horaria y bajo NPS personal? |

---

### 2.2 Wireframe Textual del Tablero PROF

```
========================================================================================
[HEADER MACRO] TEKER 2.0 - CONTROL DE GESTIÓN Y DESEMPEÑO DE PROFESIONALES (PROF)
========================================================================================
[Filtros Globales: [Especialidad: Todas] [Convenio: Todos] [Cohorte: Todos] [Periodo: Últimos 90 Días]]
[Alerta Activa: 4 Profesionales superan el límite de Carga Asistencial (>80 pacientes activos o >20 visitas pendientes)]
----------------------------------------------------------------------------------------
[ KPI 1: CARGA ASISTENCIAL PROMEDIO ] [ KPI 2: NPS DE PROFESIONALES (VALORADOS) ] [ KPI 3: PUNTUALIDAD PROMEDIO ]
  Valor: 58 pacientes activos         Valor: 76.2 (NPS Promedio)                  Valor: 87.5%
  Meta: <65 por profesional           Meta: >70 (Solo con ≥10 respuestas)         Meta: >85% a tiempo
  Semaforo: AMARILLO                  Semaforo: VERDE                             Semaforo: VERDE
  Tendencia: ↑ 8% vs mes anterior     Tendencia: ↑ 4.2 puntos vs mes anterior     Tendencia: ↓ 1.2% (Tráfico)
========================================================================================
[SECCIÓN MESO: DISTRIBUCIÓN DE CARGA ASISTENCIAL Y RECOMENDACIÓN DE BALANCEO]
----------------------------------------------------------------------------------------
 Gráfico de Barras Horizontales (Pacientes Activos por Profesional):
  - Dr. David Góngora:     ===============================================> (88 pac) [ROJO - SOBRECARGA]
  - Dra. Daniella Estrada: ======================================> (68 pac) [AMARILLO]
  - Dra. Alexandra Villegas:=============================> (55 pac) [VERDE]
  - Dr. Lucio González:    ======================> (42 pac) [VERDE]
 
 [*] Capacidad Óptima de Referencia: 60 pacientes activos por profesional.
 
 [Acción Recomendada IA-Assisted]: 
 "Reasignar 18 pacientes de Cardio-Reno-Metabólico de Dr. David Góngora (Cali) a Dra. Alexandra Villegas balanceará las cargas al 100% de la capacidad óptima sin alterar los SLAs de atención domiciliaria."
========================================================================================
[SECCIÓN MESO-MICRO: RANKING DE NPS Y COMENTARIOS DE SATISFACCIÓN DE PACIENTES]
----------------------------------------------------------------------------------------
 Ranking de NPS (Solo profesionales con mínimo 10 respuestas en el periodo):
  1. Dra. Daniella Estrada:  NPS 91.5 (24 respuestas)
  2. Dr. David Góngora:      NPS 88.0 (18 respuestas)
  3. Dra. Alexandra Villegas:NPS 85.2 (32 respuestas)
  [!] Dr. Jairo Hurtado:     NPS 65.0 (12 respuestas) [ALERTA DE DESEMPEÑO]
  
  [Comentarios Cualitativos Anonimizados de Pacientes (Filtro por Profesional)]
  • (+) "La psicóloga Daniella Estrada es maravillosa, muy atenta y sumamente clara con sus consejos." (Cali)
  • (-) "Por favor, ser más puntual en el cumplimiento de la cita programada." (Cali, Dr. Hurtado)
========================================================================================
[SECCIÓN MESO: PRODUCTIVIDAD, PUNTUALIDAD Y CALIDAD DOCUMENTAL]
----------------------------------------------------------------------------------------
 Matriz de Desempeño Operativo:
 +-------------------------+---------------------+-------------------+------------------------+-------------------------+
 | Nombre Profesional      | Consultas Atendidas | Puntualidad (%)   | Calidad Documental (%) | Citas No Adheridas (%)  |
 +-------------------------+---------------------+-------------------+------------------------+-------------------------+
 | Dra. Daniella Estrada   | 166                 | 94.2%             | 98.5% (Historias OK)   | 4.2%                    |
 | Dr. David Góngora       | 152                 | 82.5%             | 95.0%                  | 12.8%                   |
 | Dra. Alexandra Villegas | 148                 | 91.0%             | 96.8%                  | 5.1%                    |
 | Dr. Jairo Hurtado       | 82                  | 68.4% [ALERTA]    | 81.2% [BAJO]           | 18.5% [CRÍTICO]         |
 +-------------------------+---------------------+-------------------+------------------------+-------------------------+
========================================================================================
[SECCIÓN MESO: PREVENCIÓN DE BURNOUT Y CLIMA LABORAL]
----------------------------------------------------------------------------------------
 Score Compuesto de Riesgo de Burnout (Carga + Horas Extras + NPS Personal + Ausentismo):
  - Dr. David Góngora:     [ 82% - RIESGO ALTO ]      --> Recomendación: Ofrecer soporte clínico y disminuir carga 20%.
  - Dr. Jairo Hurtado:     [ 65% - RIESGO MODERADO ]  --> Recomendación: Programar sesión de mentoría y feedback operativo.
  - Dra. Alexandra Villegas:[ 35% - BAJO RIESGO ]      --> Estable.
========================================================================================
[SECCIÓN GOBERNANZA: GESTIÓN DE ACCESOS Y PRIVACIDAD DE DATOS (HABEAS DATA)]
----------------------------------------------------------------------------------------
 • Restricción de Visibilidad: Los datos individuales de desempeño son de uso exclusivo para Ana María (RRHH) y la Dirección Clínica.
 • Anonimización: En vistas de auditorías aliadas, los nombres se transforman en códigos hash (Ej: PROF_HEX_42A).
 • NPS Rule: No se computa ni muestra NPS para profesionales con menos de 10 respuestas individuales para proteger contra sesgos.
========================================================================================
```

---

### 2.3 Historias de Usuario (PROF)

1. **Como** Líder de Profesionales (Ana María),  
   **quiero** visualizar de forma clara la carga asistencial de cada profesional clasificada en zonas semáforo (Verde, Amarillo, Rojo),  
   **para** reasignar tareas y visitas pendientes antes de que un profesional caiga en sobrecarga crítica.  
   *Criterios de Aceptación:*  
   - **Given** que el usuario accede al Tablero PROF,  
   - **When** un profesional supere los 80 pacientes activos asignados o las 20 visitas domiciliarias pendientes,  
   - **Then** el sistema debe pintar su barra de visualización en rojo, activar un icono de advertencia de "SOBRECARGA" y proponer un balanceo de carga automático sugiriendo profesionales del mismo municipio disponibles.  
   *(Prioridad: Must have)*

2. **Como** Líder de Profesionales,  
   **quiero** que el ranking de NPS por profesional filtre de forma estricta e ignore a los profesionales que no tengan al menos 10 encuestas contestadas,  
   **para** evitar tomar decisiones sesgadas o injustas con base en un volumen estadístico insuficiente.  
   *Criterios de Aceptación:*  
   - **Given** que un profesional solo tiene 8 respuestas de NPS en el trimestre seleccionado,  
   - **When** se cargue la lista o ranking de NPS,  
   - **Then** el sistema debe excluir a este profesional del ranking de cara al usuario, mostrando una etiqueta de "Volumen Insuficiente (<10 respuestas)".  
   *(Prioridad: Must have)*

3. **Como** Coordinador Operativo,  
   **quiero** filtrar las métricas de puntualidad y duración de consultas por canal (virtual vs. presencial a domicilio),  
   **para** identificar si los retrasos son producto de problemas de tráfico físico en la ciudad o fallas en la plataforma digital.  
   *Criterios de Aceptación:*  
   - **Given** la sección de Productividad y Puntualidad,  
   - **When** el usuario seleccione el filtro de canal "Domiciliaria",  
   - **Then** el sistema debe recalcular los tiempos de traslado y la puntualidad promedio cruzando los datos geográficos de visitas completadas.  
   *(Prioridad: Should have)*

4. **Como** Director Clínico,  
   **quiero** correlacionar la calidad documental de las historias clínicas de un profesional con su tasa de pacientes graduados exitosamente,  
   **para** identificar mejores prácticas médicas que puedan ser compartidas mediante capacitación al resto del equipo.  
   *Criterios de Aceptación:*  
   - **Given** el panel de Calidad Clínica,  
   - **When** se analice el desempeño de un profesional,  
   - **Then** el sistema debe permitir hacer click en su fila para ver su tasa de cierre de brechas metabólicas (HbA1c/Presión Arterial) lograda en su cohorte activa.  
   *(Prioridad: Should have)*

5. **Como** Analista de RRHH,  
   **quiero** visualizar el indicador de Riesgo de Burnout calculado de forma agregada por especialidad y ciudad,  
   **para** diseñar programas de bienestar corporativo focalizados en las áreas de mayor estrés laboral.  
   *Criterios de Aceptación:*  
   - **Given** la pantalla de Clima Laboral y Burnout,  
   - **When** el score compuesto de una especialidad (ej: Psiquiatría) supere el 75%,  
   - **Then** el sistema debe emitir una alerta en el header recomendando reducir las jornadas nocturnas o de fin de semana en esa especialidad específica.  
   *(Prioridad: Should have)*

6. **Como** Profesional de la Salud de TeKer,  
   **quiero** que mis datos de evaluación cualitativa se mantengan anonimizados ante el resto de mis compañeros de trabajo,  
   **para** proteger mi privacidad y fomentar una cultura de aprendizaje continuo y no punitiva.  
   *Criterios de Aceptación:*  
   - **Given** que el sistema es accedido con el rol de "Profesional Estándar",  
   - **When** se intente acceder al ranking de NPS de otros profesionales,  
   - **Then** el sistema debe restringir el acceso o enmascarar los nombres con códigos genéricos, permitiendo solo la visualización del promedio global del equipo.  
   *(Prioridad: Must have)*

---

## 3. TABLERO DE ADHERENCIA Y COMUNICACIONES (ENGAGEMENT)

### 3.1 Perfil de Usuarios y Decisiones

| Rol / Usuario Prioritario | Decisiones Clave a Habilitar |
| :--- | :--- |
| **Director de Comunicaciones (DCOM)** | • ¿Qué canal omnicanal (WhatsApp, llamadas, email, SMS) presenta mejor costo por activación efectiva?<br>• ¿Cuál es la frecuencia óptima de contacto que maximiza respuestas sin fatigar al paciente? |
| **Líderes de Operaciones (DOPS/GIRIS)** | • ¿Cuáles son las causas raíz principales (económicas, geográficas, conductuales) de la inasistencia?<br>• ¿Cómo re-enganchar pacientes que llevan más de 30 días sin interacción en AppGIRIS? |
| **Gestores de Engagement Digital (NGAGE)**| • ¿Qué campañas de comunicación A/B están logrando mejores tasas de conversión? |
| **Coordinadores de Adherencia** | • ¿Qué pacientes individuales están en riesgo inminente de deserción y requieren contacto proactivo? |

---

### 3.2 Wireframe Textual del Tablero ENGAGEMENT

```
========================================================================================
[HEADER MACRO] TEKER 2.0 - CONTROL DE ADHERENCIA Y CAMPAÑAS DE ENGAGEMENT (ENGAGEMENT)
========================================================================================
[Filtros Globales: [Cohorte: Todas] [Canal: Todos] [Causa Raíz: Todas] [Periodo: Este Mes] [Coordinador: Todos]]
[Alerta Activa: Tasa de Activación en cohorte Diabetes cayó a 54% (Bajo Meta de Onboarding del 60%)]
----------------------------------------------------------------------------------------
[ KPI 1: CONTACTO EFECTIVO OMNICANAL ]  [ KPI 2: TASA DE ACTIVACIÓN (ONBOARDING) ] [ KPI 3: CONTINUIDAD / ASISTENCIA ]
  Valor: 72.8%                          Valor: 61.5%                               Valor: 81.2%
  Meta: >70.0%                          Meta: >60.0% en primeros 30 días          Meta: >80.0% citas asistidas
  Semaforo: VERDE                       Semaforo: VERDE                            Semaforo: VERDE
  Tendencia: ↑ 4.2% vs mes anterior     Tendencia: ↓ 2.1% (Cuello de ingreso)     Tendencia: ↑ 1.5% vs mes anterior
========================================================================================
[SECCIÓN MESO: FUNNEL DE ADHERENCIA Y CONVERSIÓN DIGITAL]
----------------------------------------------------------------------------------------
 Flujo del Funnel de Engagement:
 [1. Pacientes Ingresados: 1,500] 
     ===> (Tasa de Contacto: 82%) ===> 
 [2. Pacientes Contactados: 1,230] 
     ===> (Tasa de Activación: 65%) ===> [!] Mayor Punto de Caída Identificado aquí.
 [3. Pacientes Activados (Onboarding completo): 800] 
     ===> (Asistencia a Citas: 85%) ===> 
 [4. Pacientes Continuos / Adherentes (Mes 3+): 680]
 
 [Recomendación IA-Assisted para el Funnel]:
 "El 35% de los pacientes contactados no completan su onboarding debido a barreras de alfabetismo digital en AppGIRIS. Implementar un video tutorial corto enviado por WhatsApp durante las primeras 48h de ingreso puede incrementar la tasa de activación en un 18%."
========================================================================================
[SECCIÓN MESO: EFECTIVIDAD POR CANAL Y PRUEBAS A/B DE CAMPAÑAS]
----------------------------------------------------------------------------------------
 Rendimiento por Canal de Contacto:
 +------------------+-----------------------+--------------------+-------------------------+-------------------------+
 | Canal            | Contacto Efectivo (%) | Tasa Respuesta (%) | Costo por Activación    | Tasa de Churn del Canal |
 +------------------+-----------------------+--------------------+-------------------------+-------------------------+
 | WhatsApp Business| 84.5%  [TOP EXCELENCIA]| 56.2%              | $1,200 COP  [Económico] | 3.2%                    |
 | Llamada Directa  | 62.0%                 | 41.5%              | $8,500 COP              | 8.4%                    |
 | Correo Electrónico| 38.2%                | 11.0%              | $350 COP                | 24.5% [FATIGA]          |
 | SMS Recordatorio | 48.0%                 | 15.4%              | $150 COP                | 12.0%                   |
 +------------------+-----------------------+--------------------+-------------------------+-------------------------+
 
 [Resultados de Campaña A/B en Ejecución:]
  - Variante A (Mensaje Clínico Estándar): 12% Conversión
  - Variante B (Mensaje de Soporte Emocional y Familiar): 28% Conversión [GANADORA DE LA PRUEBA]
========================================================================================
[SECCIÓN DIAGNÓSTICO: CAUSAS RAÍZ Y BARRERAS DE NO ADHERENCIA]
----------------------------------------------------------------------------------------
 Clasificación de Barreras de Acceso y Continuidad:
  - Barreras Conductuales (Desinterés / Olvido):     =====================> 42%
  - Barreras Geográficas (Distancia / Transporte):  ===============> 28%
  - Barreras Económicas (Costo medicamentos/copago):===========> 18%
  - Barreras de Conectividad (Sin plan de datos):   =======> 12%
 
 [Estrategia Recomendada:] "Para pacientes con barreras geográficas en Cali, priorizar el agendamiento del Playbook de Atención Domiciliaria en lugar de la modalidad de telemedicina virtual."
================================================================================--------
[SECCIÓN MICRO-ACCIÓN: COLA PRIORIZADA DE PACIENTES EN RIESGO DE DESERCIÓN (CRM)]
================================================================================--------
 Cola de Re-engagement Urgente (Pacientes >30 días inactivos):
 +-------------+-------------------------+------------------+-----------------------+-----------------------------------+
 | ID Paciente | Cohorte                 | Último Contacto  | Causa Probable        | Próxima Acción Accionable (SLA)   |
 +-------------+-------------------------+------------------+-----------------------+-----------------------------------+
 | #1CA2       | Cardio-Reno-Metabólico  | Hace 34 días     | Conductual (Olvido)   | Llamada de rescate familiar (12h) |
 | #2E10       | Salud Mental            | Hace 41 días     | Conectividad          | Visita de enfermería domic. (24h) |
 | #2D32       | Osteomuscular           | Hace 38 días     | Económica (Copagos)   | Escalamiento a trabajadora soc.  |
 +-------------+-------------------------+------------------+-----------------------+-----------------------------------+
========================================================================================
```

---

### 3.3 Historias de Usuario (ENGAGEMENT)

1. **Como** Director de Comunicaciones (DCOM),  
   **quiero** comparar el costo por activación y la efectividad porcentual de cada canal (WhatsApp, llamadas, email, SMS),  
   **para** reasignar el presupuesto de marketing y comunicaciones a las herramientas omnicanal con mayor ROI.  
   *Criterios de Aceptación:*  
   - **Given** que el usuario visualiza el gráfico de rendimiento de canales,  
   - **When** se analice el coste y la efectividad del periodo,  
   - **Then** el sistema debe ordenar los canales de mayor a menor rendimiento en una matriz interactiva y recomendar el mix de canales óptimo según la edad del segmento de pacientes.  
   *(Prioridad: Must have)*

2. **Como** Gestor de Engagement Digital (NGAGE),  
   **quiero** configurar y evaluar pruebas de mensajes A/B de manera integrada con las campañas activas,  
   **para** determinar qué tipo de tono y contenido (clínico formal vs. de acompañamiento familiar) logra que los pacientes asistan a sus citas.  
   *Criterios de Aceptación:*  
   - **Given** la sección de Campañas Activas,  
   - **When** finalice el periodo de prueba de 15 días de un test A/B,  
   - **Then** el sistema debe marcar con una insignia de "GANADOR" la variante con mayor tasa de conversión estadística significativa.  
   *(Prioridad: Must have)*

3. **Como** Líder de Operaciones de Adherencia,  
   **quiero** visualizar de forma gráfica la distribución de causas raíz y barreras de acceso de los pacientes no adherentes,  
   **para** diseñar programas de intervención social y de transporte que solucionen los problemas estructurales.  
   *Criterios de Aceptación:*  
   - **Given** el gráfico de diagnóstico de causas raíz,  
   - **When** haga click en una barra de barrera (ej: "Barrera Económica"),  
   - **Then** el gráfico Meso de pacientes debe desglosarse mostrando las entidades (Aseguradores) y municipios donde más se repite esta problemática.  
   *(Prioridad: Should have)*

4. **Como** Coordinador de Adherencia en campo,  
   **quiero** contar con una cola priorizada de pacientes en riesgo inminente de deserción (más de 30 días de inactividad o citas canceladas recurrentes),  
   **para** ejecutar llamadas de rescate oportunas bajo protocolos establecidos en la doctrina de activación.  
   *Criterios de Aceptación:*  
   - **Given** la sección de Cola de Re-engagement,  
   - **When** un paciente sea asignado a mi perfil,  
   - **Then** debo visualizar su ID anonimizado, su última fecha de interacción, su causa probable detectada y un botón directo que me redirija al Playbook de re-engagement recomendado en MedStats con su correspondiente SLA de atención.  
   *(Prioridad: Must have)*

5. **Como** Director de Cumplimiento Normativo (Legal),  
   **quiero** monitorear que el 100% de los pacientes impactados por las campañas tengan el consentimiento de contacto digital (Opt-In) activo y actualizado,  
   **para** mitigar riesgos legales de demandas por Habeas Data y protección al consumidor en salud.  
   *Criterios de Aceptación:*  
   - **Given** la sección de Gobernanza del tablero,  
   - **When** una campaña intente programarse,  
   - **Then** el sistema debe cruzar las listas de distribución y bloquear de forma automática a los números telefónicos que hayan solicitado exclusión o no cuenten con registro de aceptación firmado.  
   *(Prioridad: Must have)*

6. **Como** Coordinador de Adherencia,  
   **quiero** descargar un consolidado mensual de inasistencias y deserciones segmentado por cohorte diagnóstica,  
   **para** presentarlo como soporte en el comité clínico de fin de mes de TeKer.  
   *Criterios de Aceptación:*  
   - **Given** que el usuario aplica filtros específicos de cohorte en la cola priorizada,  
   - **When** presione el botón de "Exportar Datos",  
   - **Then** se debe descargar un reporte estructurado que preserve la confidencialidad de la ficha clínica de cada usuario.  
   *(Prioridad: Could have)*

---

## 4. DICCIONARIOS DE MÉTRICAS DETALLADOS

### 4.1 Diccionario del Tablero DAFI

| Nombre de la Métrica | Fórmula de Cálculo | Fuente de Datos | Owner / Responsable | Frecuencia de Actualización | Segmentaciones | Umbrales de Alerta / Metas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ROI por Cohorte** | `((Ahorro Asegurador - Costo Intervención) / Costo Intervención) * 100` | BigQuery (Siniestralidad Aseguradora) + Oracle (Costos de Operación TeKer) | Director Financiero (DAFI) | Trimestral | Cohorte, Pagador, Línea de Negocio | • **Meta:** >20%  <br>• **Alerta Amarilla:** 10-19% <br>• **Alerta Crítica:** <10% por 2 Qs |
| **Ahorro Asegurador (Neto)**| `Gasto Basal Siniestros (Pre-Teker, 6m) - Gasto Periodo Intervención (12m)` | Archivo de Claims validados por Actuaría del Asegurador | Dirección Estratégica (Jacobo Estrada) | Semestral | Cohorte, Pagador, Diagnóstico (CIE-10), Geografía | • **Meta:** >$1,200M COP ahorrados anualmente por asegurador estratégico |
| **Margen de Contribución TeKer**| `((Ingreso Neto - Costo Clínico Marginal) / Ingreso Neto) * 100` | Oracle ERP (Contabilidad TeKer) | Director Financiero (DAFI) | Mensual | Cohorte, Pagador, Canal, Complejidad de Riesgo | • **Meta:** >25.0% <br>• **Alerta Amarilla:** 15-24% <br>• **Alerta Crítica:** <15% |
| **Costo por Paciente-Mes (Unit Economic)**| `Costo Total Operativo de Cohorte / Total de Pacientes Activos en el Periodo` | Oracle ERP + BigQuery | Director Financiero (DAFI) | Mensual | Cohorte, Tipo de Intervención (Virtual/Física) | • **Meta:** <$120,000 COP en CRM<br>• **Alerta:** Desviación >15% sobre presupuesto |

---

### 4.2 Diccionario del Tablero PROF

| Nombre de la Métrica | Fórmula de Cálculo | Fuente de Datos | Owner / Responsable | Frecuencia de Actualización | Segmentaciones | Umbrales de Alerta / Metas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Carga Asistencial** | `Pacientes Activos Asignados + Visitas Pendientes` | Agendamiento en MedStats | Líder de Profesionales (Ana María) | Diaria | Profesional, Especialidad, Geografía | • **Meta:** <60 pacientes activos <br>• **Alerta Amarilla:** 60-80 pacientes <br>• **Alerta Crítica:** >80 pacientes |
| **NPS por Profesional**| `(Promedio de Encuestas de Recomendación de Servicio del Paciente)` | Formularios de satisfacción de usuarios de AppGIRIS (SIAU) | Líder de Profesionales (Ana María) | Mensual | Especialidad, Convenio, Canal, Ciudad | • **Meta:** >75 de Score <br>• **Alerta:** Score <70 (Requiere ≥10 encuestas válidas) |
| **Puntualidad en Citas** | `(Citas iniciadas dentro de ±10 min de la hora programada / Total Citas) * 100` | Log de logs de inicio de sesión de AppGIRIS y geolocalización | Coordinadores Operativos | Semanal | Canal (Domicilio/Telemedicina), Profesional, Especialidad | • **Meta:** >85.0% de puntualidad <br>• **Alerta:** <70% de puntualidad en el mes |
| **Calidad Documental de Historias** | `(Historias diligenciadas en SLA <24h con plan de cuidado completo / Historias Totales) * 100` | Auditoría de historias en MedStats | Dirección Clínica | Mensual | Especialidad, Profesional | • **Meta:** >95.0% cumplimiento <br>• **Alerta:** <85% de calidad |

---

### 4.3 Diccionario del Tablero ENGAGEMENT

| Nombre de la Métrica | Fórmula de Cálculo | Fuente de Datos | Owner / Responsable | Frecuencia de Actualización | Segmentaciones | Umbrales de Alerta / Metas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Contacto Efectivo Omnicanal**| `(Contactos exitosos con respuesta / Intentos totales de contacto) * 100` | Servidor de mensajería (WhatsApp API, Twilio, telefonía) | DCOM (Comunicaciones) | Diaria | Canal, Cohorte, Rango de Edad, Geografía | • **Meta:** >70.0% de efectividad <br>• **Alerta:** <60% de efectividad |
| **Tasa de Activación (Onboarding)** | `(Pacientes que completan onboarding inicial / Pacientes ingresados) * 100` | Registro de onboarding en base de datos de AppGIRIS | Gestores de Engagement Digital (NGAGE) | Semanal | Cohorte, Canal de captación, Geografía | • **Meta:** >60.0% en los primeros 30 días de ingreso <br>• **Alerta Crítica:** <50% |
| **Continuidad y Asistencia**| `(Citas de comité efectivamente realizadas / Citas de comité programadas) * 100` | Base de datos de citas asistidas en MedStats | Líderes de Operaciones (DOPS/GIRIS) | Semanal | Cohorte, Pagador, Riesgo Clínico | • **Meta:** >80.0% de asistencia <br>• **Alerta:** <75% (Dispara protocolo de re-engagement) |
| **Tasa de Deserción (Churn)** | `(Pacientes con >60 días consecutivos de inactividad / Pacientes activos iniciales) * 100` | Base de datos de interacciones de AppGIRIS | Líderes de Operaciones (DOPS/GIRIS) | Mensual | Cohorte, Canal, Causa Raíz de Deserción | • **Meta:** <10.0% anual <br>• **Alerta Crítica:** >15.0% acumulado |

---

## 5. MATRICES DE ALERTAS DECISIONALES

### 5.1 Matriz de Alertas DAFI
- **Alerta 1: Desviación Crítica de ROI**
  - *Umbral:* ROI < 10% en una cohorte o pagador estratégico por un trimestre.
  - *Destinatario:* Director Financiero (DAFI) + Jacobo Estrada (Estrategia).
  - *Canal:* Alerta Roja en Header de Dashboard + Notificación en Teams.
  - *Acción Esperada:* Disparar mesa de renegociación contractual o rediseño de playbooks clínicos en un plazo máximo de 10 días hábiles.
  - *SLA:* 48 horas para acuse de recibo y análisis preliminar.
  - *Prioridad MVP:* Día 1.
- **Alerta 2: Margen de Contribución Negativo**
  - *Umbral:* Margen de Contribución < 0% en un contrato de pagador en un mes.
  - *Destinatario:* Director Financiero + Coordinadores Operativos de la zona afectada.
  - *Canal:* Notificación en el Dashboard con resalte en la fila del heatmap.
  - *Acción Esperada:* Congelar nuevas admisiones virtuales y programar de forma inmediata una auditoría de costo marginal clínico.
  - *SLA:* 72 horas para mapeo de costos de personal.
  - *Prioridad MVP:* Fase 1.

### 5.2 Matriz de Alertas PROF
- **Alerta 1: Sobrecarga Crítica (Riesgo de Burnout)**
  - *Umbral:* Carga asistencial > 80 pacientes activos o > 20 visitas pendientes por profesional.
  - *Destinatario:* Ana María (Líder de Profesionales) + Coordinador Operativo de Zona.
  - *Canal:* Banner Amarillo/Rojo en sección de carga asistencial + Alerta en panel de control.
  - *Acción Esperada:* Reasignar mínimo 10 pacientes o re-agendar las visitas no urgentes a través de MedStats utilizando la sugerencia automatizada del balanceador de cargas.
  - *SLA:* 24 horas para balanceo de carga asistencial.
  - *Prioridad MVP:* Día 1.
- **Alerta 2: Desempeño y Calidad Crítica**
  - *Umbral:* Puntualidad < 70% o Calidad Documental < 80% en un periodo de 30 días seguidos.
  - *Destinatario:* Profesional Afectado + Líder de Profesionales (Ana María).
  - *Canal:* Alerta Privada en el perfil de desarrollo del profesional + Mensaje directo de RRHH.
  - *Acción Esperada:* Citación obligatoria a sesión de feedback, mentoría operativa clínica y plan de mejora individual a 30 días.
  - *SLA:* 5 días hábiles para agendar reunión de plan de mejora.
  - *Prioridad MVP:* Fase 1.

### 5.3 Matriz de Alertas ENGAGEMENT
- **Alerta 1: Caída de Activación (Onboarding)**
  - *Umbral:* Tasa de Activación < 50% en una cohorte poblacional (ej: Diabetes) durante 2 semanas.
  - *Destinatario:* Gestores de Engagement Digital (NGAGE) + Director de Comunicaciones (DCOM).
  - *Canal:* Notificación con semáforo rojo en header del funnel + Correo corporativo.
  - *Acción Esperada:* Cambiar el Playbook de activación omnicanal por el de "Llamada de rescate con video-tutorial por WhatsApp" para el segmento de pacientes con inactividad.
  - *SLA:* 48 horas para despliegue de campaña alternativa.
  - *Prioridad MVP:* Día 1.
- **Alerta 2: Paciente en Riesgo Inminente de Deserción**
  - *Umbral:* Paciente inactivo en AppGIRIS por más de 30 días consecutivos con cita de comité cancelada o postergada.
  - *Destinatario:* Coordinador de Adherencia asignado.
  - *Canal:* Inclusión con bandera roja en la cola priorizada del Nivel Micro del dashboard.
  - *Acción Esperada:* Llamar directamente al paciente o a su cuidador familiar registrado para indagar causas raíz y agendar teleconsulta de soporte en MedStats.
  - *SLA:* 12 horas para primer intento de contacto efectivo registrado.
  - *Prioridad MVP:* Fase 1.

---

## 6. BACKLOG DE DESARROLLO PRIORIZADO POR FASES

### 6.1 Fase 0: Cimientos de Datos y Gobernanza (Sprints 1 - 2)
*Enfoque en estructurar el modelo de datos, diccionarios de variables, seguridad y anonimización de Habeas Data.*
1. **Definición de Schemas en BigQuery:** Diseñar el modelo relacional e integrar las tablas de Claims de Siniestralidad de Aseguradores con el ERP contable Oracle de TeKer.
2. **Implementación de Algoritmo de Anonimización:** Desplegar algoritmos para enmascarar IDs de pacientes (Habeas Data) y hashes para nombres de profesionales en vistas aliadas.
3. **Mecanismo de Verificación de NPS Mínimo:** Codificar la regla rígida que bloquea el cálculo y visualización de NPS individual si el profesional cuenta con menos de 10 respuestas.
4. **Definiciones y Documentación Inicial:** Publicar los diccionarios de métricas en la base de conocimientos integrada del equipo de desarrollo.
- *Dependencias:* Sincronización del ETL de BigQuery y Oracle Contabilidad.

### 6.2 Fase 1: MVP Decisional (Sprints 3 - 5)
*Lanzamiento de los 3 KPIs canónicos prioritarios y las 2 alertas críticas automáticas por cada tablero.*
1. **Lanzamiento DAFI MVP:** Header con ROI, Ahorro Asegurador y Margen de Contribución + Waterfall interactivo de costos de cohorte.
2. **Lanzamiento PROF MVP:** Panel de Carga Asistencial semaforizado + Tabla de puntualidad y productividad por profesional.
3. **Lanzamiento ENGAGEMENT MVP:** Funnel de conversión omnicanal + Cola priorizada de pacientes en riesgo inminente de deserción con integración a MedStats.
4. **Sistema de Alertas Críticas (Día 1):** Desplegar notificaciones de Sobrecarga de Profesionales, Caída de Activación de Pacientes y ROI Insuficiente.
- *Dependencias:* Fase 0 completada. APIs de agendamiento y mensajería omnicanal conectadas en lectura.

### 6.3 Fase 2: Automatización, Simulación e IA (Sprints 6 - 8)
*Integración de algoritmos predictivos, simuladores interactivos de pricing y balanceo de cargas asistenciales asistido por IA.*
1. **Simulador Interactivo de Pricing (DAFI):** Sliders interactivos de riesgo poblacional y selección de modelos de capita/evento/paquete para cálculo en tiempo real.
2. **Balanceador de Carga Automatizado (PROF):** Algoritmo que asocia de forma automática las visitas pendientes de profesionales sobrecargados a profesionales disponibles con menor tiempo de traslado.
3. **Optimización Omnicanal A/B Testing (ENGAGEMENT):** Automatización del envío del mensaje ganador de la campaña directamente a los gestores digitales.
4. **Insights Clínicos IA-Assisted (GIRIS/ENGAGEMENT):** Integración con la API de Gemini (Server-side) para detectar de forma proactiva hallazgos contextuales y sugerir responsables.
- *Dependencias:* Fase 1 con datos estables. Integración Gemini API habilitada.

---

## 7. RIESGOS ESPECÍFICOS Y PLAN DE MITIGACIÓN

### 7.1 Riesgos en DAFI (Financiero)
- **Riesgo:** Desfase o retraso en el reporte de claims (siniestralidad) por parte de las aseguradoras (retraso promedio de hasta 90 días en el sector salud).
  - *Probabilidad:* Alta | *Impacto:* Crítico.
  - *Mitigación:* Implementar un "Costo Evitado Estimado (Proyectado)" basado en modelos predictivos intermedios y marcar claramente en el dashboard con la etiqueta de "Datos Proyectados / Sujetos a conciliación trimestral".

### 7.2 Riesgos en PROF (Gestión de Profesionales)
- **Riesgo:** Resistencia al cambio y desmotivación del equipo médico al sentir que el tablero de productividad y calidad documental tiene un carácter punitivo.
  - *Probabilidad:* Alta | *Impacto:* Alto.
  - *Mitigación:* Presentar el tablero en sesiones conjuntas de cocreación, habilitando de manera exclusiva para el profesional su panel de "Desarrollo y Plan de Capacitaciones" de manera constructiva y confidencial, con enfoque en bienestar.

### 7.3 Riesgos en ENGAGEMENT (Comunicaciones)
- **Riesgo:** Fatiga por exceso de contacto (Spam) digital en el paciente crónico, disminuyendo drásticamente la tasa de contacto efectivo y provocando quejas por Habeas Data.
  - *Probabilidad:* Media | *Impacto:* Crítico.
  - *Mitigación:* Programar una regla de negocio inflexible en el CRM que impida el contacto automatizado omnicanal de más de 3 veces por semana para un mismo usuario, exceptuando urgencias o recordatorios estrictos de citas domiciliarias.

---

## 8. CRITERIOS DE ÉXITO POST-LANZAMIENTO

Para medir la efectividad, adopción e impacto real de los tres tableros (DAFI, PROF, ENGAGEMENT) post-lanzamiento en el ecosistema TeKer 2.0, se definen los siguientes indicadores clave de éxito:

### 8.1 Métricas de Adopción y Usabilidad
- **Tasa de Usuarios Activos Semanales (WAU):** Que el 100% de los líderes de área (DAFI, Ana María, DCOM) ingresen al menos 3 veces por semana a revisar semáforos y alertas de su respectivo panel.
- **Frecuencia de Uso de la Cola Priorizada:** Que los coordinadores operativos en campo utilicen la cola de re-engagement diariamente para rescatar pacientes en riesgo.
- **NPS del Tablero (Satisfacción del Usuario Interno):** Lograr una puntuación de recomendación neta de los tableros superior a 80 puntos, evaluada mediante encuestas integradas de usabilidad.

### 8.2 Métricas de Eficiencia en la Toma de Decisiones
- **Reducción del Tiempo de Reasignación de Cargas:** Disminuir el tiempo de balanceo de pacientes de profesionales sobrecargados a menos de 4 horas desde que se genera la alerta.
- **Tiempo de Respuesta a Alertas Críticas (SLA Decisional):** Cumplir con el SLA establecido de acción decisional en más del 92% de los casos disparados por ROI bajo, inasistencia de cohorte o burnout médico.
- **Tasa de Conversión de Campañas de Comunicación:** Incrementar la tasa de activación de pacientes del 61.5% al 75% en los primeros 30 días mediante el uso de los playbooks basados en tests A/B ganadores.

### 8.3 Métricas de Impacto Financiero y Clínico (ROI)
- **Incremento del Margen de Contribución de TeKer:** Subir el margen promedio global de la plataforma por encima del 28% gracias a la migración inteligente a modelos contractuales híbridos y de paquete integral.
- **Aumento del Retorno de Inversión del Asegurador (ROI):** Lograr que el ROI promedio consolidado por cohorte se mantenga de manera defendible por encima del 24% a través de la reducción de claims evitados en urgencias.

---

## 9. RESPUESTA A LAS PREGUNTAS GUÍA DEL NEGOCIO CLÍNICO DE TEKER 2.0

### ¿Cómo convierte el Tablero DAFI las preguntas económicas en decisiones de escalamiento contractual?
DAFI traduce la incertidumbre financiera en decisiones binarias claras. Al agrupar el costo directo, costo operativo y costo tecnológico en unit economics, permite visualizar de forma instantánea qué cohorte está absorbiendo mayor presupuesto sin generar retorno clínico. Jacobo Estrada puede ver, con claims verificados, si el dinero evitado en hospitalizaciones supera el costo marginal de enviar un médico a domicilio. Si la cohorte genera un ROI >20% sostenido, se escala el contrato; si el ROI cae por debajo del 10%, el simulador de pricing muestra si se debe migrar de un cobro por evento a cápita para equilibrar la rentabilidad del asegurador y de TeKer.

### ¿Cómo equilibra el Tablero PROF la productividad con la protección del clima laboral y el burnout?
PROF no persigue culpables, busca balancear esfuerzos. A través de la visualización de la Carga Asistencial, se detectan a los profesionales que están en zona de sobrecarga (>80 pacientes activos) antes de que esto afecte su salud o la calidad de la historia clínica. La IA asiste sugiriendo la reasignación de pacientes a médicos con agendas libres en la misma geografía. Para evitar la competencia insana o humillaciones, los rankings de NPS se restringen al rol de RRHH (Ana María) y se exige un mínimo de 10 encuestas contestadas para evitar sesgos individuales, promoviendo espacios privados de mentoría y feedback de calidad clínica.

### ¿Cómo transforma el Tablero ENGAGEMENT el desinterés en playbooks de activación digital eficaces?
ENGAGEMENT desglosa la inactividad de los pacientes en causas de fondo (diagnósticos sociodemográficos). Al identificar que la mayor caída de retención (15%) se debe a barreras de alfabetización digital y conectividad en AppGIRIS, el sistema genera playbooks alternativos: en lugar de enviar recordatorios robóticos por correo, se ejecutan flujos de llamadas telefónicas de rescate a los cuidadores familiares. Cada gestor digital cuenta con una cola priorizada de pacientes críticos inactivos hace más de 30 días, permitiéndoles contactar a las personas precisas mediante canales óptimos WhatsApp con variantes de mensajes emocionales validadas mediante A/B testing con alta conversión.
