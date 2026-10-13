# Revisión de las skills aportadas y conservación de identidad

## Alcance

Se inspeccionó el archivo `skills.rar` aportado por el usuario: 286 archivos y 13 guías `SKILL.md`. Se catalogaron las guías y se leyeron en detalle las pertinentes al portfolio, junto con sus referencias necesarias. No se ejecutaron los scripts del archivo ni fue necesario acceder al PC.

La petición del usuario prevalece sobre las recomendaciones genéricas: conservar la identidad visual del portfolio aprobado y sus datos representativos, incluido `josebarriosetc@gmail.com`.

## Selección

| Skill | Uso en esta revisión |
| --- | --- |
| `frontend-design` | Mantener la dirección visual fijada por el usuario; revisar legibilidad, estados de interacción y capturas. |
| `ui-ux-pro-max` | Consulta manual de reglas de UX y bases CSV de React y Three.js: foco, errores, movimiento reducido, recursos gráficos y rendimiento. No se generó otra paleta ni otro sistema visual. |
| `web-design-guidelines` | Lectura de las reglas actuales de Vercel: controles semánticos, teclado, foco visible, mensajes de error, composición de texto y desplazamiento en diálogos. |
| `react-three-fiber` | Aplicación de las recomendaciones de escena: actualizaciones por referencias, delta temporal, recursos reutilizados, tamaño explícito, soporte móvil y liberación de GPU. Se conservó el renderer existente en Three.js; no se migró a otra biblioteca. |
| `vercel-react-best-practices` | Referencias para valores transitorios, efectos con limpieza y carga separada de la escena pesada. |
| `brand` | Checklist de consistencia de logotipo, paleta, tipografía, composición y tono. |
| `design-system` | Referencia para estados, foco y errores; los colores originales se fijaron en una prueba de contrato visual. |
| `ui-styling` | Consulta de principios de accesibilidad y temas. Se conservó el CSS y los controles nativos existentes. |
| `playwright-cli` | Consulta del flujo de comprobación por navegador. Se usó la infraestructura Playwright ya instalada, con capturas y pruebas repetibles. |
| `shadcn` | Catalogada; no se activó instalación porque el proyecto no usa shadcn y no necesita reemplazar sus componentes. |
| `design` | Catalogada como enrutador de las guías de marca y sistemas; no se crearon nuevos logos ni campañas. |
| `banner-design` | Fuera del alcance: no se pidió un banner nuevo. |
| `slides` | Fuera del alcance: no se pidió una presentación. |

## Identidad preservada

- Logotipo JDBF y nombre personal.
- Inter Variable para texto e IBM Plex Mono para anotaciones.
- Paleta de superficies claras, tinta, oliva y equivalentes oscuros.
- Columna de 1000 px, líneas finas, separadores tramados y orden de las secciones.
- Geometría, materiales, luces y encuadre de la ilustración solar.
- Seis proyectos y cuatro casos técnicos originales.

La guía `frontend-design` recomienda seguir exactamente la dirección visual fijada por el brief. Por ello, sugerencias genéricas de cambiar fuentes, colores, iconos o librerías no se aplicaron.

## Mejoras implementadas

### Escena 3D

Se agruparon las celdas y soportes con `InstancedMesh` y las líneas con `LineSegments`. El cambio de tema actualiza los materiales del mismo renderer, sin destruir el canvas, perder el contexto ni reiniciar el movimiento. La interpolación usa el delta temporal y no asigna objetos cada fotograma. Se conservan la pausa manual, la suspensión fuera de pantalla, el movimiento reducido y la alternativa estática. Se libera explícitamente el contexto al desmontar.

La consulta del dataset `threejs.csv` se centró en **Single Renderer Per Page**, **Share Geometry Across Meshes**, **Share Material Instances**, **InstancedMesh for Repeated Objects**, limpieza y animación temporal. Se contrastaron las recomendaciones con la versión instalada de Three.js y las pruebas reales; no se copiaron ejemplos de otra versión sin revisión.

### Interfaz y accesibilidad

- Las fichas largas mantienen el cierre visible mientras se leen.
- Los clics dentro del diálogo no se confunden con clics en el fondo.
- El buscador usa controles semánticos, anuncia el número de resultados y lleva el foco a la sección elegida.
- Enter sobre el cierre del buscador cierra el diálogo; no selecciona accidentalmente un resultado.
- La composición de texto no dispara atajos de selección.
- Los errores del formulario se muestran junto al campo, se asocian mediante `aria-describedby` y enfocan el primer campo inválido.
- Los iconos decorativos se ocultan del árbol accesible.
- Las animaciones de entrada no dejan contenido invisible en ventanas bajas.
- Se amplía el área de algunos controles pequeños sin cambiar su tamaño visual.

## Evidencia

| Medición | Antes | Después |
| --- | --- | --- |
| Llamadas de dibujo por fotograma | 58 | 9 |
| Cambio de tema | Reconstruye el canvas | Mantiene canvas y contexto |
| Proyectos en ventana de 320 × 200 px con movimiento activo | Opacidad 0; nunca se revelan | Se revelan y quedan legibles |

Las llamadas se contaron sobre funciones reales de WebGL, incluyendo dibujos instanciados, con la misma escena, cámara y tamaño de pantalla. La reducción es aproximadamente **84,5 %**; no equivale a una medición de FPS, consumo energético o tiempo de carga.

Se compararon capturas de la portada de 1440 × 1000 px en temas claro y oscuro, con movimiento reducido para fijar la posición de la escena. No hubo píxeles con diferencia de más de 5 niveles sobre 255 por canal. El contrato de colores y tipografía está versionado en `tests/fixtures/visual-identity.json`.

**Verificación: 48 pruebas de navegador aprobadas**, compilación aprobada y análisis de código aprobado. También se revisó con Axe el estado del formulario después de mostrar errores.

Las pruebas nuevas están en `tests/design-review.spec.js`; complementan la verificación de contenido, correo, formulario, búsqueda, WebGL y accesibilidad existente. Las capturas se revisaron en Chromium. La publicación se comprueba mediante GitHub Pages; no se atribuye una comprobación directa del dominio público a este entorno restringido.
