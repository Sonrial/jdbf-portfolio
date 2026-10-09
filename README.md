# JDBF — Portfolio personal

Portfolio de **Jose David Barrios Franco**, Ingeniero en Energía y Sostenibilidad, en React 19 y Vite. La composición editorial se inspira en [chanhdai.com](https://chanhdai.com/): columna centrada, líneas finas, separadores tramados, tipografía sobria y detalles interactivos. La marca, el contenido y las ilustraciones son propios del portfolio JDBF.

## Desarrollo

```sh
npm ci
npm run dev
```

Abre `http://localhost:5173/jdbf-portfolio/`. El proyecto mantiene la ruta base `/jdbf-portfolio/` para GitHub Pages.

```sh
npm run build
npm run preview
npm run lint
npm run test:e2e
```

Las pruebas utilizan Chromium del sistema cuando existe en `/usr/bin/chromium`. Puedes seleccionar otro ejecutable con `CHROMIUM_PATH` o instalar el navegador de Playwright con `npx playwright install chromium`.

## Contenido y estructura

- `src/data/portfolio.js`: información personal, **seis proyectos originales**, **cuatro casos técnicos originales** y herramientas de trabajo. Los títulos, descripciones y datos técnicos se conservan.
- `src/App.jsx`: presentación, biografía, herramientas, proyectos con filtros, casos desplegables, contacto y descarga de vCard.
- `src/components/EnergyScene.jsx`: escena original de panel solar en capas con Three.js, reacción al puntero y órbita animada. Carga separada del resto de la aplicación, límite de densidad de píxeles, pausa fuera de pantalla o con la pestaña oculta, control de pausa, preferencia de movimiento reducido y alternativa SVG cuando WebGL no está disponible.
- `src/components/CommandPalette.jsx`: búsqueda con `Ctrl+K` / `⌘K`, flechas, Enter y Escape; coincidencias sin distinguir acentos.
- `src/components/ProjectVisual.jsx`: ilustraciones SVG conceptuales de los seis ámbitos de trabajo. Los gráficos son ilustraciones, no métricas medidas ni capturas de resultados reales.
- `src/index.css` y `src/App.css`: temas claro/oscuro, tipografía local, vista móvil y animaciones que respetan movimiento reducido.

Los diálogos usan el comportamiento nativo del navegador para gestionar foco, Escape y navegación por teclado. El tema se conserva en almacenamiento local. No se inventan estudios, fechas de empleo, clientes, resultados cuantificados ni enlaces de proyectos que no estaban en la fuente.

## Contacto

Se conserva `contacto@jdbf.dev` del portfolio original. El formulario valida los campos y prepara un enlace `mailto:` con el nombre, el correo y el mensaje. Al pulsar «Abrir aplicación de correo» se abre el borrador. **La persona envía el mensaje desde su aplicación de correo**; el sitio no dispone de un servidor de envío. La descarga de contacto produce un archivo `.vcf`, no un currículum.

## Verificación

Playwright verifica en escritorio y móvil la conservación del contenido original, filtros, fichas, foco, búsqueda, persistencia de tema, vCard, validación del formulario, ausencia de desbordamiento a 320/390/768/1440 px y alternativa sin WebGL. Axe revisa reglas WCAG A/AA en los dos temas y en el buscador. Las pruebas de animación cuentan llamadas reales de dibujo de WebGL y comprueban pausa sin reconstrucción del canvas, reanudación, suspensión fuera de pantalla, movimiento reducido y recuperación después de perder el contexto gráfico. También se comprueban superposiciones de la cabecera móvil, foco del diálogo y su contraste. La referencia original para los textos está en `tests/fixtures/original-content.json`.

## Publicación

```sh
npm run deploy
```

Este comando publica `dist` en la rama `gh-pages` del repositorio configurado. El rediseño se puede revisar localmente antes de publicarlo. La plantilla sugerida de 21st.dev no se instaló: la identidad visual se adaptó directamente a React/Vite para conservar el proyecto existente.
