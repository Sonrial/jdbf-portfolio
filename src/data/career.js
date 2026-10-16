export const experience = [
  {
    id: 'amb', type: 'Práctica profesional', year: '2025',
    start: '2025-07', end: '2025-11', period: 'Julio — noviembre de 2025',
    role: 'Practicante de Ingeniería en Energías y Sostenibilidad',
    organization: 'Acueducto Metropolitano de Bucaramanga (AMB)', location: 'Bucaramanga, Colombia',
    highlights: [
      'Desarrollé un modelo técnico-financiero en Excel para integrar generación, costos y escenarios de autoconsumo y excedentes.',
      'Simulé y comparé tres alternativas fotovoltaicas en PVsyst mediante producción anual, performance ratio (PR) y fracción solar.',
      'Depuré y contrasté datos técnicos, financieros y operativos; elaboré informes de LCOE, VPN, TIR, payback y sensibilidad.',
      'Revisé criterios de conexión y seguridad del contexto colombiano: RETIE, NTC 2050 y esquemas AGPE/AGME.'
    ]
  },
  {
    id: 'unab', type: 'Participación académica', year: '2022', period: '2022',
    role: 'Proyectos y semilleros de energías renovables',
    organization: 'Universidad Autónoma de Bucaramanga', location: 'Bucaramanga, Colombia',
    highlights: [
      'Participé en investigación y divulgación sobre energías renovables, eficiencia energética y sostenibilidad.',
      'Apliqué Python, MATLAB, EES, DIALux evo, SolidWorks y Blender al modelamiento, análisis y visualización; preparé informes y presentaciones técnicas.'
    ]
  },
  {
    id: 'accounting', type: 'Experiencia laboral', year: '2019', period: '2019',
    role: 'Auxiliar contable · Analista de datos',
    organization: 'Empresa contable privada', location: 'Piedecuesta, Colombia',
    highlights: [
      'Organicé, digitalicé y validé registros contables, presupuestales y administrativos.',
      'Consolidé información y elaboré reportes de gastos y presupuestos en Excel para facilitar su revisión y trazabilidad.'
    ]
  }
];

export const education = {
  degree: 'Ingeniería en Energías y Sostenibilidad',
  institution: 'Universidad Autónoma de Bucaramanga (UNAB)',
  start: '2020', end: '2025', location: 'Bucaramanga, Colombia',
  languages: ['Español · lengua materna', 'Inglés · B2']
};

export const courses = [
  'Simulación de Sistemas Eléctricos con Software (ATP, ETAP y PowerFactory)',
  'Análisis Económico para Autogeneración con Proyectos Solares (CAPEX/OPEX)',
  'Aplicaciones de DIgSILENT PowerFactory · taller formativo',
  'DIgSILENT PowerFactory aplicado a Flujo de Carga y Cortocircuito'
];

export const additionalTraining = [
  { title: 'Datos y automatización', description: 'Análisis de datos; Python básico, intermedio y avanzado; Excel avanzado con Power Query; Power BI; flujos básicos con Power Automate.' },
  { title: 'Energía y simulación', description: 'Energías renovables y eficiencia energética con IA; transición energética solar; sistemas de potencia con PowerWorld; circuitos de corriente alterna; análisis de ciclo de vida con SimaPro.' },
  { title: 'Inteligencia artificial y mantenimiento', description: 'Redes neuronales para trazabilidad de sistemas energéticos; machine learning y deep learning; formación introductoria en SAP PM.' }
];
