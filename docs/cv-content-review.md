# Revisión del contenido profesional

Se contrastaron las ocho versiones de CV aportadas por el titular el 16 de octubre de 2026: OLYMPIC (PDF), ENEL (PDF), ELECTROPERU Analista Operaciones (PDF), Estándar Actualizado INEL (DOCX), Estándar (PDF y DOCX) y CV José David Barrios Franco (PDF y DOCX). Se revisaron texto, tablas, enlaces y páginas renderizadas.

## Criterios de conciliación

- Se conserva la información coincidente: práctica en AMB de julio a noviembre de 2025; estudios UNAB de 2020 a 2025; participación académica en 2022; experiencia contable en 2019; inglés B2.
- Los años 2022 y 2019 se presentan sin atribuirles una duración ni continuidad no documentada. La participación académica se identifica por separado de los empleos.
- Los tres escenarios fotovoltaicos corresponden a la práctica en AMB. No se añade una asociación con una planta concreta que los CV no confirman.
- INEL aporta cuatro cursos/talleres específicos. No se infieren fechas, horas, certificados ni experiencia laboral a partir de estos cursos. Power Automate y SAP PM conservan su alcance básico o introductorio.
- OLYMPIC, ENEL y ELECTROPERU son destinos de candidaturas, no empleadores. Se descarta la línea de plantilla «Cualquier curso de Excel, Power BI, Power Query o Power Automate» de la versión ENEL.
- Se normalizan nombre con tilde, título con «Energías», ubicación en Piedecuesta y enlace LinkedIn extraído de las relaciones del DOCX. Se mantiene el correo indicado expresamente por el titular.
- Se mantienen los seis proyectos y cuatro casos del portfolio original; los CV complementan esos contenidos y no los sustituyen.
- No se publican los documentos originales, teléfono, edad ni otros datos personales innecesarios.

## Presentación y revisión

Las nuevas secciones reutilizan tipografías, colores, divisores, numeración y diseño adaptable existentes. La cabecera conserva sus cuatro enlaces y el buscador incorpora trayectoria, instituciones y cursos. Las animaciones Three.js no requieren cambios para esta actualización de contenido.

La verificación cubre fechas, clasificación de experiencia, formación, metadatos, LinkedIn, vCard, búsqueda y foco de teclado, accesibilidad en ambos temas, identidad visual, proyectos originales, formulario, comportamiento móvil y animación WebGL.

Se aplicaron las guías aportadas `brand` (consistencia) y `frontend-design` para integrar las secciones al diseño existente, y `vercel:react-best-practices` para revisar las modificaciones de React: datos estáticos fuera del render, claves estables, controles HTML nativos, foco predecible y carga diferida de Three.js conservada. No se añadieron dependencias ni peticiones de red para el contenido profesional.

Resultado final: `npm run lint`, `git diff --check` y `npm run test:e2e` aprobados; **56 pruebas de navegador** en Chromium sobre la compilación de producción, repartidas entre escritorio y móvil. Se revisaron capturas de trayectoria y formación en escritorio claro y móvil oscuro. Se mantiene la limitación del entorno para abrir directamente el dominio público; la publicación se valida mediante GitHub Pages y comparación de los archivos de despliegue.
