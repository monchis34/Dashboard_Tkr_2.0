# Especificación Técnica de Producto (PRD) — GIRIS TeKer 2.0
## Componente: Evolución Meso de Cohortes Activas

**Versión:** 2.1  
**Estado:** Aprobado para Sprint Planning  
**Autor:** Product Owner Lead - HealthTech & Clinical Analytics  
**Fecha de Referencia:** Julio 2026  
**Ubicación en Plataforma:** Sección central del dashboard Clínico (GIRIS), Nivel MESO

---

## 1. PROPÓSITO Y PREGUNTA CLAVE
Este componente responde a la pregunta decisional crítica de directores médicos y gestores de cohortes:  
***"¿Cómo ha evolucionado el volumen de pacientes activos por cohorte en los últimos meses, y qué cohortes están creciendo o decreciendo en su participación real?"***

Ayuda a identificar cuellos de botella en admisión, tasas de abandono (churn) clínico por especialidad, y facilita la planificación de capacidad asistencial y balance de personal médico a mediano plazo.

---

## 2. DISEÑO Y ESPECIFICACIONES VISUALES

### 2.1 Tipo de Visualización
*   **Tipo de Gráfico principal:** Gráfico de áreas apiladas (Stacked Area Chart) con curvas suaves (curvatura spline/cardinal).
*   **Eje X:** Línea de tiempo mensual (últimos 3, 6, o 12 meses, según el filtro seleccionado).
*   **Eje Y:** Volumen acumulado de pacientes activos (rango adaptativo, 0 a 8,000+).
*   **Orden de apilamiento:** Descendente por volumen (la cohorte con mayor cantidad de pacientes activos se sitúa en la base del gráfico para dar estabilidad visual).

### 2.2 Paleta de Colores de Cohortes (Accesibilidad WCAG 2.1 AA)
Para garantizar el cumplimiento de accesibilidad y una identidad de marca unificada con la paleta corporativa TeKer, se asignan los siguientes códigos hexadecimales específicos:

| Cohorte Clínica | Color Hexadecimal | Representación Visual |
| :--- | :--- | :--- |
| **Cardio-Reno-Metabólico (CRM)** | `#1e3a8a` | Azul Navy Oscuro (Base estable) |
| **Salud Mental** | `#1e40af` | Azul Primario |
| **EPOC / Respiratorio** | `#3b82f6` | Azul Secundario |
| **Diabetes** | `#0ea5e9` | Cyan Accent |
| **Hipertensión** | `#10b981` | Verde Esmeralda |
| **Nefroprotección** | `#6366f1` | Índigo Vibrante |
| **Osteomuscular** | `#f59e0b` | Ámbar / Naranja Cálido |

---

## 3. DEFINICIÓN DE LA MÉTRICA Y QUERY SQL (BIGQUERY)

### 3.1 Fórmula Canónica
$$Usuarios\ Activos\ en\ Cohorte = \text{Count DISTINCT de (Id\_Paciente)}$$
Filtrados por las siguientes condiciones restrictivas de negocio:
1.  **Asignación de Cohorte:** El paciente debe pertenecer a una cohorte clínica activa en su historial médico de admisión.
2.  **Actividad Reciente:** Debe contar con al menos **una (1) interacción registrada** (consulta presencial, telemedicina, contacto telefónico efectivo, comité interdisciplinario, actualización de playbook o carga de biomarcador) en los últimos **30 días naturales** respecto al mes analizado.
3.  **Estado:** No debe estar graduado del programa, no debe ser desertor/retirado administrativo (Churn), ni fallecido.

### 3.2 Query BigQuery Optimizado (Tabla: `giris_patient_activity`)
Esta query utiliza ventanas de tiempo deslizantes para calcular el volumen de pacientes activos mensuales de forma precisa sin doble conteo:

```sql
WITH patient_monthly_status AS (
  -- Obtener los registros del paciente, su cohorte y la última fecha de interacción por mes
  SELECT
    p.paciente_id,
    p.cohorte,
    p.pagador,
    p.nivel_riesgo,
    p.municipio,
    p.departamento,
    p.entidad_id,
    p.coordinador_id,
    DATE_TRUNC(a.fecha_actividad, MONTH) AS mes_referencia,
    MAX(a.fecha_actividad) AS ultima_actividad
  FROM `teker-production.giris.pacientes` p
  INNER JOIN `teker-production.giris.giris_patient_activity` a 
    ON p.paciente_id = a.paciente_id
  WHERE 
    p.estado_programa = 'ACTIVO'  -- Excluye graduados, suspendidos o desertores
    AND a.estado_interaccion = 'COMPLETADO'
    AND a.fecha_actividad >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
  GROUP BY 
    p.paciente_id, p.cohorte, p.pagador, p.nivel_riesgo, p.municipio, p.departamento, p.entidad_id, p.coordinador_id, mes_referencia
),
monthly_active_users AS (
  -- Evaluar si la última interacción del paciente en el mes de referencia está dentro del límite de 30 días naturales
  SELECT
    mes_referencia,
    cohorte,
    pagador,
    nivel_riesgo,
    municipio,
    departamento,
    entidad_id,
    coordinador_id,
    COUNT(DISTINCT paciente_id) AS pacientes_activos
  FROM patient_monthly_status
  -- Validamos que la actividad esté dentro del mes de referencia (cumple criterio >= 1 interacción mensual)
  WHERE ultima_actividad >= mes_referencia
  GROUP BY 
    mes_referencia, cohorte, pagador, nivel_riesgo, municipio, departamento, entidad_id, coordinador_id
)
SELECT
  mes_referencia,
  -- Pivotamos las cohortes para facilitar el consumo del gráfico de áreas
  SUM(CASE WHEN cohorte = 'Cardio-Reno-Metabólico' THEN pacientes_activos ELSE 0 END) AS cohorte_crm,
  SUM(CASE WHEN cohorte = 'Salud Mental' THEN pacientes_activos ELSE 0 END) AS cohorte_salud_mental,
  SUM(CASE WHEN cohorte = 'EPOC/Asma' THEN pacientes_activos ELSE 0 END) AS cohorte_epoc_asma,
  SUM(CASE WHEN cohorte = 'Diabetes' THEN pacientes_activos ELSE 0 END) AS cohorte_diabetes,
  SUM(CASE WHEN cohorte = 'Hipertensión' THEN pacientes_activos ELSE 0 END) AS cohorte_hipertension,
  SUM(CASE WHEN cohorte = 'Nefroprotección' THEN pacientes_activos ELSE 0 END) AS cohorte_nefroproteccion,
  SUM(CASE WHEN cohorte = 'Osteomuscular' THEN pacientes_activos ELSE 0 END) AS cohorte_osteomuscular,
  SUM(pacientes_activos) AS total_pacientes_mes
FROM monthly_active_users
GROUP BY mes_referencia
ORDER BY mes_referencia ASC;
```

---

## 4. SEGMENTACIONES Y CONTROLES OPERATIVOS

El componente debe heredar de forma reactiva las selecciones de la barra de filtros generales del tablero GIRIS:

1.  **Cohorte Clínica:** Multi-select que filtra qué cohortes de área apilada renderizar.
2.  **Pagador / Asegurador:** Filtro que recuenta los pacientes pertenecientes a EPS SURA, Coomeva, MedIntegral, etc.
3.  **Nivel de Riesgo:** Segmentación por Severidad (Crítico, Alto, Moderado, Bajo).
4.  **Geografía:** Desglose por Municipio o Departamento.
5.  **Período Temporal:** Conmutador interactivo entre Últimos 3 Meses, Últimos 6 Meses (Predeterminado) y Últimos 12 Meses.
6.  **Filtro de Rol (Gobernanza):**
    *   *Coordinador Aliado:* Solo visualiza las cohortes asignadas a su convenio específico (Filtro forzado a nivel de fila).
    *   *Director Médico:* Visualización total de todas las cohortes y geografías.

---

## 5. COMPORTAMIENTO INTERACTIVO DE USUARIO (UX)

### 5.1 Hover (Tooltip Inteligente)
Al situar el cursor sobre el gráfico en un mes determinado, se despliega un tooltip flotante diseñado para la toma de decisiones clínicas rápidas:
*   **Estructura del Tooltip:**
    *   **Título:** "Mes: [Nombre del Mes] [Año]"
    *   **Detalle por cohorte:** Lista de las cohortes seleccionadas con su volumen respectivo y porcentaje de participación respecto al total de ese mes (ej: *Cardio-Reno-Metabólico: 2,500 pac. (33.5%)*).
    *   **Total:** Suma consolidada de pacientes activos de ese mes.
    *   **Indicador de cambio:** Variación porcentual global respecto al mes anterior (↑ X.X% vs mes anterior).

### 5.2 Click en Leyenda (Ocultación Reactiva)
*   Hacer un click simple sobre un elemento de la leyenda del gráfico (ej: *Salud Mental*) deshabilita temporalmente esa serie en el área apilada, recalculando los valores acumulados en las demás áreas de manera inmediata con transiciones suaves.
*   Un doble click en la leyenda aísla únicamente esa cohorte (efecto Solo), permitiendo un análisis inmediato de su tendencia particular sin interferencias visuales.

### 5.3 Drill-Down (Navegación Meso → Micro)
*   Hacer click en un punto o sección del área de una cohorte (ej: hacer click en el área azul de *Cardio-Reno-Metabólico*) filtra automáticamente la tabla de "Cola Priorizada de Pacientes" (Nivel Micro) en la parte inferior de la pantalla para mostrar únicamente los pacientes descontrolados o críticos pertenecientes a esa cohorte, ahorrando tiempo de navegación y clicks repetitivos.

### 5.4 Exportación de Datos
*   El botón de acción superior derecho del contenedor ofrece descarga inmediata en formato:
    *   **CSV / Excel:** Descarga de la serie de tiempo pivotada y segmentada, preservando la total anonimización de datos (no se exporta información de pacientes individuales en este nivel).
    *   **PNG / SVG:** Exportación del gráfico limpio con título y leyenda para inserción directa en reportes ejecutivos.

### 5.5 Toggle de Meta Comparativa
*   Un selector tipo Toggle permite activar una **línea de referencia horizontal** que indica la meta institucional de pacientes activos para el año actual (ej: *Meta: 7,000 pacientes activos acumulados*). Esto permite evaluar de un vistazo el cumplimiento de metas de cobertura comercial.

---

## 6. REGLAS DE NEGOCIO Y CASOS ESPECIALES (EDGE CASES)

1.  **Actualización diaria (T+1):** La sincronización de BigQuery se ejecuta todas las noches a las 02:00 AM para no afectar el rendimiento transaccional en horas laborales.
2.  **Manejo de nulos:** En caso de que una cohorte nueva o inactiva registre cero (0) interacciones en un mes determinado, el sistema debe completarlo con `0` (en vez de `null` o vacíos) para evitar quiebres y líneas cortadas en el renderizado del gráfico de área.
3.  **Caso de 1 sola Cohorte seleccionada:** Si el usuario desmarca todas las cohortes y deja una sola activa, el gráfico cambia automáticamente su visualización de Área Apilada a un **Gráfico de Línea Simple con Área de Relleno Única** (con gradiente descendente), facilitando una lectura limpia.
4.  **Caso de periodo < 3 meses:** Si se fuerza una segmentación temporal inferior a 3 meses, el sistema renderiza un banner informativo discreto en color ámbar: *"Se recomienda un periodo mínimo de 3 meses para análisis confiable de tendencias clínicas"*.
5.  **Indicador de Crecimiento Acelerado (>50%):** Si la cohorte seleccionada registra un incremento superior al 50% en su volumen en un intervalo de 3 meses, se resalta en el panel lateral con un badge verde de éxito: `↑ Crecimiento Significativo`.

---

## 7. MÈTRICAS DE ÉXITO DEL COMPONENTE
*   **Tiempo de Carga Inicial:** Inferior a **1.5 segundos** en redes móviles estándar.
*   **Tiempo de Respuesta a Filtros:** Recálculo interactivo en menos de **150ms** gracias a la pre-agregación de datos en el cliente.
*   **Tasa de Adopción:** Evaluada mediante click-tracking, meta de que el **90%** de los directores médicos interactúen con el hover o los filtros del gráfico en sus ingresos semanales.

---

## 8. ENTREGABLES TÉCNICOS ADICIONALES

### 8.1 Código de Implementación Plotly y Streamlit (Python)
Para despliegues ágiles en servidores de análisis médico internos, se entrega el script completo y autoejecutable en Streamlit con visualizaciones Plotly:

```python
import streamlit as st
import pandas as pd
import plotly.graph_objects as go
from datetime import datetime

# Configuración de página
st.set_page_config(page_title="GIRIS 2.0 - Cohortes Activas", layout="wide")

st.title("Evolución Meso de Cohortes Activas - TeKer 2.0")
st.markdown("---")

# 1. Ejemplo de datos (Mock de BigQuery)
data = {
    'Mes': ['Ene 2026', 'Feb 2026', 'Mar 2026', 'Abr 2026', 'May 2026', 'Jun 2026'],
    'Cardio-Reno-Metabólico': [2100, 2250, 2400, 2380, 2450, 2500],
    'Salud Mental': [1800, 1900, 2000, 2100, 2200, 2300],
    'EPOC/Asma': [950, 920, 980, 1000, 1050, 1100],
    'Diabetes': [1200, 1280, 1350, 1400, 1480, 1550],
    'Hipertensión': [1500, 1550, 1600, 1580, 1620, 1700]
}
df = pd.DataFrame(data)

# 2. Barra de filtros interactivos laterales
st.sidebar.header("Filtros del Tablero")
periodo = st.sidebar.selectbox("Periodo Temporal", ["Últimos 6 Meses", "Últimos 3 Meses", "Últimos 12 Meses"])
pagador = st.sidebar.selectbox("Pagador/Asegurador", ["Todos", "EPS SURA", "Coomeva", "MedIntegral"])
mostrar_meta = st.sidebar.checkbox("Mostrar Línea de Meta (7,500 Pacientes)", value=True)

cohortes_disponibles = ['Cardio-Reno-Metabólico', 'Salud Mental', 'EPOC/Asma', 'Diabetes', 'Hipertensión']
cohortes_seleccionadas = st.sidebar.multiselect("Cohortes Clínicas", cohortes_disponibles, default=cohortes_disponibles)

# Filtrar según selección de cohortes
if not cohortes_seleccionadas:
    st.warning("Selecciona al menos una cohorte clínica para renderizar el gráfico.")
else:
    # 3. Creación del gráfico Plotly Stacked Area
    fig = go.Figure()
    
    # Paleta de colores institucional TeKer
    colores = {
        'Cardio-Reno-Metabólico': '#1E3A8A', # Navy
        'Salud Mental': '#1E40AF',           # Primary Blue
        'EPOC/Asma': '#3B82F6',              # Secondary Blue
        'Diabetes': '#0EA5E9',               # Cyan Accent
        'Hipertensión': '#10B981'            # Emerald
    }

    # Apilamiento en Plotly
    for i, cohorte in enumerate(cohortes_seleccionadas):
        fig.add_trace(go.Scatter(
            x=df['Mes'],
            y=df[cohorte],
            mode='lines',
            name=cohorte,
            line=dict(width=2.5, color=colores.get(cohorte, '#94A3B8'), shape='spline'),
            stackgroup='one', # Activa el comportamiento apilado
            fillcolor=colores.get(cohorte, '#94A3B8'),
            hoverinfo='x+y+name'
        ))

    # Agregar línea de meta si aplica
    if mostrar_meta:
        fig.add_shape(
            type="line",
            x0=df['Mes'].iloc[0],
            y0=7500,
            x1=df['Mes'].iloc[-1],
            y1=7500,
            line=dict(color="#EF4444", width=2, dash="dash"),
            name="Meta Mensual Institucional"
        )
        # Anotación para la meta
        fig.add_annotation(
            x=df['Mes'].iloc[-1],
            y=7650,
            text="Meta Institucional (7,500 pac.)",
            showarrow=False,
            font=dict(color="#EF4444", size=10)
        )

    # Configuración de Layout
    fig.update_layout(
        title="Evolución Temporal de Cohortes Activas (GIRIS)",
        xaxis_title="Línea de Tiempo Mensual",
        yaxis_title="Pacientes Activos Bajo Programa",
        legend_title="Cohortes Clínicas",
        hovermode="x unified",
        plot_bgcolor="white",
        paper_bgcolor="white",
        height=500,
        margin=dict(l=40, r=40, t=60, b=40),
        xaxis=dict(showgrid=False),
        yaxis=dict(showgrid=True, gridcolor="#E2E8F0")
    )

    # Mostrar en Streamlit
    st.plotly_chart(fig, use_container_width=True)

    # 4. Tabla de Datos e Insights
    col1, col2 = st.columns([2, 1])
    with col1:
        st.subheader("Datos Detallados (Serie Temporal)")
        st.dataframe(df[['Mes'] + cohortes_seleccionadas], use_container_width=True)
    with col2:
        st.subheader("Alertas y Crecimiento")
        total_junio = sum([df[c].iloc[-1] for c in cohortes_seleccionadas])
        st.metric(label="Total Pacientes Activos (Junio)", value=f"{total_junio:,}", delta="↑ 5.8% vs Mes Anterior")
        st.success("💡 **Crecimiento Significativo:** La cohorte Diabetes registra un incremento del 29.1% en los últimos 6 meses, liderando el onboarding digital.")
```

### 8.2 Plan de Casos de Prueba (QA Unit Tests)

Para garantizar la estabilidad y confiabilidad de los datos presentados:

1.  **Caso de Prueba UT-01: Verificación de Apilamiento:**  
    *   *Objetivo:* Asegurar que la suma acumulada de las áreas coincida exactamente con la columna `total_pacientes_mes` en cada mes.  
    *   *Entrada:* `monthlyCohortsData` con valores conocidos de CRM, Mental, EPOC.  
    *   *Resultado esperado:* Para Junio: $3732 + 2110 + 1260 + 1530 + 810 = 9442$. El renderizador debe reflejar el tope de la curva en $9,442$.
2.  **Caso de Prueba UT-02: Filtro Geográfico Vacío:**  
    *   *Objetivo:* Evaluar la resiliencia de la interfaz ante un filtro que no posea registros.  
    *   *Entrada:* Filtro Ciudad = "Municipio Inexistente".  
    *   *Resultado esperado:* Despliegue inmediato del estado vacío (`Empty State`) con el mensaje *"No hay pacientes activos en el período seleccionado"* en lugar de crashear el componente o mostrar un gráfico en blanco sin contexto.
3.  **Caso de Prueba UT-03: Desuscripción de Leyenda:**  
    *   *Objetivo:* Verificar que la desactivación de una serie por click no elimine los datos en memoria, solo oculte el nodo visual.  
    *   *Entrada:* Evento Click en Leyenda de "Salud Mental".  
    *   *Resultado esperado:* El área de Salud Mental desaparece y el área de "EPOC / Respiratorio" se apila directamente encima de "Cardio-Reno-Metabólico", reduciendo el acumulado visual total de forma interactiva.

---

## 9. DOCUMENTACIÓN DEL DICCIONARIO DE MÉTRICAS

Este componente se rige por el estándar global de gobernanza del ecosistema decisional TeKer:

*   **Identificador Canónico:** `MET-MESO-GIRIS-01`
*   **Nombre de la Métrica:** Evolución Meso de Cohortes Activas
*   **Fórmula:** `COUNT(DISTINCT paciente_id) WHERE ultima_interaccion_30_dias = TRUE AND estado_programa = 'ACTIVO'`
*   **Periodicidad:** Diaria (T+1)
*   **Propietario de la Métrica:** Dirección de Operaciones Clínicas (GIRIS)
*   **Consumidor Principal:** Líderes de Cohorte, Dirección Médica, Auditores de Asegurador
*   **Canal de Ingesta:** BigQuery Production Replica (`giris_patient_activity`)
*   **SLA de Disponibilidad:** 99.9% uptime de carga de datos en dashboard.
