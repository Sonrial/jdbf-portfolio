export const projects = [
  {
    number: "01",
    title: "PEVI / Industrial Energy Efficiency",
    category: "Energy Efficiency / Data Validation / Technical Reporting",
    description: "Validación de auditorías energéticas, consolidación de indicadores y estructuración de fichas técnicas para programas de eficiencia industrial."
  },
  {
    number: "02",
    title: "PV System Evaluation — PTAP La Flora",
    category: "Photovoltaics / PVsyst / Techno-Economic Analysis",
    description: "Evaluación de alternativas solares FV mediante simulación energética, análisis económico, restricciones eléctricas y recomendaciones técnicas."
  },
  {
    number: "03",
    title: "Rural Energy Systems for ZNI",
    category: "Hybrid Systems / Optimization / Energy Access",
    description: "Investigación aplicada en sistemas híbridos FV-biomasa-diésel para electrificación rural y reducción de dependencia de generación diésel."
  },
  {
    number: "04",
    title: "Technical Automation Systems",
    category: "Python / Apps Script / Excel Workflows",
    description: "Herramientas para convertir procesos manuales en flujos automatizados con validación de datos, reportes y comunicación operativa."
  },
  {
    number: "05",
    title: "Programmatic Motion Graphics",
    category: "React / Remotion / Video Systems",
    description: "Exploración de animaciones programadas y exportables para flujos de edición, visualización técnica y contenido digital."
  },
  {
    number: "06",
    title: "LCA and Environmental Modelling",
    category: "SimaPro / LCA / EPD Methodology",
    description: "Estructuración metodológica de escenarios, unidades funcionales y análisis de sensibilidad para evaluación ambiental de sistemas técnicos."
  }
];

export const cases = [
  {
    number: "01",
    title: "Industrial energy data validation",
    problem: "Las auditorías energéticas industriales generan información dispersa entre informes finales, bases consolidadas, indicadores, tarifas, factores de emisión y oportunidades de mejora.",
    solution: "Estructuración de matrices de validación, depuración de inconsistencias, normalización de indicadores energéticos, financieros y ambientales, y síntesis técnica para fichas resumen.",
    result: "Mayor trazabilidad de la información, mejor calidad de los reportes y soporte técnico más claro para decisiones de eficiencia energética industrial.",
    stack: "Energy Efficiency / Excel / Technical Reporting / ISO 50001 Context"
  },
  {
    number: "02",
    title: "Photovoltaic system evaluation",
    problem: "Un proyecto FV requiere evaluar producción, pérdidas, capacidad instalada, restricciones eléctricas, impacto económico y criterios de conexión antes de tomar decisiones de inversión.",
    solution: "Simulación en PVsyst, comparación de variantes, revisión de PR, producción específica, fracción solar, CAPEX/OPEX, LCOE, VPN, TIR, payback y punto de interconexión.",
    result: "Alternativas técnicas comparables, criterios económicos verificables y recomendaciones de conexión alineadas con el contexto eléctrico del proyecto.",
    stack: "PVsyst / PV Design / Financial Analysis / Technical Documentation"
  },
  {
    number: "03",
    title: "Hybrid energy systems for rural electrification",
    problem: "Las Zonas No Interconectadas requieren soluciones energéticas confiables que reduzcan dependencia de diésel y respondan a condiciones técnicas, sociales y territoriales.",
    solution: "Formulación de escenarios con sistemas híbridos FV-biomasa-diésel, criterios de pobreza energética, análisis de confiabilidad y modelos de optimización energética.",
    result: "Marco técnico para evaluar alternativas de electrificación rural con enfoque en continuidad del servicio, sostenibilidad y reducción de emisiones.",
    stack: "Hybrid Systems / MILP / Energy Access / ZNI / HOMER Context"
  },
  {
    number: "04",
    title: "Automation for operational workflows",
    problem: "Procesos administrativos y técnicos repetitivos consumen tiempo, aumentan errores y dificultan la trazabilidad de la información.",
    solution: "Desarrollo de herramientas con Python, Google Apps Script, Excel avanzado y estructuras web simples para automatizar validaciones, reportes y comunicaciones.",
    result: "Reducción de carga operativa, mejor consistencia de datos y flujos más claros para usuarios técnicos y administrativos.",
    stack: "Python / Pandas / Apps Script / Excel / React"
  }
];

export const profile = {
  name: "Jose David Barrios Franco",
  initials: "JDBF",
  role: "Ingeniero en Energía y Sostenibilidad",
  location: "Santander, Colombia",
  email: "contacto@jdbf.dev",
  introduction: "Soy Jose David Barrios Franco, Ingeniero en Energía y Sostenibilidad. Integro simulación fotovoltaica, eficiencia energética, análisis de datos y automatización para estructurar soluciones técnicas verificables.",
  headline: "Ingeniería energética convertida en sistemas claros, datos confiables y decisiones técnicas.",
  about: [
    "Soy Ingeniero en Energía y Sostenibilidad con experiencia en eficiencia energética industrial, sistemas fotovoltaicos, regulación energética colombiana, análisis técnico y automatización de procesos.",
    "Mi trabajo combina simulación energética, validación de datos, modelamiento técnico, redacción de informes y desarrollo de herramientas digitales para reducir errores, ordenar información y acelerar decisiones.",
    "No separo ingeniería y comunicación. Una solución técnica debe funcionar, poder verificarse y explicarse con claridad."
  ]
};
export const projectGroups = { "01": "Energía", "02": "Energía", "03": "Energía", "04": "Software", "05": "Software", "06": "Sostenibilidad" };
export const expertise = [
  { number: "01", title: "Ingeniería energética", icon: "energy", description: "Del recurso energético a una solución verificable.", tools: ["PVsyst", "Eficiencia energética", "Sistemas híbridos", "Regulación colombiana"] },
  { number: "02", title: "Datos y automatización", icon: "code", description: "Menos procesos manuales. Más información confiable.", tools: ["Python", "Pandas", "Apps Script", "Excel avanzado"] },
  { number: "03", title: "Modelamiento y análisis", icon: "model", description: "Escenarios técnicos, económicos y ambientales.", tools: ["MILP", "SimaPro", "LCA / EPD", "Análisis financiero"] },
  { number: "04", title: "Desarrollo y visualización", icon: "visual", description: "Sistemas que también se explican con claridad.", tools: ["React", "Remotion", "Motion Graphics", "Documentación técnica"] }
];
